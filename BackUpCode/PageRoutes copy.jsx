import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebars from './Sidebars';
import TopBar from './Topbar';
import Home from '../page/Home';
import Login from '../page/Authentication/Login/Login';
import ProtectedRoute from './ProtectedRoutes';
import PublicRoute from './PublicRoute';
import UserView from '../page/user/userView';
import PasswordChange from '../page/user/updatePassword';
import UserList from '../page/user/UserList';
import UserDetails from '../page/user/UserDetails';
import UserAdd from '../page/user/UserAdd';
import UserEdit from '../page/user/UserEdit';
import FinancialYearList from '../page/financialYear/FinancialYearList';

const PageRoutes = () => {
  const [menuVisible, setMenuVisible] = React.useState(true);

  const toggleMenuVisibility = () => {
    setMenuVisible(!menuVisible);
  };

  // Collapse the menu on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setMenuVisible(false);
      }
    };

    window.addEventListener('resize', handleResize);

    // Collapse menu on initial load if screen is small
    if (window.innerWidth < 768) {
      setMenuVisible(false);
    }

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Router>
      <div className="with-top-and-sidebar">
        <TopBar toggleMenuVisibility={toggleMenuVisibility} />
        <div className="flex mt-16">
          {/* Sidebar will be hidden on small screens */}
          <div className={`transition-transform ${menuVisible ? 'transform-none' : 'transform -translate-x-full'} md:translate-x-0 md:relative md:block absolute z-50`}>
            {menuVisible && (
              <Sidebars toggleMenuVisibility={toggleMenuVisibility} />
            )}
          </div>
          <div className="flex-1 p-4 ml-0">
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                <ProtectedRoute><UserView /></ProtectedRoute>}
              />
              <Route
                path="/change-password"
                element={<ProtectedRoute><PasswordChange /></ProtectedRoute>}
              />
              <Route
                path="/users"
                element={<ProtectedRoute><UserList /></ProtectedRoute>}
              />
              <Route
                path="/user-add"
                element={<ProtectedRoute><UserAdd /></ProtectedRoute>}
              />
              <Route
                path="/users/:id"
                element={<ProtectedRoute><UserDetails /></ProtectedRoute>}
              />
              <Route
                path="/users/:id/edit"
                element={<ProtectedRoute><UserEdit /></ProtectedRoute>}
              />

              <Route
                path="/financial-years"
                element={<ProtectedRoute><FinancialYearList /></ProtectedRoute>}
              />
              </Routes>
          </div>
        </div>
      </div>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default PageRoutes;
