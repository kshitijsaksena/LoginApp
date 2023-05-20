import './Register.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login(){

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function loginUser(event){
    event.preventDefault();
    const response = await fetch('http://localhost:4000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    
    let data = await response.json();

    if(response.status === 200){
      if (!data.token) {
        alert('Unable to login. Please try after some time.');
        return;
    }
    localStorage.clear();
    localStorage.setItem('user-token', data.token);
    setTimeout(() => {
      navigate('/dashboard',{ state: { email: email } });
    }, 500);
    }
  }
  
    return (
        <div className="container">
      <div className="form-box">
        <h1 id="title">Sign In</h1>
        <form>
          <div className="input-group">
            <div className="input-field">
              <i className="fa-solid fa-envelope"></i>
              <input type="email" placeholder="Email" onChange={(event)=>{ setEmail(event.target.value) }}/>
            </div>
            <div className="input-field">
              <i className="fa-solid fa-lock"></i>
              <input type="password" placeholder="Password" onChange={(event)=>{ setPassword(event.target.value) }} />
            </div>
          </div>
          <div className="btn-field">
            <button id="signinBtn" onClick={loginUser}>Sign In</button>
          </div>
        </form>
      </div>
    </div>
    );
}

export default Login;