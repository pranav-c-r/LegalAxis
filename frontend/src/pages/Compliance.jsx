import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import app from "../firebase/firebase"; // Import your existing Firebase app

// Initialize Firestore using your existing Firebase app
const db = getFirestore(app);

export default function ComplianceGuardian() {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const [modalOpen, setModalOpen] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analyzedFiles, setAnalyzedFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loadingFiles, setLoadingFiles] = useState(true);

  // constants for progress circle
  const RADIUS = 80;
  const circumference = 2 * Math.PI * RADIUS;

  // ✅ Load files from Firebase on component mount
  useEffect(() => {
    loadFilesFromFirebase();
  }, []);

  // ✅ Load files from Firebase
  async function loadFilesFromFirebase() {
    setLoadingFiles(true);
    try {
      const q = query(collection(db, "analyzedFiles"), orderBy("uploadDate", "desc"));
      const querySnapshot = await getDocs(q);
      const files = [];
      querySnapshot.forEach((docSnap) => {
        files.push({
          id: docSnap.id,
          ...docSnap.data(),
        });
      });
      setAnalyzedFiles(files);
    } catch (err) {
      console.error("Error loading files from Firebase:", err);
    } finally {
      setLoadingFiles(false);
    }
  }

  // ✅ Save file to Firebase
  async function saveFileToFirebase(fileData) {
    try {
      const docRef = await addDoc(collection(db, "analyzedFiles"), {
        name: fileData.name,
        uploadDate: new Date(),
        analysis: fileData.analysis,
        text: fileData.text,
      });
      return docRef.id;
    } catch (err) {
      console.error("Error saving file to Firebase:", err);
      return null;
    }
  }

  // ✅ Delete file from Firebase
  async function deleteFileFromFirebase(fileId) {
    try {
      await deleteDoc(doc(db, "analyzedFiles", fileId));
      return true;
    } catch (err) {
      console.error("Error deleting file from Firebase:", err);
      return false;
    }
  }

  // ✅ Robust Compliance Analysis Function with retries
  async function analyzeCompliance(text) {
    const maxRetries = 3;
    let attempt = 0;

    while (attempt < maxRetries) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `
You are an expert legal compliance analyst with experience reviewing contracts, agreements, and other legal documents. 
Analyze the following document carefully and identify any compliance issues, regulatory risks, missing or ambiguous clauses, and potential legal violations. 
Provide actionable recommendations for resolving each issue.

Instructions:
1. Return ONLY raw JSON (no markdown, no extra text, no triple backticks).
2. JSON must follow this exact structure:
{
  "complianceScore": <number 0-100>, 
  "alerts": [
    {
      "priority": "High" | "Low", 
      "issue": "Description of the compliance problem, legal risk, or missing/ambiguous clause",
      "location": "Specific section, clause, or page where the issue occurs",
      "suggestedFix": "Clear, legally sound recommendation to resolve the issue"
    }
  ]
}
3. Evaluate the document strictly from a legal perspective.
4. Assign 'High' priority to any issue that could lead to legal liability, fines, regulatory penalties, or contractual disputes.
5. Assign 'Low' priority to minor issues, wording inconsistencies, or recommendations that improve clarity but are not legally critical.
6. If no issues are found, return an empty alerts array and a complianceScore of 100.

Document:
${text}
`,
                },
              ],
            },
          ],
          generationConfig: { responseMimeType: "application/json" },
        });

        // Parse and validate the response
        let parsed;
        try {
          // Some SDKs provide `result.response.text()`; if not adapt accordingly.
          // We guard this in a try/catch so component won't crash on unexpected shapes.
          const raw = result?.response ? await result.response.text() : JSON.stringify(result);
          parsed = JSON.parse(raw);
        } catch (parseErr) {
          console.error("Failed to parse model output. Returning default:", parseErr);
          return { complianceScore: 0, alerts: [] };
        }

        if (typeof parsed.complianceScore !== "number" || !Array.isArray(parsed.alerts)) {
          console.warn("Model output invalid, using fallback structure");
          return { complianceScore: 0, alerts: [] };
        }

        return parsed;
      } catch (err) {
        // Retry on 503 transient errors
        if (err && err.message && err.message.includes("503") && attempt < maxRetries - 1) {
          console.warn(`Retrying due to 503 error... attempt ${attempt + 1}`);
          await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
          attempt++;
        } else {
          console.error("Failed to analyze compliance:", err);
          return { complianceScore: 0, alerts: [] };
        }
      }
    }
    // Fallback if loop finishes without returning
    return { complianceScore: 0, alerts: [] };
  }

  // ✅ Handle File Upload
  async function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setModalOpen(false);
    setLoading(true);

    try {
      // Attempt to extract textual content. This works for .txt and many simple text files.
      // For PDFs and DOCX you should add a proper parser (pdfjs, mammoth, etc.) server-side or client-side.
      let text = "";
      try {
        text = await file.text();
      } catch (readErr) {
        console.warn("file.text() failed — attempting ArrayBuffer fallback", readErr);
        try {
          const buffer = await file.arrayBuffer();
          // best-effort conversion; may be gibberish for binary formats
          const decoder = new TextDecoder("utf-8");
          text = decoder.decode(buffer);
        } catch (bufErr) {
          console.error("Failed to extract text from file:", bufErr);
          text = ""; // continue with empty text so analysis returns something predictable
        }
      }

      const result = await analyzeCompliance(text);

      // Create file object with analysis
      const fileData = {
        name: file.name,
        analysis: result,
        text: text,
      };

      // Save to Firebase
      const firebaseId = await saveFileToFirebase(fileData);

      if (firebaseId) {
        // Add Firebase ID and reload files
        fileData.id = firebaseId;
        await loadFilesFromFirebase();

        // Set as current analysis
        setAnalysis(result);
        setSelectedFile(fileData);
      } else {
        // Fallback to local storage if Firebase fails
        const localFileData = {
          ...fileData,
          id: Date.now(),
          uploadDate: new Date(),
        };
        setAnalyzedFiles((prev) => [localFileData, ...prev]);
        setAnalysis(result);
        setSelectedFile(localFileData);
      }

      console.log("Extracted text (truncated):", text.slice(0, 500));
    } catch (err) {
      console.error("Error analyzing file:", err);
      setAnalysis({ complianceScore: 0, alerts: [] });
    } finally {
      setLoading(false);
    }
  }

  // ✅ Handle clicking on a previously analyzed file
  function handleFileClick(fileData) {
    setAnalysis(fileData.analysis);
    setSelectedFile(fileData);
  }

  // ✅ Delete a file from history
  async function deleteFile(fileId) {
    const success = await deleteFileFromFirebase(fileId);
    if (success) {
      setAnalyzedFiles((prev) => prev.filter((file) => file.id !== fileId));
      if (selectedFile && selectedFile.id === fileId) {
        setAnalysis(null);
        setSelectedFile(null);
      }
    }
  }

  // ✅ Format date for display
  function formatDate(date) {
    if (!date) return "";
    if (date && typeof date.toDate === "function") {
      return date.toDate().toLocaleDateString();
    }
    if (date instanceof Date) {
      return date.toLocaleDateString();
    }
    return new Date(date).toLocaleDateString();
  }

  const score = analysis?.complianceScore ?? 0;
  const progressOffset = circumference * (1 - score / 100);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-4xl font-bold text-center text-[#f3cf1a] mb-8">
        Compliance Guardian
      </h1>
      <div className="flex justify-center md:justify-end mt-8 mb-10">
        <button
          onClick={() => setModalOpen(true)}
          className="px-6 py-3 bg-[#f3cf1a] text-black font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
        >
          Scan New Contract
        </button>
      </div>

      {loading && (
        <div className="text-center text-blue-400 mt-4 mb-10 flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400 mr-2"></div>
          Analyzing document...
        </div>
      )}


      <div className="grid md:grid-cols-2 gap-6 ">
        {/* Alerts Card */}
        <div className="bg-gray-900 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-[#f3cf1a] mb-4">
            Compliance Alerts
            {selectedFile && (
              <span className="text-sm text-gray-400 ml-2">({selectedFile.name})</span>
            )}
          </h2>
          {!analysis ? (
            <p className="text-gray-400">No document analyzed yet.</p>
          ) : analysis.alerts.length === 0 ? (
            <div className="text-center p-8">
              <div className="text-6xl mb-4">✅</div>
              <p className="text-green-400 font-semibold">No compliance issues found!</p>
              <p className="text-gray-400 text-sm mt-2">This document appears to be compliant.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {analysis.alerts.map((alert, idx) => (
                <div
                  key={idx}
                  className={`border rounded-lg p-4 bg-gray-800 ${
                    alert.priority === "High"
                      ? "border-red-500 bg-red-900/20"
                      : "border-yellow-500 bg-yellow-900/20"
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <span
                      className={`inline-block w-3 h-3 rounded-full mr-2 ${
                        alert.priority === "High" ? "bg-red-500" : "bg-yellow-500"
                      }`}
                    ></span>
                    <span className="font-semibold text-white">{alert.priority} Priority</span>
                  </div>
                  <p className="mb-2">
                    <span className="font-semibold text-white">Issue:</span>{" "}
                    <span className="text-gray-200">{alert.issue}</span>
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold text-white">Location:</span>{" "}
                    <span className="text-gray-200">{alert.location}</span>
                  </p>
                  <p>
                    <span className="font-semibold text-green-400">Suggested Fix:</span>{" "}
                    <span className="text-gray-200">{alert.suggestedFix}</span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Score Card */}
        <div className="bg-gray-900 rounded-2xl shadow-lg p-6 mb-10 flex flex-col items-center text-center">
          <h2 className="text-xl font-semibold text-[#f3cf1a] mb-6">Compliance Score</h2>
          <div className="relative w-48 h-48 mb-4">
            <svg className="absolute top-0 left-0 w-full h-full transform -rotate-90" viewBox="0 0 192 192">
              <circle cx="96" cy="96" r={RADIUS} stroke="#1f2937" strokeWidth="16" fill="none" />
              <circle
                cx="96"
                cy="96"
                r={RADIUS}
                stroke={
                  score >= 80 ? "#10b981" : score >= 60 ? "#f59e0b" : "#ef4444"
                }
                strokeWidth="16"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={progressOffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-4xl font-bold text-[#f3cf1a]">{analysis ? analysis.complianceScore : 0}%</div>
              <div className="text-sm text-gray-400 mt-1">
                {score >= 80 ? "Excellent" : score >= 60 ? "Good" : "Needs Work"}
              </div>
            </div>
          </div>
          {selectedFile && (
            <p className="text-sm text-gray-400 text-center truncate max-w-full">{selectedFile.name}</p>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl shadow-xl w-96">
            <h2 className="text-xl font-semibold text-[#f3cf1a] mb-4 text-center">
              Upload Document
            </h2>
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={handleFileUpload}
              className="block w-full text-gray-300 mb-4 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[#f3cf1a] file:text-black file:font-semibold hover:file:bg-yellow-400"
            />
            <button
              className="w-full py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* File History Section */}
      {(loadingFiles || analyzedFiles.length > 0) && (
        <div className="mb-6 mt-6 bg-gray-900 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-[#f3cf1a] mb-4">
            Previously Analyzed Documents
          </h2>
          {loadingFiles ? (
            <div className="text-center text-gray-400">Loading files...</div>
          ) : (
            <div className="grid gap-2 max-h-60 overflow-y-auto">
              {analyzedFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between bg-gray-800 rounded-lg p-3 hover:bg-gray-700 transition-colors"
                >
                  <button
                    onClick={() => handleFileClick(file)}
                    className={`flex-1 text-left hover:text-[#f3cf1a] transition-colors ${
                      selectedFile && selectedFile.id === file.id
                        ? "text-[#f3cf1a] font-semibold"
                        : "text-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="truncate max-w-xs">{file.name}</span>
                      <div className="flex items-center space-x-2 ml-4">
                        <span className="text-xs text-gray-400">
                          {formatDate(file.uploadDate)}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded font-medium ${
                            (file?.analysis?.complianceScore ?? 0) >= 80
                              ? "bg-green-600 text-white"
                              : (file?.analysis?.complianceScore ?? 0) >= 60
                              ? "bg-yellow-600 text-black"
                              : "bg-red-600 text-white"
                          }`}
                        >
                          {file?.analysis?.complianceScore ?? 0}%
                        </span>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => deleteFile(file.id)}
                    className="ml-2 text-red-400 hover:text-red-300 text-sm p-1 rounded hover:bg-red-900/30"
                    title="Delete file"
                  >
                    🗑
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Dashboard */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
        <div className="xl:col-span-2">
          <div className="bg-gradient-to-b from-[#1f1f1f] to-[#151515] rounded-2xl p-5 sm:p-6 ring-1 ring-white/5 shadow-lg">
            <h2 className="text-xl sm:text-2xl font-semibold mb-5 sm:mb-6 text-white flex items-center">
              <svg className="w-5 h-5 mr-2 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              Compliance Alerts
            </h2>
            <div className="space-y-4 sm:space-y-5">
              {[1, 2, 3].map((item) => (
                <div key={item} className="p-4 sm:p-5 rounded-xl bg-[#232323] ring-1 ring-white/5 hover:ring-[#f3cf1a]/30 transition-all duration-300 group">
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-4">
                    <h3 className="font-medium text-white text-base sm:text-lg group-hover:text-[#f3cf1a] transition-colors duration-300">GDPR Non-Compliance Risk</h3>
                    <span className="text-xs sm:text-sm px-3 py-1 rounded-full bg-red-500/20 text-red-300 self-start">
                      High Priority
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard */}
      

      {/* Updates Card */}
      <div className="mt-6 bg-gray-900 rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-[#f3cf1a] mb-4">Legal & Regulatory Updates</h2>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start">
            <span className="text-red-400 mr-2">⚖</span>
            <div>
              <strong className="text-white">EU AI Act Implementation</strong>
              <p className="text-sm text-gray-400">New transparency requirements for AI systems effective 2025</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-yellow-400 mr-2">📋</span>
            <div>
              <strong className="text-white">GDPR Amendment</strong>
              <p className="text-sm text-gray-400">Enhanced data processing consent requirements - Under review</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-blue-400 mr-2">🏛</span>
            <div>
              <strong className="text-white">Data Privacy Law v2.1</strong>
              <p className="text-sm text-gray-400">Cross-border data transfer regulations - Enforcement 2025</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-green-400 mr-2">⚠</span>
            <div>
              <strong className="text-white">Contract Law Updates</strong>
              <p className="text-sm text-gray-400">New standards for digital contract enforceability</p>
            </div>
          </li>
        </ul>

        <div className="mt-4 p-3 bg-amber-900/20 border border-amber-700 rounded-lg">
          <p className="text-amber-200 text-sm">
            <strong>⚠ Legal Disclaimer:</strong> This tool provides automated analysis for informational purposes only. Always consult qualified legal counsel for official legal advice and compliance verification.
          </p>
        </div>
      </div>

      {/* Analyze Button */}
      
    </div>
  );
}
