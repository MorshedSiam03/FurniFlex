import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const Navbar = () => {
  const { user, Logout } = useContext(AuthContext);
  const [items, setItems] = useState([]);

  const url = `http://localhost:3000/cart?email=${user?.email}`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // Additional filtering on the client side
        const filteredItems = data.filter((item) => item.email === user?.email);
        setItems(filteredItems);
      });
  }, [url, user?.email]);

  const handleLogout = () => {
    Logout()
      .then(() => {})
      .catch((error) => console.error(error));
  };
  const navItems = (
    <>
      <li>
        <NavLink
          exact
          to="/home"
          className={({ isActive }) => (isActive ? "font-bold" : "")}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/products"
          className={({ isActive }) => (isActive ? "font-bold" : "")}
        >
          Products
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/categories"
          className={({ isActive }) => (isActive ? "font-bold" : "")}
        >
          Categories
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/custom"
          className={({ isActive }) => (isActive ? "font-bold" : "")}
        >
          Custom
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/blog"
          className={({ isActive }) => (isActive ? "font-bold" : "")}
        >
          Blog
        </NavLink>
      </li>
    </>
  );

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box my-1 z-[1] mt-3 w-52 p-2 shadow"
            >
              {navItems}
            </ul>
          </div>
          <NavLink to="/">
            <img src="/src/assets/Icon/Logo.svg" alt="Logo" />
          </NavLink>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1 font-medium text-[18px]">
            {navItems}
          </ul>
        </div>
        <div className="navbar-end">
          <Link>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost hover:bg-transparent btn-circle relative mx-3"
            >
              <Link to="/Cart">
                <div className="indicator">
                  <img src="/src/assets/Icon/Added.svg" alt="" />
                  <span className="badge badge-lg bg-[#323232] px-2 py-3 text-white font-medium text-sm indicator-item absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2">
                    {items.length}
                  </span>
                </div>
              </Link>
            </div>
          </Link>

          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="User Profile" src={user?.photoURL} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    {user?.displayName}
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/SignIn" className="btn">
              SignIn
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
