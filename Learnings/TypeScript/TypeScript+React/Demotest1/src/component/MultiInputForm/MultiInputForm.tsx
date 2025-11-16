import React, { useState } from "react";

const initialState = {
  name: "",
  age: "",
  email: ""
};

export default function MultiInputForm() {
  const [user, setUser] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user);
    setUser(initialState);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 p-4">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          User Form
        </h2>

        <form onSubmit={handleSubmitForm} className="flex flex-col gap-4">

          {/* Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-300 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="bg-gray-700 border border-gray-600 text-white p-2 rounded focus:outline-none focus:border-cyan-400"
              placeholder="Enter your name"
            />
          </div>

          {/* Age */}
          <div className="flex flex-col">
            <label htmlFor="age" className="text-gray-300 mb-1">Age</label>
            <input
              type="text"
              name="age"
              value={user.age}
              onChange={handleChange}
              className="bg-gray-700 border border-gray-600 text-white p-2 rounded focus:outline-none focus:border-cyan-400"
              placeholder="Enter your age"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="bg-gray-700 border border-gray-600 text-white p-2 rounded focus:outline-none focus:border-cyan-400"
              placeholder="Enter your email"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="mt-4 bg-cyan-500 py-2 rounded text-white font-semibold hover:bg-cyan-600 active:bg-cyan-700 transition-all"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
