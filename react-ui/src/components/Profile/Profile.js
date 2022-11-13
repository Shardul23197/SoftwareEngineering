import { React, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { MDBAccordion, MDBAccordionItem} from "mdb-react-ui-kit";
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
import './Profile.css'
import { LinearProgress } from '@material-ui/core';
import util from 'util';
import Navigation from '../Navigation/Navigation';

export default function Profile() {
  const mfaRequired = localStorage.getItem('mfaRequired');
  const navigate = useNavigate();
  const email = localStorage.getItem('email');
  const [userEmail, setUserEmail] = useState('')
  const [userFullName, setUserFullName] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [userCity, setUserCity] = useState('')
  const [userImage, setUserImage] = useState('')
  const [role, setRole] = useState('user')
  const [trainerDetails, setTrainerDetails] = useState('')
  const [status, setStatus] = useState('todo')
  const [videos, setVideos] = useState([])
  const [varyingModal, setVaryingModal] = useState(false);
  const [category, setCategory] = useState('Yoga');
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState('');
  const [varyingUpload, setVaryingUpload] = useState(false);
  const [hidden, setHidden] = useState(true);

  // User body measurements
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [userHeightFeet, setUserHeightFeet] = useState('')
  const [userHeightInches, setUserHeightInches] = useState('')
  const [userWeight, setUserWeight] = useState('')
  const [userSleepHours, setUserSleepHours] = useState('')
  const [userSleepMinutes, setUserSleepMinutes] = useState('')
  const [error, setError] = useState(''); // String

  // User Goals
  const [weightGoal, setWeightGoal] = useState('Loose')
  const [muscleMassGoal, setMuscleMassGoal] = useState('Gain')

  // Auth token and refresh token state
  const existingAuthtoken = localStorage.getItem('authToken') || '';
  const [authToken] = useState(existingAuthtoken);

  //todo
  //get user data
  useEffect(() => {
    const headers = {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    const instance = axios.create({
        baseURL: 'http://localhost:5000',
        withCredentials: true,
        headers: headers
    });

    instance.get('/api/users/profile/getdetails', { params: { email: email } })
      .then((res) => {
          setUserEmail(res.data.userProfile.email);
          setUserCity(res.data.userProfile.city);
          setUserFullName(res.data.userProfile.fullName);
          setUserPhone(res.data.userProfile.phone);
          setAge(res.data.userProfile.age);
          setGender(res.data.userProfile.gender);
          setUserHeightFeet(res.data.userProfile.heightFeet);
          setUserHeightInches(res.data.userProfile.heightInches);
          setUserWeight(res.data.userProfile.weight);
          setUserSleepHours(res.data.userProfile.sleepHours);
          setUserSleepMinutes(res.data.userProfile.sleepMinutes);
          setWeightGoal(res.data.userProfile.weightGoal);
          setMuscleMassGoal(res.data.userProfile.muscleMassGoal);
          setRole(res.data.role)
        if (!res.data.userProfile.profileImage) {
          setUserImage("https://ui-avatars.com/api/?name=ME&size=256")
        }
        else {
          setUserImage(res.data.data.profileImage)
        }
      })
      .catch((error) => {
        if (error.response)
          console.log(error.response.data);
      });

    instance.get('/api/trainer/approvals', { params: { email: email } })
      .then((res) => {
        setStatus(res.data.status)
      }).catch((error) => {
        setStatus('notfound')
        console.log(error)
      });
    if(role === 'trainer') {
      instance.get('/api/trainer/videos', { params: { email: email } })
        .then((res) => {
          setVideos(res.data.data);
        })
        .catch((error) => {
          setVideos([]);
          console.log(error);
        });
    }

    instance.get('/api/trainer/approvals', { params: { email: email } })
      .then((res) => {
        setStatus(res.data.status)
      }).catch((error) => {
        setStatus('notfound')
        console.log(error)
      });
  }, [authToken, email, role])

  const onVideoTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const onAgeChange = (event) => {
    setAge(event.target.value)
  }

  const onGenderChange = (event) => {
    console.log(event.target.value);
    setGender(event.target.value)
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

  const onCategoryChange = (event) => {
    setCategory(event.target.value);
  }

  const onCityChange = (event) => {
    setUserCity(event.target.value)
  }

  const onMuscleMassGoalChange = (event) => {
    setMuscleMassGoal(event.target.value)
  }
  
  const onTagsChange = (event) => {
    const clickedTag = event.target.value;
    if (tags.includes(clickedTag)) 
      setTags(tags.filter((tag) => tag !== clickedTag)); // filter returns new array... ight
    else
      tags.push(clickedTag);
  }

  const onUserHeightFeetChange = (event) => {
    setUserHeightFeet(parseInt(event.target.value))
  }

  const onUserHeightInchesChange = (event) => {
    setUserHeightInches(parseInt(event.target.value))
  }
  
  const onUserWeightChange = (event) => {
    setUserWeight(parseInt(event.target.value));
  }

  const onWeightGoalChange = (event) => {
    setWeightGoal(event.target.value);
  }

  const ageValidation = (event) => {
    if (age < 18) {
      setError('You must be an adult to use Fitocity!');
      return false;
    }
    else if (age >= 125) {
      setError(`Congradulations on living past 125 years old! Please email 
                fitocity4g@gmail.com to increase the age limit of our application!`);
      return false;
    }
      
    setError('');
    return true;
  }

  const genderValidation = (event) => {
    if (!(gender === 'Male' || gender === 'Female')) {
      setError('Please select a gender!');
      return false;
    }
      
    setError('');
    return true;
  }

  const userHeightValidation = (event) => {
    const isValidHeightFeet = Number.isInteger(userHeightFeet) && 
                              userHeightFeet >= 3 && 
                              userHeightFeet < 8;
    const isValidHeightInches = Number.isInteger(userHeightInches) && 
                              userHeightInches >= 0 && 
                              userHeightInches <= 11;
    if (!isValidHeightFeet || !isValidHeightInches) {
      setError('Height must be between 3\'0" and 8\'0"!');
      return false;
    }
    
    setError('');
    return true;
  }
  
  const userWeightValidation = (event) => {
    const validWeight = Number.isInteger(userWeight) && 
                        userWeight >= 50 && 
                        userWeight <= 1000;
    if (!validWeight) {
      setError('Weight must be between 50 and 1000 lbs!');
      return false;
    }
    
    setError('');
    return true;
  }

  // Updates the wellness information of the user's profile
  const updateWellnessInfo = (event) => {
    event.preventDefault();

    // Make sure the user entered valid wellness information
    if (!ageValidation() || !userHeightValidation() || !userWeightValidation() || !genderValidation())
      return;
  
    
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
      age: age,
      gender: gender,
      heightFeet: userHeightFeet,
      heightInches: userHeightInches,
      weight: userWeight,
      sleepHours: userSleepHours,
      sleepMinutes: userSleepMinutes,
      weightGoal: weightGoal,
      muscleMassGoal: muscleMassGoal
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
    axios.post('/api/users/profile/updatedetails', qs.stringify(formData)).then((res) => {
      toast('Profile Updated!')
    }).catch((err) => {
      toast('Something went wrong!')
    })
  }

  const updateImage = (event) => {
    event.preventDefault()
    var formData = new FormData();
    var imagefile = document.getElementById('customFile');
    formData.append("image", imagefile.files[0]);
    formData.append('email', userEmail)
    axios.post('/api/users/profile/upload', qs.stringify(formData)).then((res) => {
      toast('Profile Updated!')
      setUserImage(res.data.data)
      setVaryingUpload(false)
    }).catch((err) => {
      toast('Something went wrong!')
    })
  }

  const uploadVideo = (event) => {
    event.preventDefault();
    const file = document.getElementById('video').files[0];
    console.log(file);

    if (!email || !title || !category || !(tags.length > 0) || !file) {
      toast('You must fill out all sections to upload a video!')
      return;
    }

    
    setHidden(false); // Show loading spinner
    const headers = {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    const instance = axios.create({
        baseURL: 'http://localhost:5000',
        withCredentials: true,
        headers: headers
    }); 
     
    const formData = new FormData();
    formData.append('email', email);
    formData.append('title', title);
    formData.append('category', category);
    formData.append('tags', tags);
    formData.append('file', file);
    instance.post('/api/trainer/upload', formData)
      .then((res) => {
        setHidden(true);
        setTitle('');
        videos.push(res.data);
        setVaryingModal(false);
        window.location.reload(false); // Reload the current page from cache
      }).catch((err) => {
        console.error(err);
        toast('Something went wrong!');
        setHidden(true);
        setTitle('');
      });
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
    axios.post('/api/trainer/approval', qs.stringify(formData)).then((res) => {
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

  return (
    <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>
        <LinearProgress id='spinner' hidden={hidden} color="secondary" />
      <ToastContainer />

      {/* Sidebar Navigation */}
      {/* <div class="sidebar">
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
            <Link to="/recommendation" >
              <i class='bx bx-grid-alt' ></i>
              <span class="links_name">Recommendation</span>
            </Link>
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
      </div> */}
      <Navigation/>
      {/* <form onSubmit={updateProfile}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="9" xl="7"> */}

      {/* Profile section */}
      <MDBContainer className="py-5 h-100 section">
        <MDBRow className="justify-content-center align-items-center h-100 ">
          <MDBCol lg="9" xl="7" className="subsection">

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
                        {/* <CloudUploadIcon className='fa user' /> */}
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
                    {(true || status === 'approved') && role === 'trainer'
                      ? 
                      <Button variant="contained" color="default"
                        className='material-button'
                        // startIcon={<CloudUploadIcon />}
                        onClick={() => {
                          setVaryingModal(!varyingModal);
                        }}
                      >
                      Upload
                      </Button> 
                      : 
                      ''
                      }
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
                <h1 className="fw-bold mb-1">Videos</h1>
                <MDBRow md='4' className="justify-content-center align-items-center h-100">
                  {(true || (status === 'approved' && role === 'trainer')) && videos.length > 0
                      ? 
                        <VideoCard videos={videos} />
                      :
                        ''}
                </MDBRow>

                {/* User wellness information */}
                <form onSubmit={updateWellnessInfo}>
                <div className="mb-5">
                  <h1 className="fw-bold mb-2">Wellness Information</h1>

                  {/* User body measurements */}
                  <h2 className="mb-">General Information</h2>
                  <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Age</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          <div style={{ width: '176px' }}>
                          <MDBInput label='yrs' 
                                    onChange={onAgeChange} 
                                    value={age} 
                                    onBlur={ageValidation}
                                    type='number'/>
                          </div>
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Gender</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="3">
                        <select value={gender} onChange={onGenderChange} class="form-select" aria-label="Category Select">
                          <option value={''}>Select a Gender</option>
                          <option value={'Male'}>Male</option>
                          <option value={'Female'}>Female</option>
                        </select>
                      </MDBCol>
                    </MDBRow>
                  </div>

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

                  {/* User fitness goals */}
                  <h2 className="mt-2 mb-1">Fitness Goals</h2>
                  <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Weight</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="3">
                        <select onChange={onWeightGoalChange} class="form-select" aria-label="Category Select">
                          <option value={'Loose'}>Loose</option>
                          <option value={'Maintain'}>Maintain</option>
                          <option value={'Gain'}>Gain</option>
                        </select>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Muscle Mass</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="3">
                        <select onChange={onMuscleMassGoalChange} class="form-select" aria-label="Category Select">
                          <option value={'Gain'}>Gain</option>
                          <option value={'Maintain'}>Maintain</option>
                          <option value={'Loose'}>Loose</option>
                        </select>
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


                <h2 className="mt-2 mb-1">Your Wellness Score</h2>
                  <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                    <MDBRow>
                      <MDBCol sm="6">
                        <MDBCardText>Your wellness score is:  <strong>{}</strong></MDBCardText>
                      </MDBCol>
                      
                    </MDBRow>
                    <hr/>
                    <MDBAccordion alwaysOpen initialActive={1}>
        <MDBAccordionItem collapseId={1} headerTitle="Know more about how your wellness score is calculated: ">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </MDBAccordionItem>
        </MDBAccordion>
      
                    
                  </div>

                
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
              </MDBModalHeader>
              <MDBModalBody>
                <div className='mb-3'>
                  <h4>Title</h4>
                  <MDBInput
                    value={title}
                    onChange={onVideoTitleChange}
                    labelClass='col-form-label'
                    label='Title'
                  />
                </div>
                <div className='mb-3'>
                  <h4>Category</h4>
                  <select onChange={onCategoryChange} class="form-select" aria-label="Category Select">
                    <option value={'Yoga'}>Yoga</option>
                    <option value={'Upper Body'}>Upper Body</option>
                    <option value={'Lower Body'}>Lower Body</option>
                    <option value={'Cardio'}>Cardio</option>
                    <option value={'Cardio'}>Biking</option>
                    <option value={'Other'}>Other</option>
                  </select>
                </div>
                <div className='mb-3'>
                  <h4>Tags</h4>
                  <div class="form-check">
                    <input onChange={onTagsChange} class="form-check-input" type="checkbox" id="inlineCheckbox1" value="beginner" />
                    <label class="form-check-label" for="flexCheckChecked">beginner</label>
                  </div>
                  <div class="form-check">
                    <input onChange={onTagsChange} class="form-check-input" type="checkbox" id="inlineCheckbox2" value="intermediate" />
                    <label class="form-check-label" for="flexCheckChecked">intermediate</label>
                  </div>
                  <div class="form-check">
                    <input onChange={onTagsChange} class="form-check-input" type="checkbox" id="inlineCheckbox3" value="expert" />
                    <label class="form-check-label" for="flexCheckChecked">expert</label>
                  </div>
                  <div class="form-check">
                    <input onChange={onTagsChange} class="form-check-input" type="checkbox" id="inlineCheckbox4" value="low intensity" />
                    <label class="form-check-label" for="flexCheckChecked">low intensity</label>
                  </div>
                  <div class="form-check">
                    <input onChange={onTagsChange} class="form-check-input" type="checkbox" id="inlineCheckbox5" value="medium intensity" />
                    <label class="form-check-label" for="flexCheckChecked">medium intensity</label>
                  </div>
                  <div class="form-check">
                    <input onChange={onTagsChange} class="form-check-input" type="checkbox" id="inlineCheckbox6" value="high intensity" />
                    <label class="form-check-label" for="flexCheckChecked">high intensity</label>
                  </div>
                  <div class="form-check">
                    <input onChange={onTagsChange} class="form-check-input" type="checkbox" id="inlineCheckbox7" value="equipment required" />
                    <label class="form-check-label" for="flexCheckChecked">equipment required</label>
                  </div>
                  <div class="form-check">
                    <input onChange={onTagsChange} class="form-check-input" type="checkbox" id="inlineCheckbox8" value="equipment not-required" />
                    <label class="form-check-label" for="flexCheckChecked">equipment not-required</label>
                  </div>
                </div>
                <div className='mb-3'>
                  <h4>Upload</h4>
                  <MDBFile size='sm' id='video'/>
                </div>
              </MDBModalBody>
              <MDBModalFooter>
                {/* type='button' prevents form submission */}
                <MDBBtn type='button' color='secondary' onClick={() => setVaryingModal(!varyingModal)}>
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
              </MDBModalHeader>
              <MDBModalBody>
                <div className='mb-3'>
                  {varyingUpload && (
                    <MDBFile size='sm' id='customFile' />
                  )}
                </div>
              </MDBModalBody>
              <MDBModalFooter>
                {/* type='button' prevents form submission */}
                <MDBBtn type='button' color='secondary' onClick={() => setVaryingUpload(!varyingUpload)}>
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