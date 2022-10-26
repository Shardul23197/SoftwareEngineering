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

export default function Profile() {
  const selector = useSelector(state => state.email)
  const [userEmail, setUserEmail] = useState('')
  const [userFullName, setUserFullName] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [userCity, setUserCity] = useState('')
  const [userImage, setUserImage] = useState('')
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
  }, [dataFromState, selector ])

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
    
    instance.get('/auth/tfa/enroll', {}).then((res) => {
      console.log(res.data);
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
      </MDBContainer><MDBContainer className="py-5">
        <MDBCol lg="8">
          <MDBCard className="mb-4">
            <MDBCardBody>
              <MDBRow>
                <MDBBtn style={{ 'margin-top': '10px' }} onClick={enroll}>Enable 2FA</MDBBtn>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBContainer>
    </section>
  );
}