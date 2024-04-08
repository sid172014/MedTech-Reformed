import { ToastContainer, toast } from "react-toastify";
import PageTitle from "./PageTitle";
import "./main.css";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "./pages/Dashboard";
import Lab from "./pages/Lab";
import MedHistory from "./pages/MedHistory";
import Reminders from "./pages/Reminders";
import Profile from "./pages/Profile";

const MainSection = ({ componentSelected }) => {

  let renderElement = "null";

  if(componentSelected === 'Dashboard'){
    renderElement = <Dashboard></Dashboard>
  }else if(componentSelected === 'Labs'){
    renderElement = <Lab></Lab>
  }else if(componentSelected === "Medical History"){
    renderElement = <MedHistory></MedHistory>
  }else if(componentSelected === "Reminders"){
    renderElement = <Reminders></Reminders>
  }else if(componentSelected === "Profile"){
    renderElement = <Profile></Profile>
  }

  return (
    <main id="mainSection" className="main" style={{ marginLeft: "300px" }}>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <PageTitle title={componentSelected}></PageTitle>
      {renderElement}
    </main>
  );
};

export default MainSection;
