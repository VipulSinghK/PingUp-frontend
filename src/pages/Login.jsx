// src/pages/Login.tsx
import React, { useState } from 'react';
import { replace } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import { FcGoogle } from 'react-icons/fc';     // ← uncomment if you install react-icons

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Replace with your actual login logic (e.g., fetch to backend / Supabase / Firebase / etc.)
    fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Login response:', data);
        if (data && data.user) {
          localStorage.setItem('PingUpuser', JSON.stringify(data.user));
          setCurrentUser(data.user);
          Navigate('/' , {replace : true});
        } else {
          console.error('Invalid response format:', data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error('Login error:', error);
        setIsLoading(false);
      });
      // Example: alert('Logged in!'); or redirect
  };

  const handleGoogleSignIn = () => {
    // TODO: Implement Google OAuth login
    console.log('Google sign-in clicked');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50/80 to-white flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-white/60 -z-10"></div>

      <div className="relative w-full max-w-4xl grid md:grid-cols-2 gap-8 lg:gap-12 items-center">

        {/* Branding - unchanged */}
        <div className="absolute top-6 left-6 md:top-8 md:left-10 z-10 flex items-center gap-2.5">
          <img
            src="/share.png"
            alt="PingUp Logo"
            className="w-8 h-8 object-contain drop-shadow-sm"
          />
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-amber-800">
            PingUp
          </h1>
        </div>

        <div className="absolute top-6 right-6 md:top-8 md:right-10 z-10">
          <img
            src="/share.png"
            alt="PingUp Logo Small"
            className="w-9 h-9 object-contain opacity-80 drop-shadow-sm"
          />
        </div>

        {/* Left side - Hero content - unchanged */}
        <div className="text-center md:text-left space-y-6 text-gray-900 mt-16 md:mt-0">
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-2.5">
              <div className="flex -space-x-2">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Developer 1"
                  className="w-9 h-9 rounded-full border-2 border-white shadow-sm object-cover"
                />
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Developer 2"
                  className="w-9 h-9 rounded-full border-2 border-white shadow-sm object-cover"
                />
                <img
                  src="https://randomuser.me/api/portraits/men/65.jpg"
                  alt="Developer 3"
                  className="w-9 h-9 rounded-full border-2 border-white shadow-sm object-cover"
                />
              </div>
              <div className="flex items-center gap-1 text-amber-500">
                <span className="text-xl">★★★★★</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm font-medium">
              Trusted by <span className="text-amber-800 font-semibold">12,000+</span> developers
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight text-gray-900">
            Real connections,<br />not just chats
          </h2>

          <p className="text-base md:text-lg text-gray-700 max-w-md mx-auto md:mx-0">
            Join a focused community built for meaningful conversations on{' '}
            <span className="font-semibold text-amber-800">PingUp</span>.
          </p>
        </div>

        {/* Right side - Custom Login Form */}
        <div className="bg-white/95 border border-amber-100 rounded-xl shadow-md p-7 md:p-9">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900">Welcome back</h2>
              <p className="text-sm text-gray-600 mt-1">Sign in to your account</p>
            </div>

            {/* Google Sign In Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-2 bg-white hover:bg-amber-50/60 border border-amber-200 text-gray-800 shadow-sm py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              {/* <FcGoogle className="text-xl" /> */}
              <span>Continue with Google</span>
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-amber-100"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-2 text-gray-500">or</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full bg-white border border-amber-200 text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:ring-amber-500/20 rounded-lg py-2.5 px-4 text-sm outline-none transition"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white border border-amber-200 text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:ring-amber-500/20 rounded-lg py-2.5 px-4 text-sm outline-none transition"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <a href="#" className="text-amber-700 hover:text-amber-800 font-medium">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white shadow-md py-2.5 px-4 rounded-lg text-sm font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="/signup" className="text-amber-700 hover:text-amber-800 font-medium">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;