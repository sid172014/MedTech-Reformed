import './nav.css'

import NavAvatar from './NavAvatar';
import NavMessage from './NavMessage';
import NavNotice from './NavNotice';


const Nav = () => {
  return (  
    <nav className='header-nav ms-auto'>
        <ul className='d-flex align-items-center'>
            <NavNotice></NavNotice>
            <NavMessage></NavMessage>
            <NavAvatar></NavAvatar>
        </ul>
    </nav>
  )
}

export default Nav;