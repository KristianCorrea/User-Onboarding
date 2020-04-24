import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import axios from 'axios';
import * as yup from 'yup';

const url = "https://reqres.in/api/users"

const cleanForm = {
  name: "",
  email: "",
  password: "",
  acceptTerms: false
}

const noFormErrors = { //Placeholder for Invalid Inputs
  name: "",
  email: "",
  password: "",
  term: ""
}

const formSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name cannot be blank')
    .min(3, 'Name must be more than 2 characters long'),
  email: yup
    .string()
    .required('Email cannot be blank')
    .email('You must enter a valid email!'),
  password: yup
    .string()
    .required('Password cannot be blank')
    .min(5, 'Password must be longer than 4 characters'),
  term: yup
    .boolean()
    .required('You must agree to the terms of service before submitting')
    .oneOf([true], "You must agree to the terms of service before submitting"),
})

function App() {

  const [users, setUsers] = useState([])
  const [formValues, setFormValues] = useState(cleanForm)
  const [formErrors, setFormErrors] = useState(noFormErrors)
  const [formDisabled, setFormDisabled] = useState(true)

  const getUser=function(){
    axios.get(url)
      .then(function(response){
        setUsers(response.data.data)
      })
      .catch(function(error){
        console.log(error)
      })
  }

  useEffect(function(){
    getUser()
  }, [])

  const postUser = function(user){
    axios.post(url, user)
      .then(function(response){
        setUsers([...users, response.data])
      })
      .catch(function(error){
        console.log(error)
      })
  }

  useEffect(function(){
    formSchema.isValid(formValues)
      .then(function(valid){
        setFormDisabled(!valid)
      })
  }, [formValues])

  const changeHandler = function(event){
    const name=event.target.name
    const value=event.target.value

    yup //Validation of Inputs
      .reach(formSchema, name)
      .validate(value)
      .then(function(valid){
        setFormErrors({
          ...formErrors,
          [name]: "",
        })
      })
      .catch(function(invalid){
        console.log(invalid)
        setFormErrors({
          ...formErrors,
          [name]: invalid.message
        })
      })
      setFormValues({
        ...formValues,
        [name]: value
      })
  }

  const onCheckboxChange = function(event){
    const name = event.target.name
    const isChecked = event.target.checked

    yup
      .reach(formSchema, name)
      .validate(isChecked)
      .then(function(valid){
        setFormErrors({
          ...formErrors,
          [name]: ""
        })
      })
      .catch(function(invalid){
        console.log(invalid)
        setFormErrors({
          ...formErrors,
          [name]: invalid.message
        })
      })
      setFormValues({
        ...formValues,
        [name]: isChecked
      })
      
  }

  const onSubmit = function(event){
    event.preventDefault()
    const newUser = {
      name: formValues.name,
      email: formValues.email,
      password: formValues.password
    }
    postUser(newUser)
    setFormValues(cleanForm)
  }



  return (
    <div className="App">
      <Form 
        values={formValues} 
        changeHandler={changeHandler} 
        onCheckboxChange={onCheckboxChange} 
        onSubmit={onSubmit}
        disabled={formDisabled}
        errors={formErrors}
      />
      {
        users.map(function(user, index){
          return(
            <pre key={index}>{JSON.stringify(user, null, 2)}</pre>
          )
        })
      }
    </div>
  );
}

export default App;
