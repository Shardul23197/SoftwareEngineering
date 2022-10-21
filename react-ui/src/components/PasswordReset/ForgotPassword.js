import React, { useState } from 'react'
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
    const [username, setUserName] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const onUsernameChange = (event) => {
        setUserName(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault()
        toast("If you are in our records, a mail with instructions to reset your password has been sent to your email!");
        setSubmitted(true)
    }
    return (
        <form onSubmit={onSubmit}>
            <MDBContainer fluid className="p-3 my-5 h-custom">
                <MDBRow>
                    <MDBCol col='10' md='6'>
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample" />
                    </MDBCol>

                    <MDBCol col='4' md='6' style={{ 'margin': 'auto' }}>
                        <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' value={username} onChange={onUsernameChange} type='email' size="lg" />
                        <div className='text-center text-md-start mt-4 pt-2'>
                            <MDBBtn className="mb-0 px-5" size='lg'>Reset Password</MDBBtn>
                        </div>
                        {submitted ? <ToastContainer/> : ''}
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </form>
    );
};

export default ForgotPassword