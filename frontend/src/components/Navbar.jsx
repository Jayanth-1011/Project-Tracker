import React from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const Navbar = () => {
  const { logout, user } = useAuthStore(); 

  return (
    <div className="h-full shadow-xl border-b border-base-content backdrop:blur-2xl top-0 right-0 navbar w-full flex items-center justify-center px-4 bg-base-100">
      <div className="flex items-center w-full max-w-4xl justify-between pr-3 ">
        <Link to ="/homepage">
        <h1 className="font-bold bg-transparent cursor-pointer text-primary text-2xl">
          Project <span className="text-base-content">Tracker</span>
        </h1></Link>
        <div className="flex gap-2">
          {!user ? (
            <>
              <Link to="/login">
                <button className="btn btn-sm text-sm border-none rounded-lg bg-primary text-primary-content px-3 py-0.5">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="btn btn-sm text-sm border-none rounded-lg bg-primary text-primary-content px-3 py-0.5">
                  Sign Up
                </button>
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="btn btn-sm text-sm border-none rounded-lg bg-primary text-primary-content px-3 py-0.5"
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
