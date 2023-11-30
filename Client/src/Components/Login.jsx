import { useNavigate } from "react-router-dom";
import { Form } from "./";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (e, formData) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8080/login', {
      method: "POST",
      body: JSON.stringify({ formData }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const result = await response.json();

    if (result.success) {
      localStorage.setItem('token', JSON.stringify(result.auth));
      navigate("/");
    }
    else {
      alert("Couldn't login! Please try again.")
    }
  }

  return (
    <Form name="Login" handleSubmit={handleSubmit} />
  )
}

export default Login