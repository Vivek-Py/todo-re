import React from "react";
import "./Login.css";

const Auth = (props) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    hadnleLogin,
    hadnleSignup,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError,
  } = props;

  return (
    <section className="login">
      <div className="loginContainer shadow">
        <label className="base">Username</label>
        <input className="base"
          type="text"
          autoFocus
          required
          value={email}
          placeholder="test@email.com"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <p className="errorMsg">{emailError}</p>
        <label className="base">Password</label>
        <input className="base"
          type="text"
          autoFocus
          required
          value={password}
          placeholder="testPassword"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <p className="errorMsg">{passwordError}</p>
        <div className="btnContainer">
          {hasAccount ? (
            <>
              <button className="signio" onClick={hadnleLogin}>
                Sign In
              </button>
              <p>
                Don't have an account?{" "}
                <span onClick={() => setHasAccount(!hasAccount)}>Sign Up</span>
              </p>
            </>
          ) : (
            <>
              <button className="signio" onClick={hadnleSignup}>
                Sign Up
              </button>
              <p>
                Have an account?{" "}
                <span onClick={() => setHasAccount(!hasAccount)}>Sign In</span>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Auth;
