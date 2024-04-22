import { useRouter } from "next/router";
import React, { useState } from "react";

function Index() {

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter()

  const signupNewUser = async (event) => {
    event.preventDefault();

    const user = {
      firstname,
      lastname,
      username,
      email,
      password
    }

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(user)
    })

    console.log(res);

    if (res.status === 201) {
      setFirstname(''),
        setLastname(''),
        setUsername(''),
        setEmail(''),
        setPassword('')

      alert('user created successfully :))')
      router.replace('/dashboard')
    }
  }

  return (
    <div className="box">
      <h1 align="center">SignUp Form</h1>
      <form role="form" method="post">
        <div className="inputBox">
          <input type="text" autoComplete="off" required
            value={firstname}
            onChange={(event => setFirstname(event.target.value))}
          />
          <label>Firstname</label>
        </div>
        <div className="inputBox">
          <input type="text" autoComplete="off" required
            value={lastname}
            onChange={(event => setLastname(event.target.value))}
          />
          <label>Lastname</label>
        </div>
        <div className="inputBox">
          <input type="text" autoComplete="off" required
            value={username}
            onChange={(event => setUsername(event.target.value))}
          />
          <label>Username</label>
        </div>
        <div className="inputBox">
          <input type="email" autoComplete="off" required
            value={email}
            onChange={(event => setEmail(event.target.value))}
          />
          <label>Email</label>
        </div>
        <div className="inputBox">
          <input type="password" autoComplete="off" required
            value={password}
            onChange={(event => setPassword(event.target.value))}
          />
          <label>Password</label>
        </div>

        <input type="submit" className="register-btn" value="Sign Up" onClick={signupNewUser} />
      </form>
    </div>
  );
}

export default Index;
