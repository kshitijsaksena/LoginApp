
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Register.css';

function Dashboard(){

  let [ count, setCount ] = useState(60);
  let { state } = useLocation();

  useEffect(()=>{
    if(count > 0){
      setTimeout(() => {
        setCount(count-1);
      }, 1000);
    }
  }, [ count ]);
  
  
    return (
        <div className="container">
      <div className="form-box">
        <h1 id="title">Dashboard</h1>
          <div className="input-group">
            <div> Logged in user : {state.email}</div>
            <br/>
            <div>Access Token expires in:</div>
            <div>{count}</div>
          </div>
      </div>
    </div>
    );
}

export default Dashboard;