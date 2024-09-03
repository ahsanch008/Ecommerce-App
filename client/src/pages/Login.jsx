import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaGoogle } from 'react-icons/fa';

function Login() {
  const { loginWithGoogle } = useAuth();

  return (
    <div className="min-h-screen  flex flex-col">
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl w-full flex bg-white  shadow-2xl overflow-hidden">
          {/* Left side - Welcome message */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-red-400 to-red-600 text-white p-12 flex-col justify-center">
            <div className="text-4xl font-bold mb-6">Welcome to URBANStore</div>
            <p className="mb-8 text-lg">Discover the latest fashion trends and elevate your style with our curated collections.</p>
            <ul className="space-y-4 text-lg">
              <li className="flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Browse exclusive collections
              </li>
              <li className="flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Get personalized recommendations
              </li>
              <li className="flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Access exclusive deals and offers
              </li>
              <li className="flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Track your orders easily
              </li>
            </ul>
          </div>

          {/* Right side - Login form */}
          <div className="w-full lg:w-1/2 p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Log in to your account</h2>

            <button
              onClick={loginWithGoogle}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent  shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 mb-6"
            >
              <FaGoogle className="mr-2" />
              Continue with Google
            </button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OR</span>
              </div>
            </div>

            <form className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 ">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1 bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="mt-1 bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent  shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
                >
                  Sign In
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <Link to="/forgot-password" className="text-sm text-red-600 hover:text-red-500">
                Forgot password?
              </Link>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-red-600 hover:text-red-500">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default Login;