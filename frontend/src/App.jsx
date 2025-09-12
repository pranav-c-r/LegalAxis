import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout";
import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import Collaboration from "./pages/Collaboration";
import Compliance from "./pages/Compliance";
import Obligations from "./pages/Obligations";
import Risk from "./pages/Risk";
import Negotiation from "./pages/Negotiation";
import Scenarios from "./pages/Scenarios";
import Research from "./pages/Research";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import ProtectedRoute from "./components/ProtectedRoute";  // ✅ added
import "./index.css";

function App() {
  return (
    <UserAuthContextProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/documents"
              element={
                <ProtectedRoute>
                  <Documents />
                </ProtectedRoute>
              }
            />

            <Route
              path="/collaboration"
              element={
                <ProtectedRoute>
                  <Collaboration />
                </ProtectedRoute>
              }
            />

            <Route
              path="/compliance"
              element={
                <ProtectedRoute>
                  <Compliance />
                </ProtectedRoute>
              }
            />

            <Route
              path="/obligations"
              element={
                <ProtectedRoute>
                  <Obligations />
                </ProtectedRoute>
              }
            />

            <Route
              path="/risk"
              element={
                <ProtectedRoute>
                  <Risk />
                </ProtectedRoute>
              }
            />

            <Route
              path="/negotiation"
              element={
                <ProtectedRoute>
                  <Negotiation />
                </ProtectedRoute>
              }
            />

            <Route
              path="/scenarios"
              element={
                <ProtectedRoute>
                  <Scenarios />
                </ProtectedRoute>
              }
            />

            <Route
              path="/research"
              element={
                <ProtectedRoute>
                  <Research />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </UserAuthContextProvider>
  );
}

export default App;