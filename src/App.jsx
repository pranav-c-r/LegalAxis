import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout';
import Dashboard from './pages/Dashboard';
import Documents from './pages/Documents';
import Collaboration from './pages/Collaboration';
import Compliance from './pages/Compliance';
import Obligations from './pages/Obligations';
import Risk from './pages/Risk';
import Negotiation from './pages/Negotiation';
import Scenarios from './pages/Scenarios';
import Consistency from './pages/Consistency';
import Research from './pages/Research';
import Settings from './pages/Settings';
import './index.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/collaboration" element={<Collaboration />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/obligations" element={<Obligations />} />
          <Route path="/risk" element={<Risk />} />
          <Route path="/negotiation" element={<Negotiation />} />
          <Route path="/scenarios" element={<Scenarios />} />
          <Route path="/consistency" element={<Consistency />} />
          <Route path="/research" element={<Research />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
