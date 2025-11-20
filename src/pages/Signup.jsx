import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {signUp} = useUserAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-[#010101] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 flex items-center justify-center">
              <img src="/logolegal.png" alt="LegalAxis Logo" className="h-16 w-auto object-contain select-none" draggable="false" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-[#f3cf1a]">Join LegalAxis</h2>
          <p className="mt-2 text-[#e0e0e0]">Create your account to get started</p>
        </div>

        {/* Signup Form */}
  <div className="bg-gradient-to-b from-[#1f1f1f] to-[#151515] rounded-lg shadow-lg p-8 ring-1 ring-white/5">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#FFFFFF] mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#232323] ring-1 ring-white/5 rounded-lg text-[#FFFFFF] placeholder-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#f3cf1a] focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#FFFFFF] mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#232323] ring-1 ring-white/5 rounded-lg text-[#FFFFFF] placeholder-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#f3cf1a] focus:border-transparent transition-all duration-200"
                placeholder="Create a password (min. 6 characters)"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#FFFFFF] mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#232323] ring-1 ring-white/5 rounded-lg text-[#FFFFFF] placeholder-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#f3cf1a] focus:border-transparent transition-all duration-200"
                placeholder="Confirm your password"
              />
            </div>

            {/* Password requirements */}
            <div className="text-xs text-[#a0a0a0] space-y-1">
              <p className="flex items-center">
                <span className={`w-2 h-2 rounded-full mr-2 ${password.length >= 6 ? 'bg-green-500' : 'bg-[#343535]'}`}></span>
                At least 6 characters
              </p>
              <p className="flex items-center">
                <span className={`w-2 h-2 rounded-full mr-2 ${password === confirmPassword && password.length > 0 ? 'bg-green-500' : 'bg-[#343535]'}`}></span>
                Passwords match
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#f3cf1a] hover:bg-[#f3cf1a]/90 text-[#010101] font-semibold py-3 px-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#f3cf1a] focus:ring-offset-2 focus:ring-offset-[#343535] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-page" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Terms and conditions */}
          <div className="mt-6 text-center">
            <p className="text-xs text-[#a0a0a0]">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-[#f3cf1a] hover:text-[#f3cf1a]/80 transition-all duration-200">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-[#f3cf1a] hover:text-[#f3cf1a]/80 transition-all duration-200">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-[#a0a0a0]">
            Already have an account?{' '}
            <Link 
              to="/" 
              className="text-[#f3cf1a] hover:text-[#f3cf1a]/80 font-medium transition-all duration-200"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
