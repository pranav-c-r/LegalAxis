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
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import "./index.css";

function App() {
  return (
    <UserAuthContextProvider>
      <Router>
        <Routes>
          {/* Public routes (no Layout - clean login/signup pages) */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected routes (with Layout - sidebar/navbar) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/documents"
            element={
              <ProtectedRoute>
                <Layout>
                  <Documents />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/collaboration"
            element={
              <ProtectedRoute>
                <Layout>
                  <Collaboration />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/compliance"
            element={
              <ProtectedRoute>
                <Layout>
                  <Compliance />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/obligations"
            element={
              <ProtectedRoute>
                <Layout>
                  <Obligations />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/risk"
            element={
              <ProtectedRoute>
                <Layout>
                  <Risk />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/negotiation"
            element={
              <ProtectedRoute>
                <Layout>
                  <Negotiation />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/scenarios"
            element={
              <ProtectedRoute>
                <Layout>
                  <Scenarios />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/research"
            element={
              <ProtectedRoute>
                <Layout>
                  <Research />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Layout>
                  <Settings />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </UserAuthContextProvider>
  );
}

export default App;