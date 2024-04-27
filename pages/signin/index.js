import { useRouter } from "next/router";
import React, { useState } from "react";

function Index() {

  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const signIn = async (event) => {
    event.preventDefault();

    const user = { identifier, password }

    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })

    console.log("res =>", res);

    if (res.status === 200) {
      setIdentifier('')
      setPassword('')
      alert('User Logged in Successfully')
      router.replace('/dashboard')
    }

  }

  return (
    <div className="box">
      <h1 align="center">Login Form</h1>
      <form role="form" method="post">
        <div className="inputBox">
          <input type="text" autoComplete="off"
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
            required />
          <label>Username</label>
        </div>
        <div className="inputBox">
          <input type="password" autoComplete="off"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required />
          <label>Password</label>
        </div>

        <input type="submit" className="register-btn" value="Sign In" onClick={signIn} />
      </form>
    </div>
  );
}

export default Index;
