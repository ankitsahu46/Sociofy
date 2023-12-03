import { useNavigate } from "react-router-dom";
import { Form } from "./";

function SignUp() {
  const navigate = useNavigate();

  const registerUser = async (formData, submitBtnRef) => {
    const { email, password, username, name } = formData;

    const response = await fetch('http://localhost:8080/signup', {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        username: username.toLowerCase(),
        name: name
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const result = await response.json();

    if (result.success) {
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/");
    }
    else {
      alert("Couldn't signup! Please try again.")
      submitBtnRef.current.disabled = false;
    }
  }

  return (
    <Form name="Sign Up" func={registerUser} isSignup={true} />
  )
}

export default SignUp