import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import Sidebars from "./Sidebars";
import TopBar from "./Topbar";
import Home from "../page/Home";
import Login from "../page/Authentication/Login/Login";
import ProtectedRoute from "./ProtectedRoutes";
// import PublicRoute from "./PublicRoute";
import PasswordChange from "../page/user/updatePassword";
import UserList from "../page/user/UserList";
import UserDetails from "../page/user/UserDetails";
import UserAdd from "../page/user/UserAdd";
import UserEdit from "../page/user/UserEdit";
import FinancialYearList from "../page/financialYear/FinancialYearList";
import CoaList from "../page/coa/CoaList";
import UserProfileView from "../page/user/UserProfileView";
import usePermissions from "../hooks/usePermissions";
import { useDispatch } from "react-redux";
import {
  chekAuthentication,
  loadUser,
} from "../page/Authentication/Login/authSlice";
import UserProfileUpdate from "../page/user/UserProfileUpdate";
import OpeningBalancesList from "../page/OpeningBalances/OpeningBalancesList";
import VoucherList from "../page/Vouchers/VoucherList";
import CreateVoucher from "../page/Vouchers/CreateVoucher";
import GatePass from "../page/CRM Pages/GatePass";
import PurchaseOrder from "../page/CRM Pages/PurchaseOrder";
import SalesReturn from "../page/CRM Pages/SalesReturn";

const PageRoutes = () => {
  const { hasPermission } = usePermissions(); //hasPermissions
  const [menuVisible, setMenuVisible] = React.useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    dispatch(chekAuthentication());
  }, [dispatch]);

  const toggleMenuVisibility = () => {
    if (window.innerWidth >= 992) {
      setMenuVisible(!menuVisible);
    } else {
      setMenuVisible(!menuVisible);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setMenuVisible(window.innerWidth >= 992);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Router>
        <div className="with-top-and-sidebar">
          <TopBar toggleMenuVisibility={toggleMenuVisibility} />

          <div className="flex mt-16">
            <CSSTransition
              in={menuVisible}
              timeout={1000} // Adjust the duration of the transition
              classNames="sidebar"
              unmountOnExit
            >
              <Sidebars toggleMenuVisibility={toggleMenuVisibility} />
            </CSSTransition>

            <div
              className={`flex-1 py-4 transition-all duration-[2s] ${
                menuVisible
                  ? "lg:ml-64 ml-[-1px] z-[-1] lg:z-[0]"
                  : "ml-0 lg:z-[2] "
              }`}
            >
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
                  path="/home"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <UserProfileView />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile/edit/"
                  element={
                    <ProtectedRoute>
                      <UserProfileUpdate />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/change-password"
                  element={
                    <ProtectedRoute>
                      <PasswordChange />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/users"
                  element={
                    <ProtectedRoute>
                      {hasPermission("view_user") && <UserList />}
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/users/:id"
                  element={
                    <ProtectedRoute>
                      {hasPermission("view_user") && <UserDetails />}
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/user-add"
                  element={
                    <ProtectedRoute>
                      {hasPermission("add_user") && <UserAdd />}
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/users/:id/edit"
                  element={
                    <ProtectedRoute>
                      {hasPermission("change_user") && <UserEdit />}
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/financial-years"
                  element={
                    <ProtectedRoute>
                      {hasPermission("view_financialyears") && (
                        <FinancialYearList />
                      )}
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/coas-list"
                  element={
                    <ProtectedRoute>
                      {hasPermission("view_acc_coa") && <CoaList />}
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/opening-balances-list"
                  element={
                    <ProtectedRoute>
                      {hasPermission("") && <OpeningBalancesList />}
                    </ProtectedRoute>
                  }
                />

                {/* prianka Added*/}
                <Route
                  path="/voucher-list"
                  element={
                    <ProtectedRoute>
                      {hasPermission("") && <VoucherList />}
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/voucher-create"
                  element={
                    <ProtectedRoute>
                      {hasPermission("") && <CreateVoucher />}
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/gate-pass"
                  element={
                    <ProtectedRoute>
                      {hasPermission("") && <GatePass />}
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/purchase-order"
                  element={
                    <ProtectedRoute>
                      {hasPermission("") && <PurchaseOrder />}
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/sales-return"
                  element={
                    <ProtectedRoute>
                      {hasPermission("") && <SalesReturn />}
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </div>
        </div>

        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
};

export default PageRoutes;
