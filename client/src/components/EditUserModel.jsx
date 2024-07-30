import React, { useContext, useEffect, useState } from 'react'
import Avatar from './Avatar'
import uploadImage from '../helpers/uploadImage'
import Devider from './Devider'
import axios from 'axios'
import { toast } from "react-toastify";
import Context from '../context'

const EditUserModel = ({ props, user, onClose }) => {
  const [data, setData] = useState({
    name: user?.name || "",
    profile_pic: user?.profile_pic || ""
  })

  const { fetchUser } = useContext(Context);

  useEffect(() => {
    setData((prev) => {
      return {
        ...prev,
        ...user
      }
    })
  }, [user])

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
    // setUploadImg(file);
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
    try {
      await axios.post("/update-user", data)
        .then((res) => {
          toast.success(res.data.message);
          fetchUser();
          onClose();
        })
    } catch (er) {

    }
  }

  return (
    <div className='fixed top-0 right-0 bottom-0 left-0 bg-white flex items-center justify-center bg-opacity-55'>
      <div className='bg-white p-4 m-1 rounded w-full max-w-sm'>
        <h2 className='font-semibold'>Profile Details</h2>
        <p className='text-sm'>Edit User Details</p>

        <form action="" className='grid gap-3 mt-3' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-2'>
            <label htmlFor="name">Name:</label>
            <input type="text" id='name' name='name' className='py-1 px-2 focus:outline-primary rounded border border-black'
              value={data.name} onChange={handleChange} />
          </div>

          <div>
            <p>Profile Pic:</p>
            <div className='my-1 flex items-center gap-5'>
              <Avatar width={40} height={40} name={data?.name} imageUrl={data?.profile_pic} />
              <label htmlFor="profile_pic">
                <p className='font-semibold cursor-pointer'>Change Photo</p>
                <input type="file" id='profile_pic' className='hidden' onChange={handleUploadPhoto} />
              </label>
            </div>
          </div>

          <Devider />

          <div className='flex gap-3 ml-auto mr-3'>
            <button className='border-primary border px-4 py-1 rounded hover:bg-primary hover:text-white'>Save</button>
            <button className='border-primary bg-primary hover:bg-secondary text-white border px-4 py-1 rounded'
              onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default React.memo(EditUserModel)
