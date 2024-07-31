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

  return (
    <>
      <ToastContainer />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
