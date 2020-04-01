import React, {useState} from 'react';
import Layout from '../core/Layout';
import {API} from '../config';
import {Link} from 'react-router-dom';
import {signup} from '../auth/index';


const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    }) 

    const {name, email, password, success, error } = values

    const handleChange = name => event =>{
        setValues({...values, error: false, [name]: event.target.value})
    }

    // const signup = (user) => {
    //     return fetch(`http://localhost:8000/api/signup`, {
    //         method: "POST",
    //         headers: {
    //             Accept: 'application/json',
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(user)
    //     })
    //     .then(response => {
    //         return response.json()
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    // }

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: false});
        signup({name, email, password})
        .then(data => {
            if(data.error) {
                setValues({
                    ...values,
                    error: data.error,
                    success: false})
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                })
            }
        })
    }

    const signUpForm = () => (
        <form>
            <div className = "form-group">
                <label className = "text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name}/>
            </div>

            <div className = "form-group">
                <label className = "text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email}/>
            </div>

            <div className = "form-group">
                <label className = "text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password}/>
            </div>

            <button onClick={clickSubmit} className="btn btn-primary"> Submit </button>
        </form>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className="alert alert-info" style={{display: success ? '' : 'none'}}>
            New Account Created. You can <Link to="/signin">LogIn</Link>
        </div>
    )

    return (
        <Layout 
            title="Sigup Page"
            description="WElCOME"
            className="container col-md-8 offset-md-2">
            
            {showSuccess()}
            {showError()}
            {signUpForm()}

        </Layout>
    )
}

export default Signup;


