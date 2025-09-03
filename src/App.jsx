import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout';
import Dashboard from './pages/Dashboard';
import Documents from './pages/Documents';
import Collaboration from './pages/Collaboration';
import './index.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/collaboration" element={<Collaboration />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
