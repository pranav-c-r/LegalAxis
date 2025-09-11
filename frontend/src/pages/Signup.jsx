
import { useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard');
    } catch (err) {
      setError('Google sign-in failed.');
    }
  };

  if (user) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-text">
      <div className="bg-box p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-primary text-center">Sign Up</h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="p-3 rounded bg-background border border-primary text-text focus:outline-none"
          />
          <button
            onClick={handleGoogleSignIn}
            className="bg-primary text-background py-2 rounded font-semibold hover:bg-yellow-400 transition flex items-center justify-center gap-2"
            disabled={!username}
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.61l6.85-6.85C36.64 2.69 30.8 0 24 0 14.82 0 6.73 5.48 2.69 13.44l7.98 6.2C12.13 13.13 17.62 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.04l7.18 5.59C43.93 37.13 46.1 31.36 46.1 24.55z"/><path fill="#FBBC05" d="M10.67 28.13a14.5 14.5 0 010-8.26l-7.98-6.2A23.94 23.94 0 000 24c0 3.77.9 7.34 2.69 10.56l7.98-6.2z"/><path fill="#EA4335" d="M24 48c6.48 0 11.93-2.14 15.9-5.82l-7.18-5.59c-2.01 1.35-4.6 2.15-8.72 2.15-6.38 0-11.87-3.63-14.33-8.94l-7.98 6.2C6.73 42.52 14.82 48 24 48z"/><path fill="none" d="M0 0h48v48H0z"/></g></svg>
            Sign up with Google
          </button>
          {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
        </div>
        <p className="mt-4 text-center text-sm">Already have an account? <a href="/login" className="text-primary hover:underline">Login</a></p>
      </div>
    </div>
  );
};

export default Signup;
