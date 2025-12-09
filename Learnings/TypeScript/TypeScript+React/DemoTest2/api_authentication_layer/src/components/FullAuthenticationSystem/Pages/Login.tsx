import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");




  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('Handle Event Login')
    setError("");

    const ok = await login(email, password).catch(err => {
      console.error("Login crashed", err);
      setError("Something broke");
      return false;
    });


    if (!ok) {
      setError("Invalid username or password");
    }
  };

  const handleClear = () => {
    setEmail('');
    setPassword('');
    setError('')
  }

  return (
    <div >
      <h2 className="text-secondary " >Login Page</h2>
      <div className="col-md-8 "  >
        <form onSubmit={handleLogin} onReset={handleClear} className="border border-1 rounded ms-auto me-auto " >
          <div className="d-flex justify-content-evenly" >


            <div className="d-flex col-md-4 me-2">
              <label htmlFor="Email" className="me-5" >Email:</label>
              <input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control col"

              />
            </div>


            <div className="d-flex col-md-4">

              <label htmlFor="Password">Password :</label>
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=" ms-3 form-control col"

              />
            </div>
          </div>
          <div className="d-flex justify-content-evenly">

            <button type="submit" className="btn btn-outline-primary py-0 me-2" >Login</button>
            <button type="reset" className="btn btn-outline-danger py-0" >Clear</button>
          </div>


          {error && <p className="text-danger" >{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
