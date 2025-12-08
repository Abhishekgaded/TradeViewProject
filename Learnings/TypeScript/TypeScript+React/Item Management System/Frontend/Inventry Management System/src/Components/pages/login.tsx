import type React from "react";
import { useState } from "react";



const LoginPage = () => {
  const [formDetails, setFormDetails] = useState({
    username: '',
    password: ''
  })

  const initialFormValues = useState({
    username: '',
    password: ''
  });
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('FromDetails :', formDetails)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormDetails((prev) => ({
      ...prev,       // keep other fields unchanged
      [name]: value, // update the specific field
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors">

      {/* Login Card */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm transition-colors">

        {/* Theme Toggle Button */}
        <div className="flex justify-end mb-4">

        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
          Login
        </h1>
        <div>

          <form action="" onSubmit={handleLogin} >



            {/* Name Field */}
            <div className="mb-4">
              <label htmlFor="Name" className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                Name
              </label>
              <input
                id="Name"
                type="text"
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                       transition-colors"
                onChange={handleChange} value={formDetails.username} name='username'
              />
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label htmlFor="Password" className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                Password
              </label>
              <input
                id="Password"
                type="password"
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                       focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                       transition-colors"
                onChange={handleChange} value={formDetails.password} name="password"
              />
            </div>

            {/* Login Button */}
            <button className="w-1/2 bg-blue-600 dark:bg-blue-500 text-white py-2 rounded 
                           hover:bg-blue-700 dark:hover:bg-blue-600 transition">
              Login
            </button>
            <button className="w-1/2 bg-red-600 dark:bg-red-500 text-white py-2 rounded 
                           hover:bg-red-700 dark:hover:bg-red-600 transition" onClick={() => { setFormDetails({ username: '', password: '' }) }} >
              Clear
            </button>
          </form>
        </div>
      </div>
    </div >
  );
};

export default LoginPage;
