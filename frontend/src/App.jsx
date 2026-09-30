import { useEffect, useState } from "react";
import {
  registerUser,
  recognizeUser,
  verifyCode,
  submitCheckout,
} from "./api";
import "./App.css";

function App() {
  const [page, setPage] = useState("register");

  // Registration
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");

  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [loginCode, setLoginCode] = useState("");

  // Checkout
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");

  const [emailError, setEmailError] = useState("");
  const [recognizing, setRecognizing] = useState(false);
  const [recognizedUser, setRecognizedUser] = useState(null);

  // Login modal
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [verifying, setVerifying] = useState(false);

  // Logged-in user
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Checkout
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [checkoutError, setCheckoutError] = useState("");

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  async function handleRegister(event) {
    event.preventDefault();

    setRegisterError("");
    setLoginCode("");

    if (!firstName.trim() || !lastName.trim() || !registerEmail.trim()) {
      setRegisterError("Please complete all fields.");
      return;
    }

    if (!isValidEmail(registerEmail)) {
      setRegisterError("Please enter a valid email address.");
      return;
    }

    try {
      setRegisterLoading(true);

      const result = await registerUser(
        registerEmail.trim(),
        firstName.trim(),
        lastName.trim()
      );

      setLoginCode(result.login_code);
    } catch (error) {
      setRegisterError(error.message || "Registration failed.");
    } finally {
      setRegisterLoading(false);
    }
  }

  function handleEmailChange(event) {
  const value = event.target.value;

  setEmail(value);
  setEmailError("");
  setRecognizedUser(null);
  setCheckoutMessage("");
  setCheckoutError("");

  if (loggedInUser && value.trim() !== loggedInUser.email) {
    setLoggedInUser(null);
  }

  if (!value) {
    setRecognizing(false);
    return;
  }

  if (!isValidEmail(value)) {
    setEmailError("Enter a valid email address.");
  }
}
useEffect(() => {
  if (!isValidEmail(email)) {
    setRecognizing(false);
    return;
  }

  if (
    loggedInUser &&
    loggedInUser.email === email.trim()
  ) {
    return;
  }

  const timer = setTimeout(async () => {
    try {
      setRecognizing(true);

      const result = await recognizeUser(email.trim());

      if (result.recognized) {
        setRecognizedUser(result.user);
        setShowLoginModal(true);
      } else {
        setRecognizedUser(null);
      }
    } catch (error) {
      console.error("Recognition error:", error);
    } finally {
      setRecognizing(false);
    }
  }, 500);

  return () => clearTimeout(timer);
}, [email, loggedInUser]);


  async function handleVerifyCode(event) {
    event.preventDefault();

    setCodeError("");

    if (code.length !== 6) {
      setCodeError("Enter the 6-digit login code.");
      return;
    }

    try {
      setVerifying(true);

      const result = await verifyCode(email.trim(), code);

      if (result.verified) {
        setLoggedInUser(result.user);
        setShowLoginModal(false);
        setCode("");
      }
    } catch (error) {
      setCodeError(error.message || "Incorrect login code.");
    } finally {
      setVerifying(false);
    }
  }

  function handleSkipLogin() {
    setShowLoginModal(false);
    setCode("");
    setCodeError("");
  }

  async function handleCheckout(event) {
    event.preventDefault();

    setCheckoutError("");
    setCheckoutMessage("");

    if (!email || !phone || !shippingAddress) {
      setCheckoutError("Please complete all checkout fields.");
      return;
    }

    if (!isValidEmail(email)) {
      setCheckoutError("Please enter a valid email address.");
      return;
    }

    try {
      setCheckoutLoading(true);

      const result = await submitCheckout(
        email.trim(),
        phone.trim(),
        shippingAddress.trim()
      );

      setCheckoutMessage(result.message);
    } catch (error) {
      setCheckoutError(error.message || "Checkout failed.");
    } finally {
      setCheckoutLoading(false);
    }
  }

  function goToCheckout() {
    setPage("checkout");

    if (registerEmail) {
      setEmail(registerEmail);
    }
  }

  function goToRegister() {
    setPage("register");
    setCheckoutMessage("");
    setCheckoutError("");
  }

  return (
    <div className="page">
      {/* HEADER */}
      <header className="topbar">
        <div className="logo">
          <div className="logo-mark">O</div>
          <span>OTP Checkout</span>
        </div>

        <div className="secure-label">
           Secure checkout
        </div>
      </header>

      {/* MAIN */}
      <main className="main-container">
        <section className="content-card">
          <div className="card-content">

            {/* ================= REGISTER ================= */}
            {page === "register" && (
              <>
                <div className="eyebrow">Account setup</div>

                <h1>Create your account</h1>

                <p className="subtitle">
                  Register your details once and make your checkout
                  experience faster.
                </p>

                <form onSubmit={handleRegister}>
                  <div className="form-grid">

                    <div className="form-group">
                      <label htmlFor="firstName">
                        First name
                      </label>

                      <input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(event) =>
                          setFirstName(event.target.value)
                        }
                        placeholder="Enter Your First Name"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="lastName">
                        Last name
                      </label>

                      <input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(event) =>
                          setLastName(event.target.value)
                        }
                        placeholder="Enter Your Last Name"
                      />
                    </div>

                    <div className="form-group full">
                      <label htmlFor="registerEmail">
                        Email address
                      </label>

                      <input
                        id="registerEmail"
                        type="email"
                        value={registerEmail}
                        onChange={(event) =>
                          setRegisterEmail(event.target.value)
                        }
                        placeholder="Enter Your Email"
                      />
                    </div>
                  </div>

                  {registerError && (
                    <div className="error">
                      {registerError}
                    </div>
                  )}

                  <button
                    className="primary-button"
                    type="submit"
                    disabled={registerLoading}
                  >
                    {registerLoading
                      ? "Creating account..."
                      : "Create account"}
                  </button>
                </form>

                {loginCode && (
                  <div className="code-box">
                    <p>Your login code is</p>

                    <strong>{loginCode}</strong>

                    <span>
                      Keep this code safe. You will use it
                      during checkout.
                    </span>
                  </div>
                )}

                <div className="switch-text">
                  Already registered?{" "}
                  <span
                    className="switch-link"
                    onClick={goToCheckout}
                  >
                    Continue to checkout →
                  </span>
                </div>
              </>
            )}

            {/* ================= CHECKOUT ================= */}
            {page === "checkout" && (
              <>
                <div className="checkout-top">
                  <div>
                    <div className="eyebrow">
                      Order details
                    </div>

                    <h1>Checkout</h1>

                    <p className="subtitle">
                      Enter your details to complete your
                      order.
                    </p>
                  </div>

                  {loggedInUser && (
                    <div className="user-badge">
                      ✓ Hi, {loggedInUser.first_name}
                    </div>
                  )}
                </div>

                <form onSubmit={handleCheckout}>
                  <div className="form-group">
                    <label htmlFor="checkoutEmail">
                      Email address
                    </label>

                    <input
                      id="checkoutEmail"
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="Enter Your Email"
                    />

                    {emailError && (
                      <div className="field-error">
                        {emailError}
                      </div>
                    )}

                    {recognizing && (
                      <div className="recognizing">
                        Checking your account...
                      </div>
                    )}

                    {recognizedUser &&
                      !showLoginModal &&
                      !loggedInUser && (
                        <div className="recognized">
                          ✓ Account recognized
                        </div>
                      )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">
                      Phone number
                    </label>

                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(event) =>
                        setPhone(event.target.value)
                      }
                      placeholder="Enter Your Phone Number"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="shippingAddress">
                      Shipping address
                    </label>

                    <textarea
                      id="shippingAddress"
                      value={shippingAddress}
                      onChange={(event) =>
                        setShippingAddress(event.target.value)
                      }
                      placeholder="Enter your complete shipping address"
                      rows="4"
                    />
                  </div>

                  {checkoutError && (
                    <div className="error">
                      {checkoutError}
                    </div>
                  )}

                  {checkoutMessage && (
                    <div className="success">
                      ✓ {checkoutMessage}
                    </div>
                  )}

                  <button
                    className="primary-button"
                    type="submit"
                    disabled={checkoutLoading}
                  >
                    {checkoutLoading
                      ? "Saving checkout..."
                      : "Complete checkout"}
                  </button>
                </form>

                <button
                  className="secondary-button"
                  onClick={goToRegister}
                >
                  ← Back to registration
                </button>
              </>
            )}
          </div>
        </section>
      </main>

      {/* ================= LOGIN MODAL ================= */}
      {showLoginModal && (
        <div className="modal-overlay">
          <div className="modal">

            <div className="modal-icon">
              
            </div>

            <h2>Welcome back!</h2>

            <p>
              We found an existing account for{" "}
              <strong>{email}</strong>.
            </p>

            <p>
              Enter your 6-digit login code to continue.
            </p>

            <form onSubmit={handleVerifyCode}>
              <input
                className="code-input"
                type="text"
                inputMode="numeric"
                maxLength="6"
                value={code}
                onChange={(event) =>
                  setCode(
                    event.target.value.replace(/\D/g, "")
                  )
                }
                placeholder=""
              />

              {codeError && (
                <div className="error">
                  {codeError}
                </div>
              )}

              <button
                className="primary-button"
                type="submit"
                disabled={verifying}
              >
                {verifying
                  ? "Verifying..."
                  : "Verify & login"}
              </button>
            </form>

            <button
              className="skip-button"
              onClick={handleSkipLogin}
            >
              Continue as guest
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;