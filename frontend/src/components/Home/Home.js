import React from "react";
import { useNavigate } from "react-router-dom";
import '../../App.css'; 

export default function Home() {
  let navigate = useNavigate(); 
  const routeToRegister = () =>{ 
    navigate('/register');
  }

  const routeToLogin = () => {
    navigate('/login')
  }
  return (
    
<>

<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Fitocity</a>
    <button
      className="navbar-toggler"
      type="button"
      data-mdb-toggle="collapse"
      data-mdb-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i className="fas fa-bars"></i>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">About</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Contact</a>
        </li>
      </ul>
      </div>
      <div className="d-flex align-items-center">
        <button type="button" className="btn px-3 me-2" onClick={routeToLogin}>
          Login
        </button>
        <button type="button" className="btn btn-primary me-3" onClick={routeToRegister}>
          Sign up for free
        </button>
      </div>
    </div>
</nav>





<div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img className="d-block w-100" src="https://www.calltheone.com/storage/blog/8/2020/09/08/how-to-exercise-safely-and-efficiently.jpg"
        alt="First slide"></img>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src="http://cdn.shopify.com/s/files/1/0430/6533/files/thfRTbtcHJfPXSFIJSJxen86NmY6ADuu1647612751.jpg?v=1647896442"
        alt="Second slide"></img>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src="https://serviceprofessionalsnetwork.com/wp-content/uploads/2022/09/How-to-improve-your-fitness-with-food-and-exercise.jpg"
        alt="Third slide"></img>
    </div>
  </div>
  <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
</div>






<div className="conatiner">
<div className="container-fluid">
  <div className="text-center">
    <h2>Pricing</h2>
    <h4>Choose a payment plan that works for you</h4>
  </div>
  <div className="row">
    <div className="col-sm-4">
      <div className="panel panel-default text-center">
        <div className="panel-heading">
          <h1>Basic</h1>
        </div>
        <div className="panel-body">
          <p><strong>20</strong> Lorem</p>
          <p><strong>15</strong> Ipsum</p>
          <p><strong>5</strong> Dolor</p>
          <p><strong>2</strong> Sit</p>
          <p><strong>Endless</strong> Amet</p>
        </div>
        <div className="panel-footer">
          <h3>$19</h3>
          <h4>per month</h4>
          <button className="btn btn-lg">Sign Up</button>
        </div>
      </div>
    </div>
    <div className="col-sm-4">
      <div className="panel panel-default text-center">
        <div className="panel-heading">
          <h1>Pro</h1>
        </div>
        <div className="panel-body">
          <p><strong>50</strong> Lorem</p>
          <p><strong>25</strong> Ipsum</p>
          <p><strong>10</strong> Dolor</p>
          <p><strong>5</strong> Sit</p>
          <p><strong>Endless</strong> Amet</p>
        </div>
        <div className="panel-footer">
          <h3>$29</h3>
          <h4>per month</h4>
          <button className="btn btn-lg">Sign Up</button>
        </div>
      </div>
    </div>
   <div className="col-sm-4">
      <div className="panel panel-default text-center">
        <div className="panel-heading">
          <h1>Premium</h1>
        </div>
        <div className="panel-body">
          <p><strong>100</strong> Lorem</p>
          <p><strong>50</strong> Ipsum</p>
          <p><strong>25</strong> Dolor</p>
          <p><strong>10</strong> Sit</p>
          <p><strong>Endless</strong> Amet</p>
        </div>
        <div className="panel-footer">
          <h3>$49</h3>
          <h4>per month</h4>
          <button className="btn btn-lg">Sign Up</button>
        </div>
      </div>
    </div>
  </div>
</div>
</div>



</>
  );
}
