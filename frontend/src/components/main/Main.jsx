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
// import SideBar from "./components/SideBar";
// import Main from "./components/Main";

function Main() {
  return (
    <>
    <Header></Header>
    <SideBar></SideBar>
    </>
  );
}

export default Main;
