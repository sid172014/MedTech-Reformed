import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import LeftSvg from "./stuff/left.svg";
import RightSvg from "./stuff/right.svg";
import VideoSource from "./stuff/1.mp4";
import Logo from "./stuff/logo-no-background.png";
import "./home.css";
import axios from "axios";

import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// In order to use and set cookies for authentication we have to use this
axios.defaults.withCredentials = true;

gsap.registerPlugin(ScrollTrigger);

const Home = () => {

    const navigate = useNavigate();

  // Form Data Container
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    username: "",
    password: "",
    email: "",
    phone: -1,
  });

  const handleLoginDataChange = (e) => {
    e.preventDefault();

    setLoginData((prev) => {
      const newObject = { ...prev, [e.target.name]: e.target.value };
      console.log(newObject);
      return newObject;
    });
  };

  const handleSignupDataChange = (e) => {
    e.preventDefault();
    setSignupData((prev) => {
      const newObject = { ...prev, [e.target.name]: e.target.value };
      console.log(newObject);
      return newObject;
    });
  };

  const handleLoginDataSubmit = async () => {
    console.log("Login Data ", loginData);
    try {
      const response = await axios.post(
        "http://localhost:3000/users/login",
        loginData
      );
      toast.success(response.data.message);
      setTimeout(() => {
        navigate('/loggedIn')
      },3000);
    } catch (e) {
      console.log(e.response.data.message);
      toast.error(e.response.data.message);
    }
  };

  const handleSignupDataSubmit = async () => {
    console.log("Signup Data", signupData);
    const response = await axios.post(
      "http://localhost:3000/users/signup",
      signupData
    );
    console.log(response.data);
    toast.success("Signed up Successfully");
    setTimeout(() => {
        navigate('/loggedIn')
      },3000);
  };

  useEffect(() => {
    // GSAP animation for changing the background color and height of #nav
    gsap.to("#nav", {
      backgroundColor: "#321414",
      duration: 0.1,
      height: "100px",
      scrollTrigger: {
        trigger: "#nav",
        scroller: "body",
        start: "top -10%",
        end: "top -11%",
        scrub: 1,
      },
    });

    // GSAP animation for changing the background color of #main
    gsap.to("#main", {
      backgroundColor: "#000",
      scrollTrigger: {
        trigger: "#main",
        scroller: "body",
        start: "top -25%",
        end: "top -70%",
        scrub: 2,
      },
    });

    // GSAP animations for moving elements
    gsap.from("#about-us img,#about-us-in", {
      y: 90,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: "#about-us",
        scroller: "body",
        start: "top 70%",
        end: "top 65%",
        scrub: 1,
      },
    });

    gsap.from(".card", {
      scale: 0.8,
      duration: 1,
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".card",
        scroller: "body",
        start: "top 70%",
        end: "top 65%",
        scrub: 1,
      },
    });

    gsap.from("#colon1", {
      y: -70,
      x: -70,
      scrollTrigger: {
        trigger: "#colon1",
        scroller: "body",
        start: "top 55%",
        end: "top 45%",
        scrub: 4,
      },
    });

    gsap.from("#colon2", {
      y: 70,
      x: 70,
      scrollTrigger: {
        trigger: "#colon1",
        scroller: "body",
        start: "top 55%",
        end: "top 45%",
        scrub: 4,
      },
    });
  }, []);

  return (
    <>
        <ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="shortcut icon"
          href="https://sidcupfamilygolf.com/wp-content/themes/puttosaurus/favicons/favicon-32x32.png"
          type="image/x-icon"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@3.4.0/fonts/remixicon.css"
          rel="stylesheet"
        />
        <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
        <link
          rel="stylesheet"
          href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css"
        ></link>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.1/gsap.min.js"
          integrity="sha512-qF6akR/fsZAB4Co1QDDnUXWnaQseLGXoniuSuSlPQK6+aWhlMZcHzkasCSlnWoe+TJuudlka1/IQ01Dnhgq95g=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        ></script>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.1/ScrollTrigger.min.js"
          integrity="sha512-IHDCHrefnBT3vOCsvdkMvJF/MCPz/nBauQLzJkupa4Gn4tYg5a6VGyzIrjo6QAUy3We5HFOZUlkUpP0dkgE60A=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        ></script>

        <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
      </head>
      
      <div id="home">
        {/* Navigation section */}
        <div id="nav">
          <img src={Logo} alt="" />
          <ul>
            <li>
              <a className="login-btn" href="#page2">
                LOGIN | SIGNUP
              </a>
            </li>
          </ul>
        </div>

        {/* Cursor elements */}
        <div id="cursor"></div>

        {/* Video background */}
        <video autoPlay loop muted src={VideoSource}></video>

        {/* Main content container */}
        <div id="main">
          {/* Page 1 section */}
          <div id="page1">
            <h1>MEDTech</h1>
            <h2>WELCOME TO MEDTECH FAMILY!</h2>
            <p>
              Your all-in-one medical companion app. From comprehensive
              information on medical conditions and associated tests to
              reminders for medication intake and appointments, MedTech has you
              covered. Stay on track with your health management through
              personalized reminders, ensuring you never miss a dose or
              appointment again. With MedTech, take control of your health
              journey effortlessly and efficiently.
            </p>
          </div>

          {/* Page 2 section */}
          <div id="page2">
            {/* Scrolling navigation */}
            <div id="scroller">
              <div id="scroller-in">
                <h4>Innovating Health, Transforming Lives.</h4>
                <h4>Innovating Health, Transforming Lives.</h4>
                <h4>Innovating Health, Transforming Lives.</h4>
                <h4>Innovating Health, Transforming Lives.</h4>
              </div>
              <div id="scroller-in">
                <h4>Innovating Health, Transforming Lives.</h4>
                <h4>Innovating Health, Transforming Lives.</h4>
                <h4>Innovating Health, Transforming Lives.</h4>
                <h4>Innovating Health, Transforming Lives.</h4>
              </div>
            </div>
            <div className="container">
              <div className="mainLoginSignup">
                <input type="checkbox" id="chk" aria-hidden="true" />
                <div className="signup">
                  <div id="signupForm">
                    <label htmlFor="chk" aria-hidden="true">
                      Sign up
                    </label>
                    <input
                      id="username"
                      type="text"
                      name="username"
                      placeholder="User name"
                      required=""
                      onChange={handleSignupDataChange}
                    />
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Email"
                      required=""
                      onChange={handleSignupDataChange}
                    />
                    <input
                      id="password"
                      type="password"
                      name="password"
                      placeholder="Password"
                      required=""
                      onChange={handleSignupDataChange}
                    />
                    <input
                      id="phone"
                      type="text"
                      name="phone"
                      placeholder="Phone"
                      required=""
                      onChange={handleSignupDataChange}
                    />
                    <div id="display"></div>
                    <button onClick={handleSignupDataSubmit}>Sign up</button>
                  </div>
                </div>
                <div className="login">
                  <div>
                    <label htmlFor="chk" aria-hidden="true">
                      Login
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Email"
                      required=""
                      onChange={handleLoginDataChange}
                    />
                    <input
                      id="password"
                      type="password"
                      name="password"
                      placeholder="Password"
                      required=""
                      onChange={handleLoginDataChange}
                    />
                    <div id="displaylogin"></div>
                    <button onClick={handleLoginDataSubmit}>Login</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cards container section */}
          <div id="cards-container">
            <div className="card" id="card1">
              <div className="overlay">
                <h4>TopRacer Range</h4>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Nulla quam molestias magni cupiditate architecto et enim quas
                  facere ipsum tempora?
                </p>
              </div>
            </div>
            <div className="card" id="card2">
              <div className="overlay">
                <h4>Adventure Golf</h4>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Nulla quam molestias magni cupiditate architecto et enim quas
                  facere ipsum tempora?
                </p>
              </div>
            </div>
            <div className="card" id="card3">
              <div className="overlay">
                <h4>Golf Lessons</h4>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Nulla quam molestias magni cupiditate architecto et enim quas
                  facere ipsum tempora?
                </p>
              </div>
            </div>
          </div>

          {/* Green div section */}
          <div id="green-div">
            <img
              src="https://eiwgew27fhz.exactdn.com/wp-content/themes/puttosaurus/img/dots-footer.svg"
              alt=""
            />
            <h4>
              SIGN UP FOR SIDCUP NEWS AND SPECIAL OFFERS STRAIGHT TO YOUR INBOX
            </h4>
            <img
              src="https://eiwgew27fhz.exactdn.com/wp-content/themes/puttosaurus/img/dots-footer.svg"
              alt=""
            />
          </div>
        </div>

        {/* Page 3 section */}
        <div id="page3">
          <p>
            Excellent couple of hours, relax and enjoy in the fun. Staff were
            accommodating, friendly and very helpful. Café on site for
            refreshments etc. Will keep children entertained during the
            holidays. Worth a visit if you haven’t been.
          </p>
          <img id="colon1" src={LeftSvg} alt="" />
          <img id="colon2" src={RightSvg} alt="" />
        </div>

        {/* Footer section */}
        <div id="footer">
          {/* Dots image for decoration */}
          <img
            src="https://eiwgew27fhz.exactdn.com/wp-content/themes/puttosaurus/img/dots-footer.svg"
            alt=""
          />
          {/* Footer columns with logo, links, and contact information */}
          <div id="f1">
            <img
              src="https://eiwgew27fhz.exactdn.com/wp-content/uploads/2023/02/logo-white.svg"
              alt=""
            />
          </div>
          <div id="f2">
            <h3>TOPTRACER Ranges</h3>
            <h3>Golf Lessons</h3>
            <h3>Adventure Golf</h3>
          </div>
          <div id="f3">
            <h3>coffee shop</h3>
            <h3>LEAGUES</h3>
            <h3>Contact us</h3>
          </div>
          <div id="f4">
            {/* Address and contact information */}
            <h4>
              A20, SIDCUP BYPASS <br />
              CHISLEHURST <br />
              KENT <br />
              BR7 6RP <br />
              TEL: 0208 309 0181 <br />
              GET DIRECTIONS <br />
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
