import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/auth'
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBInput, MDBIcon, MDBSwitch, MDBTypography } from 'mdb-react-ui-kit'
import './forgotPassword.css'
import axios from 'axios'
import qs from 'qs' // needed for axios post to work properly
import util from 'util'
import store from '../../state/store'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const onSubmit = async (event) => {
      event.preventDefault();
      
      const headers = {
          'Content-Type': 'application/x-www-form-urlencoded'
      };
      const instance = axios.create({
          baseURL: 'http://localhost:5000',
          withCredentials: true,
          headers: headers
      });

      const formData = {
          email: email
      };
      instance.post('/auth/forgotPassword', qs.stringify(formData))
        .then((res) => {
          console.log(`res: ${util.inspect(res)}`);
        })
        .catch((error) => {
          if (error) setError({ message: error.response.data });
        });
  }

  const emailValidation = (event) => {
    setError(!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(email));
  }

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  }
  
  return (
    <form onSubmit={onSubmit}>
      <MDBContainer fluid>
        <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
          <MDBCardBody>
            <MDBRow>
              <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                <p className="text-center h1 fw-bold mb-3 mx-1 mx-md-4 mt-4">Forgot your password?</p>
                <p className="text-center mb-6 mx-1 mx-md-4 mt-4">Please enter the email address you'd like your 
                password reset information sent to.</p>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size='lg' />
                  <MDBInput label='Email' id='form2' value={email} onBlur={emailValidation} onChange={onEmailChange} type='email' />
                </div>

                {error ?
                  <MDBTypography id="danger-text" note noteColor='danger'>
                    <strong>Invalid email</strong>
                  </MDBTypography> : ""}
                <MDBBtn className='mb-4 register' size='lg' disabled={error || !email}>Request reset link</MDBBtn>

              </MDBCol>

            </MDBRow>
          </MDBCardBody>
        </MDBCard>

      </MDBContainer>
    </form>
  );
}

export default ForgotPassword;