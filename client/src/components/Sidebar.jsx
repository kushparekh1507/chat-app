import React, { useEffect, useState } from 'react'
import { IoChatbubbleEllipses } from "react-icons/io5"
import { FaImage, FaUserPlus, FaVideo } from "react-icons/fa"
import { FiArrowUpLeft } from "react-icons/fi"
import { BiLogOut } from "react-icons/bi"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Avatar from './Avatar'
import { useDispatch, useSelector } from 'react-redux'
import EditUserModel from './EditUserModel'
import Devider from './Devider'
import SearchUser from './SearchUser'
import { logout } from '../redux/userSlice'
import { toast } from 'react-toastify'
import axios from 'axios'

const Sidebar = () => {
  const [editUserModel, setEdituserModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [openSeachUser, setOpenSearchUser] = useState(false);
  const dispatch = useDispatch();
  const { socketConnection, user } = useSelector(state => state?.user);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(socketConnection);
    if (socketConnection) {
      setLoading(true);
      socketConnection.emit('sidebar', user?._id)

      socketConnection.on('conversation', (data) => {
        console.log("Sidebar data:", data);
        const conversationUseData = data.map((conversationUser, index) => {
          if (conversationUser?.sender?._id === conversationUser?.receiver?._id) {
            return ({
              ...conversationUser,
              userDetails: conversationUser?.sender
            })
          }
          else if (conversationUser.receiver._id !== user?._id) {
            return ({
              ...conversationUser,
              userDetails: conversationUser?.receiver
            })
          }
          else {
            return ({
              ...conversationUser,
              userDetails: conversationUser?.sender
            })
          }
        })
        setAllUser(conversationUseData);
        setLoading(false);
      })
    }
  }, [socketConnection, user])
  // console.log(allUser);
  console.log(loading);

  const handleLogout = async () => {
    await axios.get("/logout")
      .then((res) => {
        localStorage.clear();
        toast.success("Log out successfully");
        dispatch(logout());
        navigate("/login");
      })
  }

  return (
    <div className='w-full h-full grid grid-cols-[56px,1fr] bg-white'>
      <div className='bg-slate-100 w-14 h-full rounded-tr-lg rounded-br-lg py-4 text-slate-600 flex flex-col justify-between'>
        <div>
          <NavLink className={({ isActive }) => `w-14 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded ${isActive && "bg-slate-200"}`} title='chat'>
            <IoChatbubbleEllipses size={22} />
          </NavLink>
          <div className='w-14 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded' title='Add User'
            onClick={() => setOpenSearchUser(true)}>
            <FaUserPlus size={22} />
          </div>
        </div>

        {/* profile picture and logout */}
        <div className='flex flex-col items-center'>
          <button className='cursor-pointer' title={user?.name} onClick={() => setEdituserModel(true)}>
            <Avatar width={40} height={40} userId={user?._id} imageUrl={user?.profile_pic} name={user?.name} />
          </button>
          <button onClick={handleLogout} className='-ml-1 w-14 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded' title='Log Out'>
            <BiLogOut size={22} />
          </button>
        </div>

        {/* Edit User Model */}
        {
          editUserModel && (
            <EditUserModel user={user} onClose={() => setEdituserModel(false)} />
          )
        }
      </div>

      <div className='w-full'>
        <div className='h-16 flex items-center'>
          <h2 className='text-xl font-semibold p-2 text-slate-800'>Message</h2>
        </div>
        <Devider />

        <div className='h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar'>
          {
            allUser.length === 0 && (
              <div className='mt-10'>
                <div className='flex justify-center items-center my-3 text-slate-400'>
                  <FiArrowUpLeft size={40} />
                </div>
                <p className='text-lg text-center text-slate-500'>Explore users to start a conversation with.</p>
              </div>
            )
          }

          {
            allUser.map((us, index) => {
              return (
                <NavLink to={"/" + us?.userDetails?._id} key={index} className='flex items-center gap-2 py-2 px-1 border-2 border-transparent hover:border-primary cursor-pointer'>
                  <div className='p-2'>
                    <Avatar imageUrl={us?.userDetails?.profile_pic} name={us?.userDetails?.name} userId={us?.userDetails?._id}
                      width={50} height={50} />
                  </div>
                  <div>
                    <h3 className='text-ellipsis text-lg font-semibold line-clamp-1'>
                      {
                        us?.userDetails?.name === user?.name ? (
                          us?.userDetails?.name + " (You)"
                        ) : (
                          us?.userDetails?.name
                        )
                      }
                    </h3>
                    <div className='flex items-center justify-center gap-1 text-slate-400'>
                      {
                        us?.lastMsg?.imgUrl && (
                          <div className='flex items-center justify-center gap-1'>
                            <FaImage className='' />
                            {!us?.lastMsg?.text && <span>Image</span>}
                          </div>
                        )
                      }
                      {
                        us?.lastMsg?.videoUrl && (
                          <div className='flex items-center justify-center gap-1'>
                            <FaVideo className='' />
                            {!us?.lastMsg?.text && <span>Video</span>}
                          </div>
                        )
                      }
                      <p className='text-ellipsis line-clamp-1 z-10'>
                        {us?.lastMsg?.text && us?.lastMsg?.text}
                      </p>
                    </div>
                  </div>
                  {
                    Boolean(us?.unseenMsg) && (
                      <p className='ml-auto p-1 w-6 h-6 flex items-center justify-center bg-primary text-white rounded-full mr-2 text-sm'>
                        {us?.unseenMsg}
                      </p>
                    )
                  }
                </NavLink>
              )
            })
          }
        </div>
      </div>

      {/* serach user */}
      {
        openSeachUser && (
          <SearchUser onClose={() => setOpenSearchUser(false)} />
        )
      }

    </div>
  )
}

export default Sidebar
