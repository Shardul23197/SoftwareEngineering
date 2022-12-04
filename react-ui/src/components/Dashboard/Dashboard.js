import React, { useState, useEffect } from 'react'
import {Link, useNavigate, useSearchParams } from "react-router-dom";
import '../../App.css'; 
import Alert from 'react-bootstrap/Alert';
import Pagination from '../Pagination';
import { Paper, AppBar, TextField, Button } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import useStyles from './styles'
import axios from 'axios'
import { useAuth } from '../auth/auth'
import {useSelector } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import {getWorkoutsBySearch} from '../../actions/workouts'
import { useDispatch } from 'react-redux';
import store from '../../state/store'
import './Dashboard.css'
import Navigation from '../Navigation/Navigation';
// import { Datepicker, Eventcalendar } from "@mobiscroll/react-lite";
// import "@mobiscroll/react-lite/dist/css/mobiscroll.min.css";
import {Inject,ScheduleComponent, Day, Week, WorkWeek, Month, Agenda} from '@syncfusion/ej2-react-schedule';





export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const page=searchParams.get('page')||1;
  const searchQuery=searchParams.get('searchQuery');
  const classes = useStyles();
  const [search,setSearch]=useState('');
  const [tags,setTags]=useState([]);
  const navigate = useNavigate();
  const selector = useSelector(state => state)
  const [data, setData] = useState(selector.email)
  const [roleFromState, setRoleFromState] = useState(selector.role)
  const [role, setRole] = useState('')
  const authToken = localStorage.getItem('authToken');

  const searchWorkout=()=>{
    if(search.trim()){
      //dispatch->fetch workout
      dispatch(getWorkoutsBySearch({ search, tags: tags.join(',') }));
    }
    else{
      navigate('/');
    }
  }

  const handleKeyPress=(e)=>{
    if(e.keyCode===13){
      //search workout
      searchWorkout();
    }
  };

  const handleAdd=(tag)=>setTags([... tags, tag]);

  const handleDelete=(tagtoDelete)=>setTags(tags.filter((tag)=>tag!=tagtoDelete));

  const getRole = () => {
    setData(selector.email)
    axios.get('http://localhost:5000/api/users/getrole', { params: { email: data } })
    .then((res) => {
      store.dispatch({type: 'SET_ROLE', payload: res.data.role}) 
      setRole(res.data.role)      
    })
    .catch((error) => {
      if (error.response)
        console.log(error.response.data);
    })
  }
  useEffect(() => {
    getRole()
  }, []);


  return (
    <>

<Navigation/>


<section class="home-section">
  <nav>
    <div class="sidebar-button">
      <i class='bx bx-menu sidebarBtn'></i>
      <span class="dashboard">Dashboard</span>
    </div>
  </nav>

  <div class="home-content">
    <div class="overview-boxes">
    {/* <div className="card-dashboard 3">
          <div className="card_image-dashboard">
            <img src="https://img.freepik.com/free-photo/woman-doing-yoga-cleaning-chakra_23-2149276019.jpg?w=2000" />
          </div>
          <div className="card_title-dashboard">
    
          </div>
        </div> */}
{/*   

        <div className="card-dashboard 3">
          <div className="card_image-dashboard">
            <img src="https://media.istockphoto.com/photos/dance-fitness-picture-id1067009516?k=20&m=1067009516&s=612x612&w=0&h=yQnFT71CeAq8R3QG4hlv4IyLLKnfwl28lMXy9xSn8sk=" />
          </div>
          <div className="card_title-dashboard">

          </div>
        </div> */}
        {/* <div className="card-dashboard 3">
          <div className="card_image-dashboard">
            <img src="https://media.istockphoto.com/photos/attractive-sporty-girls-in-bodysuits-training-at-aerobics-workout-on-picture-id1064119338?k=20&m=1064119338&s=612x612&w=0&h=osPNv5SEc-mZvOisVdhvWGk2dqK-l5lYGIxi_WlAfZ4=" />
          </div>
          <div className="card_title-dashboard">
  
          </div>
        </div>
        <div className="card-dashboard  3">
          <div className="card_image-dashboard ">
            <img src="https://media.istockphoto.com/photos/workout-concept-sporty-african-american-woman-doing-abs-exercise-with-picture-id1322878383?k=20&m=1322878383&s=612x612&w=0&h=efco7G7L5NxOm956w6YApf_mYmXBGDEYVVyjsqgl9nI=" />
          </div>
          <div className="card_title-dashboard">
 
          </div>
        </div> */}
{/* 
        <div className="card-dashboard  3">
          <div className="card_image-dashboard ">
            <img src="https://www.eatthis.com/wp-content/uploads/sites/4/2021/07/shutterstock_woman-lifting-dumbbells-arm-curls.jpeg?quality=82&strip=all" />
          </div>
          <div className="card_title">
 
          </div>
        </div>

        <div className="card-dashboard  3">
          <div className="card_image-dashboard ">
            <img src="https://post.healthline.com/wp-content/uploads/2019/10/Female_Exercise_Bike_732x549-thumbnail.jpg" />
          </div>
          <div className="card_title">

          </div>
        </div> */}

{/* 
        <div className="card-dashboard  3">
          <div className="card_image-dashboard ">
            <img src="https://media.istockphoto.com/photos/indian-food-curry-butter-chicken-palak-paneer-chiken-tikka-biryani-picture-id1127563435?b=1&k=20&m=1127563435&s=612x612&w=0&h=eILdqLWa1ilkJm5qCq7s3HOnPuFea99CxYB5HxDbbVs=" />
          </div>
          <div className="card_title-dashboard ">

          </div>
        </div> */}

        {/* <div className="card-dashboard  3">
          <div className="card_image-dashboard ">
            <img src="https://media.istockphoto.com/photos/indian-chicken-curry-picture-id471614507?k=20&m=471614507&s=612x612&w=0&h=snprycYKdTlsTn9vDNuFkWVPv-mwwRJoz2UidfhKvwQ=" />
          </div>
          <div className="card_title-dashboard ">
   
          </div>
        </div>

        <div className="card-dashboard  3">
          <div className="card_image-dashboard ">
            <img src="https://media.istockphoto.com/photos/healhty-vegan-lunch-bowl-avocado-quinoa-sweet-potato-tomato-spinach-picture-id893716434?k=20&m=893716434&s=612x612&w=0&h=wSf5StzaDtfpRhzdnUlQFhslcDgwLoQFC_ARycIVRwI=" />
          </div>
          <div className="card_title">
   
          </div>
        </div> */}

        <ScheduleComponent>
          <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
        </ScheduleComponent>

  
    </div>
  </div>
</section>
    </>
  )

}
