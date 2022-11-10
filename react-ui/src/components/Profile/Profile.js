import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
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
  MDBTypography,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBTextArea,
} from 'mdb-react-ui-kit';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import VideoCard from './VideoCard';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import './Profile.css'
import { LinearProgress } from '@material-ui/core';

import downloadFromAppStoreSVG from '../../images/app-store-images/Black_lockup/SVG/Download_on_the_App_Store_Badge.svg'
import Navigation from '../Navigation/Navigation';

export default function Profile() {
  let mfaRequired = localStorage.getItem('mfaRequired');
  const navigate = useNavigate();
  const selector = useSelector(state => state.email)
  const role = useSelector(state => state.role)
  const [userEmail, setUserEmail] = useState('')
  const [userFullName, setUserFullName] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [userCity, setUserCity] = useState('')
  const [userImage, setUserImage] = useState('')
  const [mfaQrCodeUrl, setMfaQrCodeUrl] = useState('')
  const [mfaSecret, setMfaSecret] = useState('')
  const [dataFromState, setDataFromState] = useState(selector)
  const [dataFromStateRole, setDataFromStateRole] = useState(role)
  const [trainerDetails, setTrainerDetails] = useState('')
  const [status, setStatus] = useState('todo')
  const [videos, setVideos] = useState([])
  const [varyingModal, setVaryingModal] = useState(false);
  const [videoTitle, setVideoTitle] = useState('')
  const [varyingUpload, setVaryingUpload] = useState(false)
  const [hidden, setHidden] = useState(true)

  // Auth token and refresh token state
  const existingAuthtoken = localStorage.getItem('authToken') || '';
  const [authToken] = useState(existingAuthtoken);

  //todo
  //get user data
  useEffect(() => {
    setDataFromState(selector)
    setDataFromStateRole(role)
    axios.get('/api/users/profile/getdetails', { params: { email: dataFromState } })
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


    axios.get('/api/trainer/approvals', { params: { email: dataFromState } })
      .then((res) => {
        setStatus(res.data.status)
      }).catch((error) => {
        setStatus('notfound')
        console.log(error)
      })
    
      if(dataFromStateRole === 'trainer') {
      axios.get('/api/trainer/videos', { params: { email: dataFromState } })
      .then((res) => {
        setVideos(res.data.data)
      }).catch((error) => {
        setVideos('')
        console.log(error)
      })
    }

    // If the user has mfa enabled, get the google authenticator qr code url from the server
    if (mfaRequired === 'true') {
      const headers = {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      };
      const instance = axios.create({
        baseURL: 'http://localhost:5000',
        withCredentials: true,
        headers: headers
      });
      
      instance.get('/auth/mfa/google/authenticator/info', {}).then((res) => {
        setMfaQrCodeUrl(res.data.qrImage);
        setMfaSecret(res.data.mfa_secret);
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }, [authToken, dataFromState, mfaRequired, selector, setMfaQrCodeUrl, dataFromStateRole, role])



  const updateProfile = (event) => {
    event.preventDefault()
    const formData = {
      fullName: userFullName,
      phone: userPhone,
      city: userCity,
      email: userEmail
    }
    axios.post('/api/users/profile/updatedetails', formData).then((res) => {
      toast('Profile Updated!')
    }).catch((err) => {
      toast('Something went wrong!')
    })
  }

  const onVideoTitleChange = (event) => {
    setVideoTitle(event.target.value)
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
    event.preventDefault()
    var formData = new FormData();
    var imagefile = document.getElementById('customFile');
    formData.append("image", imagefile.files[0]);
    formData.append('email', userEmail)
    axios.post('/api/users/profile/upload', formData).then((res) => {
      toast('Profile Updated!')
      setUserImage(res.data.data)
      setVaryingUpload(false)
    }).catch((err) => {
      toast('Something went wrong!')
    })
  }

  const uploadVideo = (event) => {
    event.preventDefault()
    setHidden(false)
    var formData = new FormData();
    var video = document.getElementById('video');
    formData.append("video", video.files[0]);
    formData.append('email', userEmail)
    formData.append('title', videoTitle)
    axios.post('/api/trainer/upload', formData).then((res) => {
      toast('Video Uploaded!')
      setHidden(true)
      setVideoTitle('')
      videos.push(res.data)
      setVaryingModal(false)
    }).catch((err) => {
      toast('Something went wrong!')
      setHidden(true)
      setVideoTitle('')
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
    axios.post('/api/trainer/approval', formData).then((res) => {
      toast('Thank you for submitting the form!')
      setStatus(res.data.status)
    }).catch((err) => {
      toast('Something went wrong!')
    })
  }


  const renderByStatus = () => {
    if (role === 'trainer') {
      if (status === 'inprocess') {
        return (<MDBCol style={{ 'width': '100%' }} md="6">
          <br />
          <p className="lead fw-normal mb-1">Tell us about yourself</p>
          <form onSubmit={submitForApproval}>
            <MDBTextArea value={trainerDetails} onChange={tellUsMore} id='textAreaExample' rows={10} />
            <MDBBtn style={{ 'margin-top': '10px' }} >Submit</MDBBtn>
          </form>
        </MDBCol>)
      }
      else if (status === 'pending') {
        return (<h1>Your profile is under Review</h1>)
      }
    }
  }

  /* When the user clicks log out, send post to {backend base url}/auth/logout
   * and remove all items from local storage then navigate home.
   */
  const onLogout = async (event) => {
    const headers = {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    const instance = axios.create({
        baseURL: 'http://localhost:5000',
        withCredentials: true,
        headers: headers
    });
      
    // Terminate the user's session information
    await instance.post('/auth/logout', {}).then((res) => {})
      .catch((error) => console.error(error));

    // Navigate to home
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>
        <LinearProgress id='spinner' hidden={hidden} color="secondary" />
      <ToastContainer />

      {/* Sidebar Navigation */}
      <Navigation/>
      <form onSubmit={updateProfile}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="9" xl="7">

              {/* User Profile Card */}
              <MDBCard>
                <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                  <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                    <div className="image-container">
                    <MDBCardImage src={userImage}
                      alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
                      <div class="overlay">
                        <Button class="icon" onClick={() => {
                          setVaryingUpload(!varyingUpload);
                        }}>
                          <CloudUploadIcon className='fa user' />
                        </Button>
                      </div>
                      </div>
                  </div>
                  <div className="ms-3" style={{ marginTop: '130px' }}>
                    <MDBTypography tag="h5">{userFullName}</MDBTypography>
                    <MDBCardText>{userCity}</MDBCardText>
                  </div>
                </div>

                
                {/* Trainer video upload button */}
                <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                  <div className="d-flex justify-content-end text-center py-1">
                    <div>
                      {(true || status === 'approved') && role === 'trainer' ? <Button variant="contained" color="default"
                        className='material-button'
                        startIcon={<CloudUploadIcon />}
                        onClick={() => {
                          setVaryingModal(!varyingModal);
                        }}
                      >Upload</Button> : ''}
                    </div>
                  </div>
                </div>

                {/* User information card */}
                <MDBCardBody className="text-black p-4">
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1">About</p>
                    <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
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
                    </div>
                    <MDBBtn style={{ 'marginTop': '10px' }}>Update</MDBBtn>
                  </div>
                  
                  {/* Trainer approval status */}
                  {renderByStatus()}

                  {/* Trainer videos */}
                  <MDBRow md='4'>
                    {(true || (status === 'approved' && role === 'trainer')) && videos ? <VideoCard videos={videos} /> : ''}
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </form>
      {/* Video upload Modal for when trainer clicks upload video */}
      <MDBModal show={varyingModal} setShow={setVaryingModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <form onSubmit={uploadVideo}>
              <MDBModalHeader>
                <MDBModalTitle>Upload Video</MDBModalTitle>
                <MDBBtn className='btn-close' color='none' onClick={() => setVaryingModal(!varyingModal)}></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <div className='mb-3'>
                  {varyingModal && (
                    <MDBInput
                      value={videoTitle}
                      onChange={onVideoTitleChange}
                      labelClass='col-form-label'
                      label='Title of your video:'
                    />
                  )}
                </div>
                <div className='mb-3'>
                  {varyingModal && (
                    <MDBFile size='sm' id='video' />
                  )}
                </div>
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color='secondary' onClick={() => setVaryingModal(!varyingModal)}>
                  Close
                </MDBBtn>
                <MDBBtn>Upload</MDBBtn>
              </MDBModalFooter>
            </form>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      <MDBModal show={varyingUpload} setShow={setVaryingUpload} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <form onSubmit={updateImage}>
              <MDBModalHeader>
                <MDBModalTitle>Upload Profile Picture</MDBModalTitle>
                <MDBBtn className='btn-close' color='none' onClick={() => setVaryingUpload(!varyingUpload)}></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <div className='mb-3'>
                  {varyingUpload && (
                    <MDBFile size='sm' id='customFile' />
                  )}
                </div>
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color='secondary' onClick={() => setVaryingUpload(!varyingUpload)}>
                  Close
                </MDBBtn>
                <MDBBtn>Upload</MDBBtn>
              </MDBModalFooter>
            </form>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
}