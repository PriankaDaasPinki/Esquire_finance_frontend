import React from "react";
import { Sidebar, Menu } from "react-pro-sidebar";
import {
  // FaFile,
  FaHome,
  // FaUser,
  // FaPiggyBank,
  FaPlay,
  FaUsers,
} from "react-icons/fa";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../page/Authentication/Login/authSlice"; // Import the selector
import CustomSubMenu from "./SidebarMenuDesign/CustomSubMenu";
import CustomSubMenuItem from "./SidebarMenuDesign/CustomSubMenuItem";
import CustomMenu from "./SidebarMenuDesign/CustomMenu";
import usePermissions from "../hooks/usePermissions";
import { MdAccountTree } from "react-icons/md";
import { AiFillAccountBook } from "react-icons/ai";
import { GiTakeMyMoney } from "react-icons/gi";
import { RiNewspaperLine } from "react-icons/ri";

const Sidebars = ({ toggleMenuVisibility }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsLoggedIn); // Get the authentication state
  // const user = useSelector((state) => state.user.user); // Get the logged-in user data
  const { hasPermission, hasPermissions } = usePermissions();

  const handleMenuClick = (path) => {
    navigate(path);
  };

  if (isAuthenticated === false) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex">
      {/* Sidebar Section */}
      <div className="bg-white lg:mt-[1px] z-20 lg:z-0 text-gray-800 shadow-md fixed h-[100vh] border-[1px]">
        <Sidebar className="overflow-y-auto max-h-[90%]">
          <Menu>
            <CustomMenu
              label="Dashboard"
              icon={<FaHome size={18} />}
              onClick={() => handleMenuClick("/")}
              path="/"
              currentPath={location.pathname}
            />

            {/* User Management Submenu */}
            {hasPermissions(["view_user"]) && (
              <CustomSubMenu label="User" icon={<FaUsers />}>
                {hasPermission("view_user") && (
                  <CustomSubMenuItem
                    label="User List"
                    icon={<FaPlay size={10} />}
                    onClick={() => handleMenuClick("/users")}
                    path="/users"
                    currentPath={location.pathname}
                  />
                )}
              </CustomSubMenu>
            )}

            {hasPermissions(["view_acc_coa"]) && (
              <CustomSubMenu label="Chart of Account" icon={<MdAccountTree />}>
                {hasPermission("view_acc_coa") && (
                  <CustomSubMenuItem
                    label="List"
                    icon={<FaPlay size={10} />}
                    onClick={() => handleMenuClick("/coas-list")}
                    path="/coas-list"
                    currentPath={location.pathname}
                  />
                )}
              </CustomSubMenu>
            )}

            {hasPermissions(["view_financialyears"]) && (
              <CustomSubMenu
                label="Financial Year"
                icon={<AiFillAccountBook />}
              >
                {hasPermission("view_financialyears") && (
                  <CustomSubMenuItem
                    label="Finalcial Year List"
                    icon={<FaPlay size={10} />}
                    onClick={() => handleMenuClick("/financial-years")}
                    path="/financial-years"
                    currentPath={location.pathname}
                  />
                )}
              </CustomSubMenu>
            )}
            {hasPermissions([""]) && (
              <CustomSubMenu label="Opening Balances" icon={<GiTakeMyMoney />}>
                {hasPermission("") && (
                  <CustomSubMenuItem
                    label="Opening Balances"
                    icon={<FaPlay size={10} />}
                    onClick={() => handleMenuClick("/opening-balances-list")}
                    path="/opening-balances-list"
                    currentPath={location.pathname}
                  />
                )}
              </CustomSubMenu>
            )}
            {hasPermissions([""]) && (
              <CustomSubMenu label="Vouchers" icon={<RiNewspaperLine />}>
                {hasPermission("") && (
                  <CustomSubMenuItem
                    label="Voucher List"
                    icon={<FaPlay size={10} />}
                    onClick={() => handleMenuClick("/voucher-list")}
                    path="/voucher-list"
                    currentPath={location.pathname}
                  />
                )}
              </CustomSubMenu>
            )}
            {hasPermissions([""]) && (
              <CustomSubMenu label="CRM Pages" icon={<RiNewspaperLine />}>
                {hasPermission("") && (
                  <>
                    <CustomSubMenuItem
                      label="Gate Pass"
                      icon={<FaPlay size={10} />}
                      onClick={() => handleMenuClick("/gate-pass")}
                      path="/gate-pass"
                      currentPath={location.pathname}
                    />
                    <CustomSubMenuItem
                      label="Sales Return"
                      icon={<FaPlay size={10} />}
                      onClick={() => handleMenuClick("/sales-return")}
                      path="/sales-return"
                      currentPath={location.pathname}
                    />
                    <CustomSubMenuItem
                      label="Purchase Order"
                      icon={<FaPlay size={10} />}
                      onClick={() => handleMenuClick("/purchase-order")}
                      path="/purchase-order"
                      currentPath={location.pathname}
                    />
                  </>
                )}
              </CustomSubMenu>
            )}
          </Menu>
        </Sidebar>
      </div>

      {/* Content Area */}
      {/* <div className="flex-1 overflow-y-auto p-[5px] ml-64 border-[1px]"> */}
      <div className="flex-1 overflow-y-auto p-[5px] z-40">
        {/* Your content goes here */}
      </div>
    </div>
  );
};

export default Sidebars;
