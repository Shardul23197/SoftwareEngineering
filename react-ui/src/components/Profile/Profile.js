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
import qs from 'qs';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import VideoCard from './VideoCard';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import './Profile.css'
import { LinearProgress } from '@material-ui/core';

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
  const [dataFromState, setDataFromState] = useState(selector)
  const [dataFromStateRole, setDataFromStateRole] = useState(role)
  const [trainerDetails, setTrainerDetails] = useState('')
  const [status, setStatus] = useState('todo')
  const [videos, setVideos] = useState([])
  const [varyingModal, setVaryingModal] = useState(false);
  const [videoTitle, setVideoTitle] = useState('')
  const [varyingUpload, setVaryingUpload] = useState(false)
  const [hidden, setHidden] = useState(true)

  // User body measurements
  const [userHeightFeet, setUserHeightFeet] = useState('')
  const [userHeightInches, setUserHeightInches] = useState('')
  const [userWeight, setUserWeight] = useState('')
  const [userSleepHours, setUserSleepHours] = useState('')
  const [userSleepMinutes, setUserSleepMinutes] = useState('')
  const [error, setError] = useState(''); // String

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
          setUserHeightFeet(res.data.data.heightFeet);
          setUserHeightInches(res.data.data.heightInches);
          setUserWeight(res.data.data.weight);
          setUserSleepHours(res.data.data.sleepHours);
          setUserSleepMinutes(res.data.data.sleepMinutes);
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
  }, [authToken, dataFromState, mfaRequired, selector, dataFromStateRole, role])


  // Updates the wellness information of the user's profile
  const updateFitnessInfo = (event) => {
    event.preventDefault();

    // Make sure the user entered values
    userHeightValidation();
    userWeightValidation();
    userSleepValidation();
    if (error) {
      setError('Invalid wellness information!')
      return;
    }
    
    const headers = {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    const instance = axios.create({
        baseURL: 'http://localhost:5000',
        withCredentials: true,
        headers: headers
    });
    const formData = {
      heightFeet: userHeightFeet,
      heightInches: userHeightInches,
      weight: userWeight,
      sleepHours: userSleepHours,
      sleepMinutes: userSleepMinutes
    }
    instance.post('/api/users/profile/updatewellnessinfo', qs.stringify(formData)).then((res) => {
      toast('Wellness Information Updated!')
    }).catch((err) => {
      toast('Something went wrong!')
    })
  }

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

  const onUserHeightFeetChange = (event) => {
    setUserHeightFeet(parseInt(event.target.value))
  }

  const onUserHeightInchesChange = (event) => {
    setUserHeightInches(parseInt(event.target.value))
  }
  
  const onUserWeightChange = (event) => {
    setUserWeight(parseInt(event.target.value))
  }
  
  const onUserSleepHoursChange = (event) => {
    setUserSleepHours(parseInt(event.target.value))
  }
  
  const onUserSleepMinutesChange = (event) => {
    setUserSleepMinutes(parseInt(event.target.value))
  }

  const userHeightValidation = (event) => {
    const validHeightFeet = Number.isInteger(userHeightFeet) && 
                              userHeightFeet >= 3 && 
                              userHeightFeet < 8;
    const validHeightInches = Number.isInteger(userHeightInches) && 
                              userHeightInches >= 0 && 
                              userHeightInches <= 11;
    if (!validHeightFeet || !validHeightInches) setError('Height must be between 3\'0" and 8\'0"!');
    else setError('');
  }
  
  const userWeightValidation = (event) => {
    const validWeight = Number.isInteger(userWeight) && 
                        userWeight >= 50 && 
                        userWeight <= 1000;
    if (!validWeight) setError('Weight must be between 50 and 1000 lbs!');
    else setError('');
  }

  const userSleepValidation = (event) => {
    const validSleepHours = Number.isInteger(userSleepHours) && 
                            userSleepHours >= 0 && 
                            userSleepHours < 24;
    const validSleepMinutes = Number.isInteger(userSleepMinutes) && 
                              userSleepMinutes >= 0 && 
                              userSleepMinutes < 60;
    if (!validSleepHours || !validSleepMinutes) setError('Sleep must be between 0 and 24 hours!');
    else setError('');
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
      <div class="sidebar">
        <div class="logo-details">
          <i class='bx bxl-c-plus-plus'></i>
          <span class="logo_name">Fitocity</span>
        </div>
        <ul class="nav-links">
          <li>
            <Link to='/dashboard'>
              <i class='bx bx-grid-alt' ></i>
              <span class="links_name">Dashboard</span>
            </Link>
          </li>
          <li>
            <a href="#" >
              <i class='bx bx-grid-alt' ></i>
              <span class="links_name">Explore</span>
            </a>
          </li>
          {role === 'trainer' ? 
          <li>
            <a href="#">
              <i class='bx bx-box' ></i>
              <span class="links_name">Workout</span>
            </a>
          </li> : ""
          }
          <li>
            <Link to='/mealLog'>
              <i class='bx bx-grid-alt' ></i>
              <span class="links_name">Meal Log</span>
            </Link>
          </li>
          <li>
            <Link to='/sleepLog'>
              <i class='bx bx-grid-alt' ></i>
              <span class="links_name">Sleep Log</span>
            </Link>
          </li>
          <li>
            <Link to='/workoutLog'>
              <i class='bx bx-grid-alt' ></i>
              <span class="links_name">Workout Log</span>
            </Link>
          </li>
          <li>
            <a href="#">
              <i class='bx bx-message' ></i>
              <span class="links_name">Messages</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i class='bx bx-heart' ></i>
              <span class="links_name">Favrorites</span>
            </a>
          </li>
          <li>
            <Link to = '/profile' class="active">
              <i class='bx bx-coin-stack' ></i>
              <span class="links_name">Profile</span>
            </Link>
          </li>
          <li>
            <Link to = '/settings'>
              <i class='bx bx-cog' ></i>
              <span class="links_name">Settings</span>
            </Link>
          </li>
          <li>
          <button className='logoutbutton' onClick={onLogout} >
              <i class='bx bx-coin-stack' ></i>
              <span class="links_name">Logout</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Profile section */}
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

                  {/* About */}
                  <form onSubmit={updateProfile}>
                  <div className="mb-5">
                    <h1 className="fw-bold mb-1">About</h1>
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
                  </form>
                  
                  {/* Trainer approval status */}
                  {renderByStatus()}

                  {/* Trainer videos */}
                  <MDBRow md='4'>
                    <h1 className="fw-bold mb-1">Videos</h1>
                    {(true || (status === 'approved' && role === 'trainer')) && videos ? <VideoCard videos={videos} /> : ''}
                  </MDBRow>

                  {/* User wellness information */}
                  <form onSubmit={updateFitnessInfo}>
                  <div className="mb-5">
                    <h1 className="fw-bold mb-2">Wellness Information</h1>

                    {/* User body measurements */}
                    <h2 className="mb-">Body Measurements</h2>
                    <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Height</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">
                          <MDBRow className="align-items-center" style={{flex: 'left'}}>
                            <div style={{ width: '200px' }}>
                            <MDBInput label='Feet' 
                                      onChange={onUserHeightFeetChange} 
                                      value={userHeightFeet} 
                                      onBlur={userHeightValidation}
                                      type='number'/>
                            </div>
                            <div style={{ width: '200px' }}>
                            <MDBInput label='Inches' 
                                      onChange={onUserHeightInchesChange} 
                                      value={userHeightInches} 
                                      onBlur={userHeightValidation}
                                      type='number' />
                            </div>
                          </MDBRow>
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Weight</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">
                            <div style={{ width: '176px' }}>
                            <MDBInput label='lbs' 
                                      onChange={onUserWeightChange} 
                                      value={userWeight} 
                                      onBlur={userWeightValidation}
                                      type='number'/>
                            </div>
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                    </div>

                    {/* User sleep tracking */}
                    <h2 className="mt-2 mb-1">Sleep</h2>
                    <p>How much sleep do you get per night?</p>
                    <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Average</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">
                          <MDBRow className="align-items-center" style={{flex: 'left'}}>
                            <div style={{ width: '200px' }}>
                            <MDBInput label='Hours' 
                                      onChange={onUserSleepHoursChange} 
                                      value={userSleepHours} 
                                      onBlur={userSleepValidation}
                                      type='number'/>
                            </div>
                            <div style={{ width: '200px' }}>
                            <MDBInput label='Minutes' 
                                      onChange={onUserSleepMinutesChange} 
                                      value={userSleepMinutes} 
                                      onBlur={userSleepValidation}
                                      type='number' />
                            </div>
                          </MDBRow>
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                    </div>

                    {/* Error message for wellness info submission */}
                    {error ?
                            <MDBTypography id="danger-text" note noteColor='danger' style={{ 'marginTop': '10px' }}>
                                <strong>{error}</strong>
                            </MDBTypography> : ""}

                    {/* User wellness info update button */}
                    <MDBBtn style={{ 'marginTop': '10px' }}>Update</MDBBtn>
                  </div>
                  </form>
                  
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>

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

      {/* Profile photo upload Modal */}
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