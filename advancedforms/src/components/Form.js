import React, { useState, useEffect } from 'react';


function Form(props){
    const {
        values,
        changeHandler,
        onCheckboxChange,
        onSubmit,
        disabled,
        errors
    } = props

    return (
        <div>
            <form className="form">
                <h1>Sign Up</h1>
                <label >Name:
                    <input className="input" type="text" name='name' value={values.name} onChange={changeHandler} placeholder="What should we call you?"></input>
                </label>
                <p>{errors.name}</p>
                <label>Email:
                    <input className="input"type="text" name='email' value={values.email} onChange={changeHandler} placeholder="Please enter a valid email."></input>
                </label>
                <p>{errors.email}</p>
                <label>Password:
                    <input className="input" type="text" name='password' value={values.password} onChange={changeHandler} placeholder="Enter a password"></input>
                </label>
                <p>{errors.password}</p>
                <label>I agree to the terms of service and privacy policy
                    <input type="checkbox" name='term' checked={values.term} onChange={onCheckboxChange}></input>
                </label>
                <p>{errors.term}</p>
                <button onClick={onSubmit} disabled={disabled}>Submit</button>
            </form>
        </div>
    )
}
export default Form