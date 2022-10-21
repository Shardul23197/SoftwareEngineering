import React, { useState } from 'react'
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput, MDBTypography } from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/auth'
import qs from 'qs' // needed for axios post to work properly
import util from 'util'
import store from '../../state/store'

const ResetPassword = () => {
    const [confirmPassword, setConfirmPassword] = useState('')
    const [password, setPassword] = useState('');
    const { setAuthToken, setRefreshToken } = useAuth();
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onPasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const onConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value)
    }

    const onSubmit = (event) => {
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
            email: 'getfromauth',
            password: password
        };

        instance.post('/auth/resetpassword', qs.stringify(formData)).then((res) => {
            console.log(`res: ${util.inspect(res)}`);
            const accessToken = res.data.accessToken;
            const refreshToken = res.data.refreshToken;

            // set tokens in local storage to the returned jwts
            setAuthToken(accessToken); // auth context provider
            setRefreshToken(refreshToken); // auth context provider
            localStorage.setItem('authToken', accessToken); // for browser
            localStorage.setItem('refreshToken', refreshToken); // for browser

            // Redirect to the dashboard because the user is logged in
            store.dispatch({ type: 'SET_EMAIL', payload: 'getdata' }) // fix-routes carried in from merge with redux
            navigate('/dashboard');
        })
            .catch((error) => {
                if (error) setError({ message: error.response.data });
            });
    };

    return (
        <form onSubmit={onSubmit}>
            <MDBContainer fluid className="p-3 my-5 h-custom">
                <MDBRow>
                    <MDBCol col='10' md='6'>
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample" />
                    </MDBCol>

                    <MDBCol col='4' md='6' style={{'margin':'auto'}}>
                        <MDBInput wrapperClass='mb-4' label='Password' value={password} onChange={onPasswordChange} id='formControlLg' type='password' size="lg" />
                        <MDBInput wrapperClass='mb-4' label='Confirm Password' value={confirmPassword} onChange={onConfirmPasswordChange} id='formControlLg1' type='password' size="lg" />
                        <div className='text-center text-md-start mt-4 pt-2'>
                            <MDBBtn className="mb-0 px-5" size='lg'>Reset Password</MDBBtn>
                        </div>
                        {error !== '' ?
                            <MDBTypography id="danger-text" note noteColor='danger'>
                                <strong>{error.message}</strong>
                            </MDBTypography> : ""}
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </form>
    );
};

export default ResetPassword