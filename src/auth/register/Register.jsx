import { useEffect, useRef, useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const modalRef = useRef(null); // Reference to the modal container

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      password,
    };

    try {
      setLoading(true);
      const response = await fetch(
        "https://ctfhawksbackend.onrender.com/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      setLoading(false);
      if (!response.ok) {
        let message = "";
        // Handle different status codes and set the message accordingly
        switch (response.status) {
          case 401:
            message = "Username already exists."; // Custom message for 400
            break;
          case 400:
            message = "User Email already exists."; // Custom message for 400
            break;
          case 405:
            message = "Email must be at least 5 characters."; // Custom message for 405
            break;
          case 406:
            message = "Password must be at least 5 characters."; // Custom message for 406
            break;
          default:
            message = `Error: ${response.status} ${response.statusText}`; // Generic error message
        }

        setErrorMessage(message);
        setErrorModalVisible(true);
      } else {
        // Registration successful, navigate to login page
        navigate("/login");
      }
    } catch (error) {
      // Handle unexpected errors
      setLoading(false);
      let message = "An unexpected error occurred.";
      setErrorMessage(message);
      setErrorModalVisible(true);
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
            <h2>Register</h2>
            <form className="loginform" onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <i>Name</i>
              </div>
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
            <Link className="link" to="/login">
              <button className="form-register">login</button>
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

export default Register;
