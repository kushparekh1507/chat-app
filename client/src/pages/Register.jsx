import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import uploadImage from '../helpers/uploadImage';
import axios from 'axios';
import { toast } from 'react-toastify';

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: ""
  })
  const navigate = useNavigate();

  const [uploadImg, setUploadImg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    setUploadImg(file);
    const uploadPhoto = await uploadImage(file);
    console.log(uploadPhoto.data.url);
    setData((prev) => {
      return {
        ...prev,
        profile_pic: uploadPhoto?.data?.url
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log(data);

    await axios.post("/register", data)
      .then((res) => {
        toast.success(res.data.message);
        navigate("/login");
      })
      .catch((e) => {
        toast.error(e.response.data);
      })
  }

  return (
    <div className='mt-5 flex items-center justify-center'>
      <div className='bg-white w-full max-w-sm mx-2 rounded overflow-hidden p-4'>
        <h3>Welcome to Chat App</h3>

        <form action="" className='grid gap-4 mt-4' onSubmit={handleSubmit}>
          <div className='grid gap-2'>
            <label htmlFor="name">Name:</label>
            <input type="text" name='name' id='name' placeholder='enter your name' className='px-2 py-1 bg-slate-100 focus:outline-primary' value={data?.name} onChange={handleChange} required />
          </div>

          <div className='grid gap-2'>
            <label htmlFor="email">Email:</label>
            <input type="email" name='email' id='email' placeholder='enter your email' className='px-2 py-1 bg-slate-100 focus:outline-primary' value={data?.email} onChange={handleChange} required />
          </div>

          <div className='grid gap-2'>
            <label htmlFor="password">Password:</label>
            <input type="password" name='password' id='password' placeholder='enter your password' className='px-2 py-1 bg-slate-100 focus:outline-primary' value={data?.password} onChange={handleChange} required />
          </div>

          <div className='grid gap-2'>
            <label htmlFor="profile_pic">
              Profile Pic:
              <div className='h-14 bg-slate-200 flex items-center justify-center border-2 hover:border-primary cursor-pointer'>
                <p className='text-sm text-ellipsis line-clamp-1 max-w-[200px] flex'>
                  {uploadImg?.name ? (
                    <>
                      {uploadImg.name}
                      <button className='px-2 flex items-center justify-center hover:text-red-500' onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setUploadImg("");
                      }}>
                        <IoMdClose />
                      </button>
                    </>
                  ) : "Upload Profile Picture"}
                </p>
              </div>
            </label>
            <input type="file" name='profile_pic' id='profile_pic' className='hidden px-2 py-1 bg-slate-100 focus:outline-primary' onChange={handleUploadPhoto} />
          </div>

          <button type='submit' className='bg-primary text-lg py-2 mt-3 font-bold text-white hover:bg-secondary'>
            Register
          </button>
        </form>

        <p className='py-4 text-center'>
          Already Have An Account ?
          <Link to={"/login"} className='font-semibold text-primary hover:text-secondary'> Click Here</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
