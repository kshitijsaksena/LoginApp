import './Register.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function registerUser(event){
    event.preventDefault();
    const response = await fetch('http://localhost:4000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    });

    if(response.status === 201){
      setTimeout(() => {
        navigate('/login');
      }, 500);
    } else if(response.status === 409){
      alert('Email already exists');
    }
  }

  return (
    <div className="container">
      <div className="form-box">
        <h1 id="title">Sign Up</h1>
        <form>
          <div className="input-group">
            <div className="input-field" id="nameField">
              <i className="fa-solid fa-user"></i>
              <input type="text" placeholder="Name" onChange={(event)=>{setName(event.target.value)}}/>
            </div>
            <div className="input-field">
              <i className="fa-solid fa-envelope"></i>
              <input type="email" placeholder="Email" onChange={(event)=>{setEmail(event.target.value)}}/>
            </div>
            <div className="input-field">
              <i className="fa-solid fa-lock"></i>
              <input type="password" placeholder="Password" onChange={(event)=>{setPassword(event.target.value)}}/>
            </div>
          </div>
          <div className="btn-field">
            <button id="signupBtn" onClick={registerUser}>Sign Up</button>
          </div>
          <div className="login-field">
            <a href="/login">Click here to Login</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
