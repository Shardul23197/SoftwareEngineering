import React from 'react';
import {useNavigate, Route} from 'react-router-dom'
import { useState, useEffect } from 'react';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBInput, MDBIcon, MDBTypography } from 'mdb-react-ui-kit';
import Dashboard from './Dashboard';

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username, setUserName] = useState('')
  const navigate = useNavigate();

  const onSubmit = (event) => {
    let formData = {
      username: username,
      email: email,
      password: password,
    }
    console.log(formData)
    event.preventDefault();

    return <Route path="/here" component={Dashboard} />
  }

  const onUsernameChange = (event) => {
    setUserName(event.target.value)
  }

  const onPasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const onConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value)
  }

  const onEmailChange = (event) => {
    setEmail(event.target.value)
  }

  // useEffect(() => {
  //   let warning = document.getElementById("danger-text");
  //   if (confirmPassword !== password) {
  //     warning.display = "block"
  //   }
  //   else{
  //     warning.display = "none"
  //   }
  // }, [confirmPassword, password])


  return (
    <form onSubmit={onSubmit}>
      <MDBContainer fluid>
        <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
          <MDBCardBody>
            <MDBRow>
              <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Register</p>

                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size='lg' />
                  <MDBInput label='Username' id='form1' type='text' value={username} onChange={onUsernameChange} className='w-100' />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size='lg' />
                  <MDBInput label='Email' id='form2' value={email} onChange={onEmailChange} type='email' />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size='lg' />
                  <MDBInput label='Password' id='form3' value={password} onChange={onPasswordChange} type='password' />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="key me-3" size='lg' />
                  <MDBInput label='Confirm Password' value={confirmPassword} onChange={onConfirmPasswordChange} id='form4' type='password' />
                </div>
                {confirmPassword !== password ?
                  <MDBTypography id="danger-text" note noteColor='danger'>
                    <strong>Passwords do not match</strong>
                  </MDBTypography> : "" }

                <MDBBtn className='mb-4' size='lg' disabled ={confirmPassword !== password ? true: false} >Register</MDBBtn>

              </MDBCol>

              <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
              </MDBCol>

            </MDBRow>
          </MDBCardBody>
        </MDBCard>

      </MDBContainer>
    </form>
  );
}

export default Register;