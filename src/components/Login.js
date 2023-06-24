import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [credentials, setCredentials] = useState({email: "", password: ""});
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        // console.log(credentials)

    // API call
        const response = await fetch(`http://localhost:8000/api/auth/login`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json();
        console.log(json)
      
        if(json.success){
            // console.log("redirecting.....")

            // Save the auth token and redirect
            localStorage.setItem('auth-token', json.authtoken);
            navigate('/');
        }else{
            alert("Please enter correct credentials!!")
        }
        // console.log("Submitting the form....")
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className='container d-flex flex-column align-items-center'>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 my-10">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" onChange={onChange} value={credentials.email} className="form-control" id="email" name="email" aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" value={credentials.password} onChange={onChange} className="form-control" name="password" id="password"/>
                </div>
                <button disabled={credentials.email.length===0 || credentials.password.length < 0} type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login