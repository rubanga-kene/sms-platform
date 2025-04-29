'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [error, setError] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!acceptTerms) {
      setError('You must accept the Terms and Conditions.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('projectName', projectName);
      formData.append('phoneNumber', phoneNumber);
      formData.append('password', password);
      formData.append('profilePicture', profilePicture!);

      const res = await fetch('/api/signup', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const contentType = res.headers.get("content-type");
        let errorMessage = 'Something went wrong.';
      
        if (contentType && contentType.includes("application/json")) {
          const data = await res.json();
          errorMessage = data.error || errorMessage;
        } else {
          const text = await res.text();
          errorMessage = text || errorMessage;
        }
      
        setError(errorMessage);
        return;
      }
      
      

      window.location.href = '/'; // Redirect to login page after success
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred.');
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSignup} className="flex flex-col items-center justify-center w-full max-w-4xl px-6 py-8 mx-auto lg:py-0">
        {/* Increased width for larger screens: max-w-4xl */}
        <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-4xl xl:p-0">
          <div className="p-8 space-y-6 md:space-y-8 sm:p-10">
            <p className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl text-center">
              Create an account
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900">
                  Full Name
                </label>
                <input
                  placeholder="John Doe"
                  id="fullName"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              {/* Project Name */}
              <div>
                <label htmlFor="projectName" className="block mb-2 text-sm font-medium text-gray-900">
                  Project Name
                </label>
                <input
                  placeholder="My Project"
                  id="projectName"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  required
                />
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900">
                  Phone Number
                </label>
                <input
                  placeholder="07********"
                  id="phoneNumber"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>

              {/* Profile Picture */}
              <div>
                <label htmlFor="profilePicture" className="block mb-2 text-sm font-medium text-gray-900">
                  Profile Picture
                </label>
                <input
                  id="profilePicture"
                  type="file"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  onChange={(e) => setProfilePicture(e.target.files ? e.target.files[0] : null)}
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                  Password
                </label>
                <input
                  placeholder="••••••••"
                  id="password"
                  type="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900">
                  Confirm password
                </label>
                <input
                  placeholder="••••••••"
                  id="confirmPassword"
                  type="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-light text-gray-500">
                  I accept the{' '}
                  <a href="#" className="font-medium text-primary-600 hover:underline">
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
            >
              Create an account
            </button>

            {error && <p className="text-center text-red-500">{error}</p>}

            {/* Link to Login Page */}
            <p className="text-sm font-light text-gray-500 text-center">
              Already have an account?{' '}
              <Link href="/" className="font-medium text-blue-600 hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </form>
    </main>
  );
}
