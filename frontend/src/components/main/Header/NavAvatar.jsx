
const NavAvatar = () => {
  return (
    <li className="nav-item dropdown pe-3">
      <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
      <img alt="" className="rounded-circle"></img>
      <span className="d-none d-md-block dropdown-toggle ps-2">F. David</span>
      </a>

      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
        <li className="dropdown-header">
          <h6>David</h6>
          <span>Web Developer</span>
        </li>

        <li>
          <hr className="dropdown-divider"></hr>
        </li>

        <li>
          <a className="dropdown-item d-flex align-items-center" href="#">
          <i className="bi bi-person"></i>
          <span>My Profile</span>
          </a>
        </li>

        <li>
          <hr className="dropdown-divider"></hr>
        </li>

        <li>
          <a className="dropdown-item d-flex align-items-center" href="#">
          <i className="bi bi-gear"></i>
          <span>Account Settings</span>
          </a>
        </li>

        <li>
          <hr className="dropdown-divider"></hr>
        </li>
      </ul>
    </li>
  )
}

export default NavAvatar;