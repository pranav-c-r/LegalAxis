import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-background text-text">
    <div className="bg-box rounded-xl shadow-lg p-10 flex flex-col items-center">
      <h1 className="text-5xl font-bold mb-6 text-primary">Welcome to LegalAxis</h1>
      <p className="mb-8 text-lg text-center">Your professional legal management platform. Streamline compliance, collaboration, and document workflows with a modern, secure interface.</p>
      <div className="flex gap-4">
        <Link to="/login" className="bg-primary text-background px-6 py-2 rounded font-semibold hover:bg-yellow-400 transition">Login</Link>
        <Link to="/signup" className="bg-box border border-primary text-primary px-6 py-2 rounded font-semibold hover:bg-primary hover:text-background transition">Sign Up</Link>
      </div>
    </div>
  </div>
);

export default Landing;
