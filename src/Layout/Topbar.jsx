import React, { useEffect, useState } from 'react';
import { FaBars, FaPowerOff, FaSearch, FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { logout, selectIsLoggedIn } from '../page/Authentication/Login/authSlice';
import { CSSTransition } from 'react-transition-group';
import '../assest/CSS/CSSTransition.css'
import { baseURL } from '../baseURL';

const TopBar = ({ toggleMenuVisibility }) => {

  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [dropdownVisible, setDropdownVisible] = useState(false);


  let fullName = '';
  if(isLoggedIn && user){
     fullName = user?.user?.first_name + " " + user?.user?.last_name;
  }else{
     fullName = '';
  }



  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setDropdownVisible(!dropdownVisible);
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  useEffect(() => {
    document.addEventListener('click', closeDropdown);
    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, []);



  // If not authenticated, do not render the TopBar
  if (isLoggedIn === false) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="bg-[#fff] text-[#333] p-4 fixed top-0 w-full z-10 flex items-center justify-between border-b-[1px] border-[#E8E8E8] ">
      <div className="flex items-center">
        <button className="bg-[#fff] text-[#333] p-2" onClick={toggleMenuVisibility}>
          <FaBars />
        </button>
        <h1 className="text-[13px] md:text-[17px] font-bold ml-1 md:ml-4">
          <div className='flex'>
            {/* <img className='w-[25px] md:w-[40px]' src={Logo} alt="" /> */}
            <Link to="/">
            <div className='text-[#2e6da4] my-auto ml-1 md:ml-2'>E-bit Finance</div>
            </Link>
          </div>
        </h1>
        {/* <div className='top-search-bar ml-5 flex'>
          <div className='my-auto md:ml-10'>
            <FaSearch className='text-[#A7A7A7] text-[17px] md:text-[22px]' />
          </div>
          <input className="bg-[#ff] appearance-none border-[1px] border-[#fff] rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#2e6da4]" id="top-search" type="text" placeholder='Search...' />
        </div> */}
      </div>

      <div className="relative">
        <button className="flex items-center" onClick={toggleDropdown}>
          {user?.image?
              <img
                src={user?.image}
                alt="User"
                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
              />
              :
              <FaUser className="text-[17px] md:text-[22px] text-[#2e6da4]" />
          }
          <span className="ml-2 font-semibold text-[#2e6da4] capitalize">{fullName}</span>
        </button>

            <CSSTransition
                  in={dropdownVisible}
                  timeout={100}
                  classNames="dropdown"
                  unmountOnExit
                >
                  <div className="absolute text-start right-[-15px] mt-6 w-[150px] md:w-[150px] bg-white shadow-lg">
                      <div className='my-3'>
                        <Link to="/profile" className="font-semibold px-2 py-2  hover:text-[#FA5A7D] my-3 rounded text-[9px] md:text-[14px]">
                        Profile
                      </Link> 
                      </div>
                    <hr className='mt-1' />
                      <div className='my-3'>
                          <Link to="/change-password" className="font-semibold px-2 py-2  hover:text-[#FA5A7D] my-3 rounded text-[9px] md:text-[14px]">
                          Password Change
                        </Link>
                      </div>
                    <hr className='mt-1' />
                    <button onClick={handleLogout} className="flex font-semibold px-2 py-2 my-3 rounded">
                      <FaPowerOff className='text-[9px] md:text-[14px] text-red-500 my-auto' /> <span className='text-[9px] md:text-[14px] text-red-500 mt-[-4px] ml-1 '>Logout</span>
                    </button>
                  </div>
                </CSSTransition>
      </div>

    </div>
  );
};

export default TopBar;