import { BrowserRouter,Routes,Route } from "react-router-dom"
import PageTitle from "./PageTitle"
import './main.css'

import Dashboard from "./pages/Dashboard"

const MainSection = ({componentSelected}) => {
  

  return (  
    <main id="mainSection" className="main" style={{marginLeft:"300px"}}>
      <PageTitle title={componentSelected}></PageTitle>
      <Dashboard></Dashboard>
    </main>
  );
}

export default MainSection