import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInUser, selectIsLoggedIn, loadUser } from "./authSlice";
import './Login.css';
import LoginPageImage from '../../../assest/Images/finance.png';
import Logo from '../../../assest/Images/ebit-transparent.png';
import { AiFillEyeInvisible, AiFillEye, AiOutlineUser, AiFillLock, AiFillFacebook, AiFillApple } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const loading = useSelector((state) => state.user.loading);

    useEffect(() => {
        if (isLoggedIn === true) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    const handleLogin = (event) => {
        event.preventDefault();
        dispatch(signInUser({ username, password }));
    };

    const [showPass, setShowPass] = useState(false);
    const toggle = () => {
        setShowPass(!showPass);
    };



    return (
        <div className='login-page bg-[#F4F3FB] mt-[-100px]'>
            <div className="md:flex justify-center items-center w-full h-screen">
                <div className='loginPageLeftSide w-full md:w-1/2'>
                    <img style={{display: "initial"}} src={LoginPageImage} alt="LoginPageImage" />
                </div>

                <div className='loginPageRightSide w-full md:w-1/2 '>
                    <div className="flex flex-col items-center">
                        <form onSubmit={handleLogin} className='bg-[#FFFFFF] p-[50px]'>
                            <div className='flex mb-3'>
                                <div><img src={Logo} alt="CompanyLogo" className='w-[100px] mt-3' /></div>
                                <div className='my-auto ml-5'><p className='logo-right-side-text uppercase'>Finance</p></div>
                            </div>
                            <hr></hr>
                            {/* <h1 className='login-text mb-8'>Login</h1> */}
                            <div>
                                <div className="mt-4 flex justify-between">
                                    <label className="login-input-label mb-3">Email</label>
                                </div>
                                <div className="relative">
                                    <div className="w-full">
                                        <input
                                            className="pl-10 login-input-field"
                                            name='username'
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                            placeholder="Username"
                                        />
                                    </div>
                                    <div className="text-xl absolute top-[15px] left-4">
                                        <AiOutlineUser className='text-gray-500' />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="mt-6 flex justify-between">
                                    <label className="login-input-label mb-3">Password</label>
                                    <Link className='text-[#6165D7]'>Forgot Password</Link>
                                </div>
                                <div className="relative">
                                    <div className="w-full">
                                        <input
                                            className="pl-10 login-input-field"
                                            type={showPass === false ? "password" : "text"}
                                            name='password'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            placeholder="Password"
                                        />
                                    </div>
                                    <div className="text-xl absolute top-[15px] left-4">
                                        <AiFillLock className='text-gray-500' />
                                    </div>

                                    <div className="text-xl absolute top-4 right-5">
                                        {showPass === false ? (
                                            <AiFillEye onClick={toggle} />
                                        ) : (
                                            <AiFillEyeInvisible onClick={toggle} />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className='flex my-5'>
                                <input type="checkbox" name="" id="" />
                                <label className='remmber-text ml-2'>Remember me</label>
                            </div>
                            
                            {!loading?
                            <button type='submit' className='loginBtn'>Login</button>
                            :
                            <button disabled className='loginBtn'>Logging in...</button>
                            }

                            <div className="flex my-5">
                                <span className='loginClose my-auto'></span>
                                <span className='mx-3 loginCloseOR'>OR</span>
                                <span className='loginClose my-auto'></span>
                            </div>

                            <div className="AnotherLoginOption flex justify-center">
                                <h3 className="login-form-down-text uppercase">Esquire Technology Limited</h3>
                                {/* <div className='googleLogin border rounded-[50%] p-2'>
                                    <Link>
                                        <FcGoogle />
                                    </Link>
                                </div>
                                <div className='facebookLogin border rounded-[50%] p-2 mx-3'>
                                    <Link>
                                        <AiFillFacebook />
                                    </Link>
                                </div>
                                <div className='appleLogin border rounded-[50%] p-2'>
                                    <Link>
                                        <AiFillApple />
                                    </Link>
                                </div> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;