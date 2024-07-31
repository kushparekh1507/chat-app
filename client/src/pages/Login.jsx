import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log(data);

    await axios.post("/login", data)
      .then((res) => {
        localStorage.setItem("token", res?.data)
        toast.success("Successfully Logged In");
        navigate("/");
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      })
  }

  return (
    <div className='mt-5 flex items-center justify-center'>
      <div className='bg-white w-full max-w-sm mx-2 rounded overflow-hidden p-4'>
        <h3>Welcome to Chat App</h3>

        <form action="" className='grid gap-4 mt-4' onSubmit={handleSubmit}>
          <div className='grid gap-2'>
            <label htmlFor="email">Email:</label>
            <input type="email" name='email' id='email' placeholder='enter your email' className='px-2 py-1 bg-slate-100 focus:outline-primary' value={data?.email} onChange={handleChange} required />
          </div>

          <div className='grid gap-2'>
            <label htmlFor="password">Password:</label>
            <input type="password" name='password' id='password' placeholder='enter your password' className='px-2 py-1 bg-slate-100 focus:outline-primary' value={data?.password} onChange={handleChange} required />
          </div>

          <button type='submit' className='bg-primary text-lg py-2 mt-3 font-bold text-white hover:bg-secondary'>
            Login
          </button>
        </form>

        <p className='py-4 text-center'>
          <Link to={"/forgot-password"} className='font-semibold text-primary hover:text-secondary'>Forgot Password ?</Link>
        </p>
        <p className='py-4 text-center'>
          Don't Have An Account ?
          <Link to={"/register"} className='font-semibold text-primary hover:text-secondary'> Click Here</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
