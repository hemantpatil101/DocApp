import React from 'react'
import '../LayoutStyles.css';
import { AdminMenu, UserMenu } from './Data';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { message, Badge } from 'antd';

const Layout = ({ children }) => {
  const location = useLocation();
  const { user } = useSelector(state => state.user);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    message.success('Logged Out Successfully');
    navigate('/login');
  }

  const DoctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-user",
    }
  ]

  const SidebarMenu = user?.isAdmin ? AdminMenu : user?.isDoctor ? DoctorMenu : UserMenu;

  return (
    <>
      <div className='main'>
        <div className='Layout'>
          <div className='sidebar'>
            <div className='logo'><h6>DocApp</h6></div>
            <hr />
            <div className='menu'>
              {SidebarMenu.map(menu => {
                const isActive = location.pathname === menu.path;
                return (
                  <div key={menu.name} className={`menu-item ${isActive && 'active'}`}>
                    <i className={menu.icon}></i>
                    <Link to={menu.path}>{menu.name}</Link>
                  </div>
                );
              })}
              <div className="menu-item" onClick={handleLogout}>
                <i className='fa-solid fa-right-from-bracket'></i>
                <Link to='/login'>Logout</Link>
              </div>
            </div>
          </div>
          <div className='content'>
            <div className='header' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <h3 style={{ margin: 40 }}>DocApp : Your Ultimate Health Companion!</h3>
              </div>
              <div className="header-content" style={{ cursor: "pointer", marginLeft: "auto", display: 'flex', alignItems: 'center' }}>
                <Badge
                  count={user && user.notification?.length}
                  onClick={() => {
                    navigate("/notification");
                  }}
                >
                  <i className="fa-solid fa-bell"></i>
                </Badge>

                <Link to="/profile">{user?.name}</Link>
              </div>
            </div>
            <div className='body'>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
