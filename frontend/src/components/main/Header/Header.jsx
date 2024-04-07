import './header.css'


// Importing Components
import Logo from './Logo';
import SearchBar from './SearchBar';
import Nav from './Nav';

const Header = () => { 
    return (
        <header id='header' className='header fixed-top d-flex align-items-center'>
            {/* Logo Component */}
            <Logo></Logo>
            {/* Search Bar Component */}
            <SearchBar></SearchBar>
            {/* Navigation */}
            <Nav></Nav>
        </header>
    );
};

export default Header;