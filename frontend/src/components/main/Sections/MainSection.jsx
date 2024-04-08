import {ToastContainer, toast} from 'react-toastify';
import PageTitle from "./PageTitle"
import './main.css'
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./pages/Dashboard"

const MainSection = ({componentSelected}) => {

  

  return (  
    <main id="mainSection" className="main" style={{marginLeft:"300px"}}>
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
      <Dashboard></Dashboard>
    </main>
  );
}

export default MainSection