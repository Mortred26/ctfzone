import { useEffect, useRef, useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const modalRef = useRef(null);

  // Close modal if click is outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setErrorModalVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // Event listener for click outside
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup the event listener
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://ctfhawksbackend.onrender.com/api/users/login",
        {
          email,
          password,
        }
      );

      const {
        accessToken,
        refreshToken,
        role,
        email: userEmail,
      } = response.data;

      // Save tokens and role to localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("role", role);
      localStorage.setItem("email", userEmail);

      // Login successful, navigate to the dashboard or another page
      window.location.reload();
      navigate("/");

      console.log("Login successful:", response.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setErrorMessage("Invalid email or password. Please try again."); // Set message for modal
        setErrorModalVisible(true); // Show the modal
      } else {
        console.error("Login error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section1">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <div className="sign-main">
        <div className="signin">
          <div className="login-content">
            <h2>Login</h2>
            <form className="loginform" onSubmit={handleLogin}>
              <div className="inputBox">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <i>Email</i>
              </div>
              <div className="inputBox">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <i>Password</i>
              </div>

              <div className="inputBox">
                {loading ? (
                  <div className="loader"></div>
                ) : (
                  <input
                    type="submit"
                    className="login-button"
                    disabled={loading}
                    value="Login"
                  />
                )}
              </div>
            </form>
            <Link className="link" to="/register">
              <button className="form-register">Signup</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Modal */}
      {errorModalVisible && (
        <div className="alert-main">
          <div className="alert-container" ref={modalRef}>
            <div className="face2">
              <div className="eye left"></div> {/* Chap ko‘z */}
              <div className="eye right"></div> {/* O‘ng ko‘z */}
              <div className="mouth"></div>
            </div>
            <h2>Error</h2>
            <p>{errorMessage}</p>
            <button onClick={() => setErrorModalVisible(false)} type="button">
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Login;
