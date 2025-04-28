'use client';

import { useState } from 'react';

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Invalid phone number or password.');
        return;
      }

      window.location.href = '/dashboard'; // Redirect after login
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred.');
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div
        style={{ animation: 'slideInFromLeft 1s ease-out' }}
        className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden p-8 space-y-8"
      >
        <h2
          style={{ animation: 'appear 2s ease-out' }}
          className="text-center text-4xl font-extrabold text-gray-900"
        >
          Welcome
        </h2>
        <p style={{ animation: 'appear 3s ease-out' }} className="text-center text-gray-600">
          Sign in to your account
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <input
              placeholder="123-456-7890"
              className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 bg-transparent placeholder-transparent focus:outline-none focus:border-blue-500"
              required
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <label
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all 
                         peer-placeholder-shown:text-base 
                         peer-placeholder-shown:text-gray-400 
                         peer-placeholder-shown:top-2 
                         peer-focus:-top-3.5 
                         peer-focus:text-blue-500 
                         peer-focus:text-sm"
              htmlFor="phoneNumber"
            >
              Phone number
            </label>
          </div>

          <div className="relative">
            <input
              placeholder="Password"
              className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 bg-transparent placeholder-transparent focus:outline-none focus:border-blue-500"
              required
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all 
                         peer-placeholder-shown:text-base 
                         peer-placeholder-shown:text-gray-400 
                         peer-placeholder-shown:top-2 
                         peer-focus:-top-3.5 
                         peer-focus:text-blue-500 
                         peer-focus:text-sm"
              htmlFor="password"
            >
              Password
            </label>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-600">
              <input
                className="form-checkbox h-4 w-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                type="checkbox"
              />
              <span className="ml-2">Remember me</span>
            </label>
            <a className="text-sm text-blue-600 hover:underline" href="#">
              Forgot your password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 rounded-md shadow-lg text-white font-semibold transition duration-200"
          >
            Sign In
          </button>
        </form>

        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="text-center text-gray-600">
          Don't have an account?{' '}
          <a className="text-blue-600 hover:underline" href="/signup">
            Sign up
          </a>
        </div>
      </div>
    </main>
  );
}
