import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBInput,
  MDBFile,
  MDBTextArea
} from 'mdb-react-ui-kit';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import downloadFromAppStoreSVG from '../../images/app-store-images/Black_lockup/SVG/Download_on_the_App_Store_Badge.svg'

export default function Profile() {
  const selector = useSelector(state => state.email)
  const [userEmail, setUserEmail] = useState('')
  const [userFullName, setUserFullName] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [userCity, setUserCity] = useState('')
  const [userImage, setUserImage] = useState('')
  const [mfaQrCodeUrl, setMfaQrCodeUrl] = useState('')
  const [dataFromState, setDataFromState] = useState(selector)
  const [trainerDetails, setTrainerDetails] = useState('')
  const [status, setStatus] = useState('todo')

  // Auth token and refresh token state
  const existingAuthtoken = localStorage.getItem('authToken') || '';
  const [authToken, setAuthtoken] = useState(existingAuthtoken);

  //todo
  //get user data
  useEffect(() => {
    setDataFromState(selector)
    axios.get('https://localhost:5000/api/users/profile/getdetails', { params: { email: dataFromState } })
      .then((res) => {
        setUserEmail(res.data.data.email)
        setUserCity(res.data.data.city)
        setUserFullName(res.data.data.fullName)
        setUserPhone(res.data.data.phone)
        if (!res.data.data.profileImage) {
          setUserImage("https://ui-avatars.com/api/?name=ME&size=256")
        }
        else {
          setUserImage(res.data.data.profileImage)
        }
      })
      .catch((error) => {
        if (error.response)
          console.log(error.response.data);
      })

    axios.get('http://localhost:5000/api/trainer/approvals', { params: { email: dataFromState } })
      .then((res) => {
        setStatus(res.data.status)
      }).catch((error) => {
        setStatus('notfound')
        console.log(error)
      })

      

      const headers = {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      };
      const instance = axios.create({
          baseURL: 'http://localhost:5000',
          withCredentials: true,
          headers: headers
      });
      
      instance.get('/auth/tfa/info', {}).then((res) => {
        setMfaQrCodeUrl(res.data.qrImage)
      })
      .catch((error) => {
        console.error(error);
      });
  }, [authToken, dataFromState, selector])

  const updateProfile = (event) => {
    event.preventDefault()
    const formData = {
      fullName: userFullName,
      phone: userPhone,
      city: userCity,
      email: userEmail
    }
    axios.post('http://localhost:5000/api/users/profile/updatedetails', formData).then((res) => {
      toast('Profile Updated!')
    }).catch((err) => {
      toast('Something went wrong!')
    })
  }

  const onNameChange = (event) => {
    setUserFullName(event.target.value)
  }

  const onEmailChange = (event) => {
    setUserEmail(event.target.value)
  }

  const onPhoneChange = (event) => {
    setUserPhone(event.target.value)
  }

  const onCityChange = (event) => {
    setUserCity(event.target.value)
  }

  const updateImage = (event) => {
    var formData = new FormData();
    var imagefile = document.getElementById('customFile');
    formData.append("image", imagefile.files[0]);
    formData.append('email', userEmail)
    axios.post('http://localhost:5000/api/users/profile/upload', formData).then((res) => {
      toast('Profile Updated!')
      setUserImage(res.data.data)
    }).catch((err) => {
      toast('Something went wrong!')
    })
  }

  const tellUsMore = (event) => {
    setTrainerDetails(event.target.value)
  }

  const submitForApproval = (event) => {
    event.preventDefault()
    const formData = {
      email: userEmail,
      description: trainerDetails
    }
    axios.post('http://localhost:5000/api/trainer/approval', formData).then((res) => {
      toast('Thank you for submitting the form!')
      setStatus(res.data.status)
    }).catch((err) => {
      toast('Something went wrong!')
    })
  }

  const enroll = (event) => {
    event.preventDefault()

    const headers = {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    const instance = axios.create({
        baseURL: 'http://localhost:5000',
        withCredentials: true,
        headers: headers
    });
    
    instance.get('/auth/tfa/info', {}).then((res) => {
      setMfaQrCodeUrl(res.data.qrImage)
    })
    .catch((error) => {
      console.error(error);
    });
  }

  return (
    <section style={{ backgroundColor: '#eee' }}>

      <ToastContainer />
      <form onSubmit={updateProfile}>
        <MDBContainer className="py-5">
          <MDBRow>
            <MDBCol lg="4">
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                  <MDBCardImage
                    src={userImage}
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: '150px' }}
                    fluid />
                  <p className="text-muted mb-1">{userFullName}</p>
                  <MDBFile size='sm' id='customFile' onChange={updateImage} />
                  <br />
                  <div className="d-flex justify-content-center mb-2">
                    <MDBBtn>Follow</MDBBtn>
                    <MDBBtn outline className="ms-1">Message</MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="8">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Full Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        <MDBInput label='Name' onChange={onNameChange} value={userFullName}
                          type='text' />
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        <MDBInput label='Email' onChange={onEmailChange} value={userEmail}
                          type='text' />
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Phone</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        <MDBInput label='Phone' onChange={onPhoneChange} value={userPhone}
                          type='text' />
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>City</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        <MDBInput label='City' onChange={onCityChange} value={userCity}
                          type='text' />
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
              <MDBBtn>Update</MDBBtn>
              <br />
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </form>

      <MDBContainer className="py-5">
        <MDBCol lg="8">
          <MDBCard className="mb-4">
            <MDBCardBody>
              <MDBRow>
                {status !== 'inprocess'?
                  <MDBCol style={{ 'width': '100%' }} md="6">
                    <br />
                    <h1 style={{ 'margin': '20px' }} >Tell us more about yourself</h1>
                    <form onSubmit={submitForApproval}>
                      <MDBTextArea value={trainerDetails} onChange={tellUsMore} id='textAreaExample' rows={10} />
                      <MDBBtn style={{ 'margin-top': '10px' }} >Submit</MDBBtn>
                    </form>
                  </MDBCol>
                  : <h1>Your profile is under Review</h1>}
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBContainer>
      <MDBContainer className="py-5">
        <MDBCol lg="8">
          <MDBCard className="mb-4">
            <MDBCardBody>

              <h1>MFA</h1>

              {/* Display mfa qrcode and code if the user is enrolled in mfa */}
              {mfaQrCodeUrl ? 
                <MDBRow>
                <MDBRow sm="8">
                  <MDBCardText>
                    Please download the Google Authenticator app and use the qr code below to set up
                    mfa! You will be required to enter a 6-digit code each time you log in
                  </MDBCardText>
                </MDBRow>
                <MDBRow>
                  <MDBCol sm="5">
                    <MDBRow>
                    <a href='https://apps.apple.com/us/app/google-authenticator/id388497605'>
                    <MDBCardImage src={downloadFromAppStoreSVG}
                                  alt='Download Google Authenticator from the App Store!' 
                                  style={{ width: '200px' }} 
                                  fluid
                                  />
                    </a>
                    </MDBRow>
                    <MDBRow>
                    <a href='https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en_US&gl=US&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
                    <MDBCardImage src={'https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'}
                                  alt='Get it on Google Play' 
                                  style={{ width: '200px' }} 
                                  fluid
                                  />
                    </a>
                    </MDBRow>
                  </MDBCol>
                  <MDBCol sm="5">
                    <MDBCardImage src={mfaQrCodeUrl} 
                                  alt="MFA QR Code Url" 
                                  style={{ 
                                    width: '200px',
                                    marginLeft:'auto',
                                    marginRight:'auto' 
                                  }} 
                                  fluid />
                  </MDBCol>
                </MDBRow>
                </MDBRow>
              :
                <MDBRow>
                  <MDBBtn style={{ 'margin-top': '10px' }} onClick={enroll}>Enable 2FA</MDBBtn>
                </MDBRow>
              }
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBContainer>
    </section>
  );
}