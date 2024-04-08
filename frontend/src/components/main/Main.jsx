// Importing Icons
import "bootstrap-icons/font/bootstrap-icons.css";
import "remixicon/fonts/remixicon.css";

// // Importing bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

// // Importing CSS
import "./main.css";

// //importing components
import Header from "./Header/Header";
import SideBar from "./SideBar/SideBar";
import MainSection from "./Sections/MainSection";
import { useState } from "react";
// import SideBar from "./components/SideBar";
// import Main from "./components/Main";

function Main() {

  const [componentSelected,setcomponentSelected] = useState("Dashboard");

  return (
    <>
    <Header></Header>
    <SideBar setcomponentSelected={setcomponentSelected}></SideBar>
    <MainSection componentSelected={componentSelected}></MainSection>
    </>
  );
}

export default Main;
