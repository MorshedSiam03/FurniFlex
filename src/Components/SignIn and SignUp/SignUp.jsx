import React, { useContext, useState } from 'react';
import { FaEyeSlash } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa6';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';

const SignUp = () => {
    const { createUser, googleLogin } = useContext(AuthContext);
    const [showPass, setShowPass] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const handleSignUp = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const user = {name, email, password}
        console.log(user);

        createUser(email, password)
        .then(result=>{
            const user = result.user;
            console.log(user);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Register Successful",
              showConfirmButton: false,
              timer: 1000
            });
            navigate(location?.state ? location.state : "/");
        })
        .then(error => console.log(error))
    }

    const handleGoogleLogin = () => {
      googleLogin()
      .then(result=>{
        console.log(result.user);
        navigate(location?.state ? location.state : "/");
      })
      .catch();
    };
    return (
        <div className="flex font-Barlow">
      {/* Left Side: Form Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-white">
        <div className="bg-[#FAFAFA] p-10 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-2 text-center">
            Welcome To{" "}
            <p className="text-blue-500 text-5xl">
              <span className="text-black">Furni</span>Flex
            </p>
          </h2>
          <p className="text-[#707070] font-semibold text-center mb-6">
            SignUp for purchase your desire products
          </p>

          {/* Form */}
          <form onSubmit={handleSignUp}>
            <div className="flex space-x-2 mb-4">
              <input
                type="text"
                name='name'
                placeholder="First name (optional)"
                className="border border-gray-300 p-3 rounded-lg w-1/2"
              />
              <input
                type="text"
                name='Last-name'
                placeholder="Last name (optional)"
                className="border border-gray-300 p-3 rounded-lg w-1/2"
              />
            </div>

            <div className="mb-4">
              <input
                type="email"
                name='email'
                placeholder="Email address"
                className="border border-gray-300 p-3 rounded-lg w-full"
                required
              />
            </div>

            <div className="mb-4 relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                name='password'
                className="border border-gray-300 p-3 rounded-lg w-full"
                required
              />
              <label
                className="absolute ml-[-35px] py-3 text-2xl"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <FaEye /> : <FaEyeSlash />}
              </label>
            </div>

            <div className="mb-4 flex items-center">
              <input type="checkbox" id="terms" className="mr-2" required />
              <label htmlFor="terms" className="text-sm font-semibold">
                I agree to the{" "}
                <a href="#" className="text-blue-500">
                  Terms & Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full btn text-lg bg-black text-white rounded-lg font-semibold"
            >
              SignUp
            </button>
          </form>

          <div className="flex items-center justify-center my-2">
            <div className="border-t border-gray-300 w-full"></div>
            <span className="mx-4 text-gray-500">or</span>
            <div className="border-t border-gray-300 w-full"></div>
          </div>

          {/* Social Sign In */}
          <div className="flex justify-between space-x-2">
            <button onClick={handleGoogleLogin} className="w-1/2 btn bg-white font-semibold flex items-center justify-center p-3 border border-gray-300 rounded-lg">
              <img
                src="/src/assets/Icon/google-logo.svg"
                alt="Google"
                className="w-5 mr-2"
              />
              Sign in with Google
            </button>
            <button className="w-1/2 btn bg-white flex font-semibold items-center justify-center p-3 border border-gray-300 rounded-lg">
              <img
                src="/src/assets/Icon/apple-logo.svg"
                alt="Apple"
                className="w-5 mr-2"
              />
              Sign in with Apple
            </button>
          </div>

          <p className="mt-6 text-center text- font-semibold">
            Have an account?{" "}
            <Link to='/SignIn' className="text-blue-500">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side: Image Section */}
      <div className="hidden md:block w-1/2 bg-black relative">
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="text-center text-white p-5">
            <img
              src="/src/assets/Icon/SignUp_Logo.svg"
              alt="FurniFlex"
              className="mx-auto mb-4"
            />
            <p className="text-gray-300 px-40 mt-4">
              Discover a seamless shopping experience with our curated
              collection of products. From fashion to electronics, we bring
              quality.
            </p>
          </div>
        </div>
        <img
          src="/src/assets/Image/SignUp_Image.png"
          alt="Chair"
          className="w-full h-[100vh] object-cover opacity-30"
        />
      </div>
    </div>
    );
};

export default SignUp;