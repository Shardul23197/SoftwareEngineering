import React, { useEffect, useState }  from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from './auth/auth'
import axios from 'axios'
import '../App.css'; 

export default function Dashboard() {
  const existingAuthtoken = localStorage.getItem('authToken') || '';
  const existingRefreshtoken = localStorage.getItem('refreshToken') || '';
  const [authToken, setAuthtoken] = useState(existingAuthtoken);
  const [refreshToken, setRefreshtoken] = useState(existingRefreshtoken);
  const { setAuthToken, setRefreshToken } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  let navigate = useNavigate();

  /* If there are are no auth or refresh tokens in local storage get them
   * from the query parameters (from the google callback). If there are
   * still no tokens, navigate to the login screen.
   */
  useEffect(() => {
    if (!existingAuthtoken) {
      setAuthtoken(searchParams.get('authToken'));
      setAuthToken(searchParams.get('authToken'));
    }
    if (!existingRefreshtoken) {
      setRefreshtoken(searchParams.get('refreshToken'));
      setRefreshToken(searchParams.get('refreshToken'));
    }
    // if (!authToken || !refreshToken)
    //   navigate('/login');
  }, [authToken, existingAuthtoken, existingRefreshtoken, navigate, refreshToken, searchParams, setAuthToken, setRefreshToken]);

  const onLogout = (event) => {
      const headers = {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/x-www-form-urlencoded'
      };
      const instance = axios.create({
          baseURL: 'htttp://fitocity.herokuapp.com',
          withCredentials: true,
          headers: headers
      });
      
      instance.post('/auth/logout', {}).then((res) => {
          // set token in local storage to the returned jwt
          localStorage.removeItem('authToken');
          localStorage.removeItem('refreshToken');
          
          // Redirect to the dashboard because the user is logged in
          navigate('/');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>

<nav className="navbar navbar-expand-lg navbar-light bg-light">

  <div className="container-fluid">
   
    <button
      className="navbar-toggler"
      type="button"
      data-mdb-toggle="collapse"
      data-mdb-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i className="fas fa-bars"></i>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    
    <a className="navbar-brand" href="#">Fitocity</a>
   
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link" href="#">Dashboard</a>
        </li>
      </ul>
  
    </div>

    <div className="d-flex align-items-center">

    <div className="dropdown">
  <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Hello!
  </button>
  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a className="dropdown-item" href="#">Profile</a>
    <a className="dropdown-item" href="#">Settings</a>
    <a className="dropdown-item" href="#">Logout</a>
  </div>

  <button className="btn btn-primary " type="button" id="logoutButton" onClick={() => onLogout()}>
    Logout
  </button>
</div>
        
      </div>
    </div>
</nav>







<div>

<div className="cards-list-dashboard">

<div className="card-dashboard 3">
  <div className="card_image-dashboard">
    <img src="https://img.freepik.com/free-photo/woman-doing-yoga-cleaning-chakra_23-2149276019.jpg?w=2000" />
  </div>
  <div className="card_title-dashboard">
    <p>Yoga</p>
  </div>
</div>

<div className="card-dashboard 3">
  <div className="card_image-dashboard">
    <img src="https://media.istockphoto.com/photos/dance-fitness-picture-id1067009516?k=20&m=1067009516&s=612x612&w=0&h=yQnFT71CeAq8R3QG4hlv4IyLLKnfwl28lMXy9xSn8sk=" />
  </div>
  <div className="card_title-dashboard">
    <p>Zumba</p>
  </div>
</div>


<div className="card-dashboard 3">
  <div className="card_image-dashboard">
    <img src="https://media.istockphoto.com/photos/attractive-sporty-girls-in-bodysuits-training-at-aerobics-workout-on-picture-id1064119338?k=20&m=1064119338&s=612x612&w=0&h=osPNv5SEc-mZvOisVdhvWGk2dqK-l5lYGIxi_WlAfZ4=" />
  </div>
  <div className="card_title-dashboard">
    <p>Aerobics</p>
  </div>
</div>

<div className="card-dashboard  3">
  <div className="card_image-dashboard ">
    <img src="https://media.istockphoto.com/photos/workout-concept-sporty-african-american-woman-doing-abs-exercise-with-picture-id1322878383?k=20&m=1322878383&s=612x612&w=0&h=efco7G7L5NxOm956w6YApf_mYmXBGDEYVVyjsqgl9nI=" />
  </div>
  <div className="card_title-dashboard">
    <p>Core</p>
  </div>
</div>
  
  

</div>
</div>


<div>
    

<div className="cards-list-dashboard ">

<div className="card-dashboard  3">
  <div className="card_image-dashboard ">
    <img src="https://media.istockphoto.com/photos/indian-food-curry-butter-chicken-palak-paneer-chiken-tikka-biryani-picture-id1127563435?b=1&k=20&m=1127563435&s=612x612&w=0&h=eILdqLWa1ilkJm5qCq7s3HOnPuFea99CxYB5HxDbbVs=" />
  </div>
  <div className="card_title-dashboard ">
    <p>Vegetarian</p>
  </div>
</div>

<div className="card-dashboard  3">
  <div className="card_image-dashboard ">
    <img src="https://media.istockphoto.com/photos/indian-chicken-curry-picture-id471614507?k=20&m=471614507&s=612x612&w=0&h=snprycYKdTlsTn9vDNuFkWVPv-mwwRJoz2UidfhKvwQ=" />
  </div>
  <div className="card_title-dashboard ">
    <p>Non Vegetarian</p>
  </div>
</div>


<div className="card-dashboard  3">
  <div className="card_image-dashboard ">
    <img src="https://media.istockphoto.com/photos/healhty-vegan-lunch-bowl-avocado-quinoa-sweet-potato-tomato-spinach-picture-id893716434?k=20&m=893716434&s=612x612&w=0&h=wSf5StzaDtfpRhzdnUlQFhslcDgwLoQFC_ARycIVRwI=" />
  </div>
  <div className="card_title">
    <p>Vegan</p>
  </div>
</div>

<div className="card-dashboard  3">
  <div className="card_image-dashboard ">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDwGz4ybAQjO2v5xKZy4FMdej4RKCYZisvUNUljXBc9F7pdc97RLm_VbYAyORe6mBDX5g&usqp=CAU" />
  </div>
  <div className="card_title-dashboard">
    <p>Sea Food</p>
  </div>
</div>
  
  

</div>
</div>







    </>
  )

}
