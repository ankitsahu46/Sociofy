import { useNavigate } from "react-router-dom";
import { Form } from "..";

function Login() {
  const navigate = useNavigate();

  const verifyUser = async (formData, submitBtnRef) => {
    const response = await fetch('http://localhost:8080/login', {
      method: "POST",
      body: JSON.stringify({ email: formData.email, password: formData.password }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const result = await response.json();

    if (result.success) {
      localStorage.setItem('email', JSON.stringify(result?.result?.email));
      localStorage.setItem('user_id', JSON.stringify(result?.result?._id));
      localStorage.setItem('username', JSON.stringify(result?.result?.username));
      localStorage.setItem('name', JSON.stringify(result?.result?.name));
      localStorage.setItem('img', JSON.stringify(result?.result?.img || "")) ;
      localStorage.setItem('bio', JSON.stringify(result?.result?.bio));
      localStorage.setItem('followers', JSON.stringify(result?.result?.followers));
      localStorage.setItem('following', JSON.stringify(result?.result?.following));
      localStorage.setItem('posts', JSON.stringify(result?.result?.posts));  
      localStorage.setItem('token', JSON.stringify(result?.auth));
      navigate("/");
    }
    else {
      alert("Couldn't login! Please try again.");
      submitBtnRef.current.disabled = false;
    }
  }

  return (
    <Form name="Login" func={verifyUser} />
  )
}

export default Login