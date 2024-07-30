import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { logout, setOnlineUser, setSocketConnection, setUser } from './redux/userSlice';
import Context from './context';
import { io } from 'socket.io-client';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  // socket connection

  useEffect(() => {
    fetchUser()
    const socketConnection = io(process.env.REACT_APP_BACKEND_URL, {
      auth: {
        token: localStorage.getItem('token')
      }
    })

    socketConnection.on('onlineuser', (data) => {
      dispatch(setOnlineUser(data))
    })

    dispatch(setSocketConnection(socketConnection))

    return () => {
      socketConnection.disconnect();
    }
  }, [])

  return (
    <>
      <Context.Provider value={{
        fetchUser
      }}>
        <ToastContainer />
        <main>
          <Outlet />
        </main>
      </Context.Provider>
    </>
  );
}

export default App;
