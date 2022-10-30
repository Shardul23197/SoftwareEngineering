import React from "react";
import { useNavigate } from "react-router-dom";
import '../../App.css'; 

export default function Home() {
  let navigate = useNavigate(); 
  const routeToRegister = () =>{ 
    navigate('/register');
  }

  const routeToLogin = () => {
    navigate('/login');
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





<section className="home" id="home">
        <div className="content">
          <h1>About Fitocity</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <button className="button">Know More</button>
        </div>

        <div className="image">
          <img
            className="burger"
            src="https://www.muscleandfitness.com/wp-content/uploads/2019/12/1109-Home-Gtm-Dumbbells-shutterstock_1132401518.jpg?quality=86&strip=all"
          ></img>
        </div>
      </section>





      <h1 className="demo-title my-4">
  Our Prices<br/>
  
</h1>
<div className="pricing-table">
  <div className="ptable-item">
    <div className="ptable-single">
      <div className="ptable-header">
        <div className="ptable-title">
          <h2>Silver</h2>
        </div>
        <div className="ptable-price">
          <h2><small>$</small>99<span>/ M</span></h2>
        </div>
      </div>
      <div className="ptable-body">
        <div className="ptable-description">
          <ul>
            <li>Pure HTML & CSS</li>
            <li>Responsive Design</li>
            <li>Well-commented Code</li>
            <li>Easy to Use</li>
          </ul>
        </div>
      </div>
      <div className="ptable-footer">
        <div className="ptable-action">
          <a href="">Buy Now</a>
        </div>
      </div>
    </div>
  </div>

  <div className="ptable-item featured-item">
    <div className="ptable-single">
      <div className="ptable-header">
      
        <div className="ptable-title">
          <h2>Gold</h2>
        </div>
        <div className="ptable-price">
          <h2><small>$</small>199<span>/ M</span></h2>
        </div>
      </div>
      <div className="ptable-body">
        <div className="ptable-description">
          <ul>
            <li>Pure HTML & CSS</li>
            <li>Responsive Design</li>
            <li>Well-commented Code</li>
            <li>Easy to Use</li>
          </ul>
        </div>
      </div>
      <div className="ptable-footer">
        <div className="ptable-action">
          <a href="">Buy Now</a>
        </div>
      </div>
    </div>
  </div>

  <div className="ptable-item">
    <div className="ptable-single">
      <div className="ptable-header">
        <div className="ptable-title">
          <h2>Platinum</h2>
        </div>
        <div className="ptable-price">
          <h2><small>$</small>299<span>/ M</span></h2>
        </div>
      </div>
      <div className="ptable-body">
        <div className="ptable-description">
          <ul>
            <li>Pure HTML & CSS</li>
            <li>Responsive Design</li>
            <li>Well-commented Code</li>
            <li>Easy to Use</li>
          </ul>
        </div>
      </div>
      <div className="ptable-footer">
        <div className="ptable-action">
          <a href="">Buy Now</a>
        </div>
      </div>
    </div>
  </div>
</div>






<section className="review" id="review">
        <h2 className="special-head">
          Our Customers <span>Reviews</span>
        </h2>
        <div className="container">
          <div className="box">
            <img src="https://static01.nyt.com/newsgraphics/2020/11/12/fake-people/4b806cf591a8a76adfc88d19e90c8c634345bf3d/fallbacks/mobile-03.jpg" />
            <h3>Harry Williamson</h3>
            <div className="stars">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="far fa-star"></i>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div className="box">
            <img src="https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto/wp-cms/uploads/2019/02/5-create-fake-people-in-2-seconds-on-this-insane-site.jpg" />
            <h3>Victoria Skyes</h3>
            <div className="stars">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="far fa-star"></i>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div className="box">
            <img src="https://media.istockphoto.com/photos/shot-of-a-handsome-young-man-standing-against-a-grey-background-picture-id1335941248?b=1&k=20&m=1335941248&s=170667a&w=0&h=sn_An6VRQBtK3BuHnG1w9UmhTzwTqM3xLnKcqLW-mzw=" />
            <h3>Jarod Tonte</h3>
            <div className="stars">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="far fa-star"></i>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </section>

      <section className="order" id="order">
        <h2 className="special-head">
          <span>Contact</span> Us
        </h2>

        <div className="container">
          <div className="order-img">
            <img src="https://media.self.com/photos/58a34a76c29288190cbe7ba3/master/w_896,h_598,c_limit/Screen%20Shot%202017-02-14%20at%201.13.45%20PM.png" />
          </div>
          <div className="form">
            <div className="input">
              <input placeholder="Name:" />
              <input placeholder="Email:" />

              <input placeholder="Ph No:" />
              <input placeholder="Comment:" />

              <input className="button" placeholder="Send" />
            </div>
          </div>
        </div>
      </section>






</>
  );
}
