import { React, useState } from 'react'
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox, MDBTypography } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom'
import './twoFactor.css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/auth'
import axios from 'axios'
import qs from 'qs' // needed for axios post to work properly
import util from 'util'
import store from '../../state/store'

export default function TwoFactor() {
    const [code, setCode] = useState(''); // String
    const [error, setError] = useState(''); // String
    const { setAuthToken, setRefreshToken } = useAuth();
    const navigate = useNavigate();

    const onCode = (event) => {
      setCode(event.target.value);
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
            code: code
        };
        
        instance.post('/auth/login/2fa', qs.stringify(formData)).then((res) => {
            console.log(`res: ${util.inspect(res)}`);
            // const accessToken = res.data.accessToken;
            // const refreshToken = res.data.refreshToken;

            // // set tokens in local storage to the returned jwts
            // setAuthToken(accessToken); // auth context provider
            // setRefreshToken(refreshToken); // auth context provider
            // localStorage.setItem('authToken', accessToken); // for browser
            // localStorage.setItem('refreshToken', refreshToken); // for browser

            // // Redirect to the dashboard because the user is logged in
            // store.dispatch({type: 'SET_EMAIL', payload: email})
            // navigate('/dashboard');
        })
        .catch((error) => {
            if (error) setError(error.response.data);
        });
    };

    return (
        <form onSubmit={onSubmit}>
            <MDBContainer fluid className="p-3 my-5 h-custom">
                <MDBRow>
                    <MDBCol col='10' md='6'>
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample" />
                    </MDBCol>

                    <MDBCol col='4' md='6'>


                        <div className="divider d-flex align-items-center my-4 or">
                            <p className="text-center fw-bold mx-3 mb-0">Or</p>
                        </div>

                        <MDBInput wrapperClass='mb-4' label='Code' value={code} onChange={onCode} id='formControlLg' type='text' size="lg" />

                        {error ?
                            <MDBTypography id="danger-text" note noteColor='danger'>
                                <strong>{error}</strong>
                            </MDBTypography> : ""}
                        <div className='text-center text-md-start mt-4 pt-2'>
                            <MDBBtn className="mb-0 px-5" size='lg'>Login</MDBBtn>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </form>
    );
};