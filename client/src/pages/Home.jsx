import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar';
import logo from "../assets/logo.png"
import io from "socket.io-client";
import { logout, setOnlineUser, setSocketConnection, setUser } from '../redux/userSlice';

const Home = () => {
  const user = useSelector(state => state?.user);
  const location = useLocation();
  const basePath = location.pathname === "/"
  const dispatch = useDispatch();
  const navigate=useNavigate();
  // console.log(user);

  const fetchUser = async () => {
    const user = await axios.get("/user-details");

    if (user?.data?.data?.logOut) {
      dispatch(logout());
      navigate("/login");
    }
    else {
      dispatch(setUser(user?.data?.data));
    }
  }


  useEffect(() => {
    fetchUser();
  }, [])

  // socket connection
  useEffect(() => {
    const socketConnection = io(process.env.REACT_APP_BACKEND_URL, {
      auth: {
        token: localStorage.getItem('token')
      },
    })

    socketConnection.on('onlineUser', (data) => {
      console.log(data)
      dispatch(setOnlineUser(data))
    })

    dispatch(setSocketConnection(socketConnection))

    return () => {
      socketConnection.disconnect()
    }
  }, [])



  return (
    <div className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>
      <section className={`bg-white ${!basePath && "hidden lg:block"}`}>
        <Sidebar />
      </section>

      <section className={basePath ? "hidden" : undefined}>
        <Outlet />
      </section>

      <div className={`flex-col gap-2 items-center justify-center hidden ${basePath && "lg:flex"}`}>
        <div>
          <img src={logo} width={230} alt="" />
        </div>
        <p className='text-lg mt-1 text-slate-400'>Select User To Send Message</p>
      </div>
    </div>
  )
}

export default Home
