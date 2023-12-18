import { useState } from "react";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading]=useState(false)
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("https://rfpdemo.velsof.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      let resJson = await res.json();
      console.log(resJson);
      if (res.status === 200) {
        setEmail("");
        setPassword("");
        setLoading(true);
      } else {
        console.error("Some error occurred");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="App">
      {loading?<div>
        <h1>
          Your are log in successfullly
        </h1>
      </div>:
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Enter the password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
      </form>
}
    </div>
  );
}
export default Login;



