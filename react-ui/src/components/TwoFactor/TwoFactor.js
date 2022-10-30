import { React, useState } from 'react'
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput, MDBTypography } from 'mdb-react-ui-kit';
import './twoFactor.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import qs from 'qs'
import util from 'util'

export default function TwoFactor() {
    const [code, setCode] = useState(''); // String
    const [error, setError] = useState(''); // String
    const navigate = useNavigate();
    

    // Auth token and refresh token state
    const existingAuthtoken = localStorage.getItem('authToken') || '';
    const [authToken] = useState(existingAuthtoken);

    const onCode = (event) => {
      setCode(event.target.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        
        const headers = {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        const instance = axios.create({
            baseURL: 'http://localhost:5000',
            withCredentials: true,
            headers: headers
        });
        const formData = { code: code };
        
        instance.post('/auth/login/mfa', qs.stringify(formData)).then((res) => {            
            // Set the status of the verification
            console.log(`mfaVerified: ${res.data.mfaVerified}`);
            localStorage.setItem('mfaVerified', res.data.mfaVerified+'');
            navigate('/dashboard');
        })
        .catch((err) => {
            if (err) setError(err.response.data);
        });
    };

    return (
        <form onSubmit={onSubmit}>
            <MDBContainer fluid className="p-3 my-5 h-custom">
                <MDBRow>
                    <MDBCol col='4' md='6' style={{ width: '400px', marginLeft:'auto', marginRight:'auto' }} >

                        <div>
                        <h1 className='text-center text-md-start mt-4 pt-2' >MFA</h1>

                        <p>Please enter the code displayed in your Google Authenticator app!</p>
                        </div>
                        <MDBInput wrapperClass='mb-4' label='Code' value={code} onChange={onCode} id='formControlLg' type='text' size="lg" />

                        {error ?
                            <MDBTypography id="danger-text" note noteColor='danger'>
                                <strong>{error}</strong>
                            </MDBTypography> : ""}
                        <div className='text-center text-md-start mt-4 pt-2'>
                            <MDBBtn className="mb-0 px-5" size='lg'>Submit</MDBBtn>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </form>
    );
};