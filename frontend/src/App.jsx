import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom';

// Importing the components
import LoginTemp from './components/homecomponent/LoginTemp';
import UserDetailsTemp from './components/homecomponent/UserDetailsTemp';
import Home from './components/homecomponent/Home';
import Main from './components/main/Main';

function App() {

  return (
    <div>
      
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/loggedIn' element={<Main/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
