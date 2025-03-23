import { NavLink, useNavigate } from "react-router-dom";
import { navLinks } from "../constants/index";
import { useEffect, useState } from "react";
import { apiHelper } from "../utils/utils";
import { toast } from "react-toastify";

function NavBar() {
  const [uname, setUname] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    apiHelper.get("/api/username").then((res) => setUname(res.data));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logout Successfully");
    navigate("/login");
  };

  return (
    <nav className="bg-white px-6 md:px-20 w-full fixed top-0 shadow-md z-50 h-[10vh] flex items-center justify-between">
      {/* Navigation Links */}
      <ul className="flex space-x-6">
        {navLinks.map((navList) => (
          <NavLink 
            className="cursor-pointer hover:text-green-600 font-semibold text-md" 
            to={navList.navLink} 
            key={navList.navLabel}
          >
            {navList.navLabel}
          </NavLink>
        ))}
      </ul>

      {/* User Info & Logout */}
      <div className="flex items-center gap-3">
        {uname && (
          <>
            {/* Clicking the Image Redirects to Profile Page */}
            <NavLink to="/profile">
              <img 
                src={uname?.image} 
                className="w-8 h-8 rounded-md cursor-pointer hover:opacity-80 transition" 
                alt="User"
              />
            </NavLink>
            <p className="font-semibold">
              Hi, <span className="text-green-600">{uname?.name}</span>
            </p>
          </>
        )}
        <button 
          className="ml-5 py-2 px-5 rounded-md bg-green-600 text-white hover:bg-green-700 transition" 
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
