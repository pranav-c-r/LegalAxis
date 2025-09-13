import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../context/UserAuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {logIn, googleSignIn} = useUserAuth();
  const navigate = useNavigate();

  // Animation for floating elements
  useEffect(() => {
    const animateElements = document.querySelectorAll('.animate-float');
    animateElements.forEach(el => {
      el.style.animationDelay = `${Math.random() * 0.5}s`;
    });
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await logIn(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async(e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try{
      await googleSignIn();
      navigate("/dashboard");
    }
    catch(err){
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-[#010101] flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="absolute animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 20}px`,
              height: `${Math.random() * 100 + 20}px`,
              opacity: Math.random() * 0.1 + 0.05,
              background: `radial-gradient(circle, #f3cf1a ${Math.random() * 20}%, transparent 70%)`,
              animationDuration: `${Math.random() * 10 + 15}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>

      <div className="max-w-md w-full space-y-8 z-10">
        {/* Header with animation */}
        <div className="text-center transform transition-all duration-700 hover:scale-105">
          <div className="flex justify-center mb-6 animate-float" style={{animationDuration: '6s'}}>
            <div className="w-20 h-20 flex items-center justify-center bg-[#f3cf1a]/10 rounded-2xl p-2 shadow-lg backdrop-blur-sm border border-[#f3cf1a]/20">
              <img 
                src="/logolegal.png" 
                alt="LegalAxis Logo" 
                className="h-16 w-auto object-contain select-none transform transition-transform duration-300 hover:scale-110" 
                draggable="false" 
              />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-[#f3cf1a] animate-fade-in-down">Welcome to LegalAxis</h2>
          <p className="mt-2 text-[#e0e0e0] animate-fade-in-down" style={{animationDelay: '0.2s'}}>Sign in to your account</p>
        </div>

        {/* Login Form */}
  <div className="bg-[#222222] rounded-2xl shadow-2xl p-8 border border-[#343535] transform transition-all duration-500 hover:shadow-[#f3cf1a]/10 hover:shadow-xl animate-fade-in-up">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg animate-shake">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <label htmlFor="email" className="block text-sm font-medium text-[#FFFFFF] mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#343535] rounded-lg text-[#FFFFFF] placeholder-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#f3cf1a] focus:border-transparent transition-all duration-200 focus:shadow-[0_0_0_3px_rgba(243,207,26,0.2)]"
                placeholder="Enter your email"
              />
            </div>

            <div className="animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <label htmlFor="password" className="block text-sm font-medium text-[#FFFFFF] mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#343535] rounded-lg text-[#FFFFFF] placeholder-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#f3cf1a] focus:border-transparent transition-all duration-200 focus:shadow-[0_0_0_3px_rgba(243,207,26,0.2)]"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#f3cf1a] hover:bg-[#f3cf1a]/90 text-[#010101] font-semibold py-3 px-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#f3cf1a] focus:ring-offset-2 focus:ring-offset-[#343535] disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 hover:shadow-lg animate-fade-in-up"
              style={{animationDelay: '0.5s'}}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-page" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#343535]/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#222222] text-[#a0a0a0]">Or continue with</span>
              </div>
            </div>
          </div>

          {/* Google Sign In */}
          <div className="mt-6 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
            <GoogleButton
              onClick={handleGoogleSignIn}
              disabled={loading}
              style={{
                width: '100%',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
                opacity: loading ? 0.7 : 1,
                transition: 'all 0.3s ease',
                background: '#f3cf1a',
                color: '#010101',
                border: '1px solid #f3cf1a'
              }}
              className="transform hover:-translate-y-0.5 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <p className="text-[#a0a0a0]">
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              className="text-[#f3cf1a] hover:text-[#f3cf1a]/80 font-medium transition-all duration-300 hover:underline"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-float {
          animation: float infinite ease-in-out;
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.6s forwards;
          opacity: 0;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s forwards;
          opacity: 0;
        }
        .animate-shake {
          animation: shake 0.5s;
        }
      `}</style>
    </div>
  );
};

export default Login;