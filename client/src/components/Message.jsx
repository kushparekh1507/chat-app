import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import Avatar from './Avatar';
import { HiDotsVertical } from "react-icons/hi"
import { FaAngleLeft, FaImage, FaPlus, FaVideo } from "react-icons/fa"
import { IoClose } from "react-icons/io5"
import { IoMdSend } from "react-icons/io"
import uploadImage from '../helpers/uploadImage';
import Loading from './Loading';
import wallpaper from "../assets/wallpaper.jpeg"
import moment from "moment"

const Message = () => {
  const params = useParams();
  const { socketConnection, user } = useSelector(state => state?.user);
  const [userData, setUserData] = useState({});
  const [popUp, setPopUp] = useState(false);
  const [message, setMessage] = useState({
    text: "",
    imgUrl: "",
    videoUrl: ""
  })
  const [allMessages, setAllMessages] = useState([]);
  const currentMessage = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentMessage.current) {
      currentMessage.current.scrollIntoView({ behaviour: 'smooth', block: 'end' })
    }
  }, [allMessages])



  const handelUploadImage = async (e) => {
    setLoading(true);
    const file = e.target.files[0];

    const uploadPhoto = await uploadImage(file);
    console.log(uploadPhoto.data.url);
    setMessage((prev) => {
      return {
        ...prev,
        imgUrl: uploadPhoto?.data?.url
      }
    })
    setPopUp(false);
    setLoading(false);
  }

  const handelUploadVideo = async (e) => {
    setLoading(true);
    const file = e.target.files[0];

    const uploadPhoto = await uploadImage(file);
    console.log(uploadPhoto.data.url);
    setMessage((prev) => {
      return {
        ...prev,
        videoUrl: uploadPhoto?.data?.url
      }
    })
    setPopUp(false);
    setLoading(false);
  }

  const handleClearImage = async () => {
    setMessage((prev) => {
      return {
        ...prev,
        imgUrl: ""
      }
    })
  }
  const handleClearVideo = async () => {
    setMessage((prev) => {
      return {
        ...prev,
        videoUrl: ""
      }
    })
  }

  const handleChange = async (e) => {
    setMessage((prev) => {
      return {
        ...prev,
        text: e.target.value
      }
    })
  }
  // console.log(message);

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit('message-page', params.userId)

      socketConnection.emit('seen', params.userId)

      socketConnection.on('message-user', (data) => {
        setUserData(data)
      })

      socketConnection.on('message', (data) => {
        console.log('message data', data)
        setAllMessages(data)
      })
    }
  }, [socketConnection, params?.userId, user])
  console.log(userData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (message?.text || message?.imgUrl || message?.videoUrl) {
      if (socketConnection) {
        socketConnection.emit('new-message', {
          sender: user?._id,
          receiver: params?.userId,
          text: message?.text,
          imgUrl: message?.imgUrl,
          videoUrl: message?.videoUrl,
          msgByUserId: user?._id
        })

        setMessage({
          text: "",
          imgUrl: "",
          videoUrl: ""
        })
      }
    }
  }

  return (
    <div style={{ backgroundImage: `url(${wallpaper})` }} className='bg-no-repeat bg-cover'>
      <header className='sticky top-0 h-16 bg-white flex justify-between items-center px-4'>
        <Link to={"/"} className='lg:hidden'>
          <FaAngleLeft size={20} />
        </Link>
        <div className='flex items-center gap-3'>
          {
            !loading && (
              <>
                <div>
                  <Avatar width={50} height={50} imageUrl={userData?.profile_pic} userId={userData?._id} />
                </div>
                <div>
                  <h3 className='font-semibold text-xl text-ellipsis line-clamp-1'>
                    {
                      userData?.name === user?.name ? (
                        userData?.name + " (You)"
                      ) : (
                        userData?.name
                      )
                    }
                  </h3>
                  {
                    userData.online && (
                      <p className='-mt-1 text-green-600 text-xs'>Online</p>
                    )
                  }
                </div>
              </>
            )
          }
        </div>
        <div className='cursor-pointer hover:text-primary'>
          <HiDotsVertical size={25} />
        </div>
      </header>

      {/* show all messages */}
      <section className='h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scrollbar relative bg-slate-200 bg-opacity-70'
        onClick={() => setPopUp(false)}>

        {/* all message show here  */}
        <div className='flex flex-col gap-2 py-2' ref={currentMessage}>
          {
            allMessages.map((m, index) => {
              return (
                <div className={`bg-white w-fit max-w-[240px] md:max-w-sm lg:max-w-md px-2 py-1 mx-1 rounded ${user?._id === m?.msgByUserId ? "bg-teal-600 ml-auto" : ""}`} key={index}>
                  {
                    m?.imgUrl && (
                      <div className='w-full'>
                        <img src={m?.imgUrl} alt="" className='w-full h-full object-scale-down' />
                      </div>
                    )
                  }
                  {
                    m?.videoUrl && (
                      <div className='w-full'>
                        <video src={m?.videoUrl} alt="" className='w-full h-full object-scale-down' controls />
                      </div>
                    )
                  }
                  <p className='px-2 text-ellipsis line-clamp-0'>{m?.text}</p>
                  <p className='text-xs ml-auto w-fit'>{moment(m.createdAt).format('hh:mm')}</p>
                </div>
              )
            })
          }
        </div>

        {/* upload image display */}
        {
          message?.imgUrl && (
            <div className='w-full h-full sticky bottom-0 bg-slate-700 bg-opacity-30 flex items-center justify-center rounded overflow-hidden'>
              <div className='w-fit absolute right-0 top-0 p-2 hover:text-primary cursor-pointer' onClick={handleClearImage}>
                <IoClose size={25} />
              </div>
              <div className='bg-white p-2'>
                <img src={message?.imgUrl} width={300} height={300} alt="" className='aspect-square w-full h-full max-w-sm m-2 object-scale-down' />
              </div>
            </div>
          )
        }

        {
          message?.videoUrl && (
            <div className='w-full h-full sticky bottom-0 bg-slate-700 bg-opacity-30 flex items-center justify-center rounded overflow-hidden'>
              <div className='absolute right-0 top-0 p-2 hover:text-primary cursor-pointer' onClick={handleClearVideo}>
                <IoClose size={25} />x
              </div>
              <div className='bg-white p-2'>
                <video src={message?.videoUrl} className='aspect-square w-full h-full max-w-sm m-2 object-scale-down' controls muted autoPlay />
              </div>
            </div>
          )
        }

        {
          loading && (
            <div className='w-full h-full sticky bottom-0 flex items-center justify-center'>
              <Loading />
            </div>
          )
        }
      </section>

      {/* send message */}
      <section className='h-16 bg-white flex items-center px-4' >
        <div className='relative'>
          <button className='flex items-center justify-center w-12 h-12 rounded-full hover:bg-primary hover:text-white'
            onClick={() => setPopUp(prev => !prev)}>
            <FaPlus size={20} />
          </button>

          {/* video and image pop-up */}
          {popUp && (
            <div className='bg-white rounded absolute bottom-12 left-4 w-36 p-2'>
              <form>
                <label htmlFor='uploadImage' className='flex gap-2 items-center p-1 px-3 cursor-pointer hover:bg-slate-200'>
                  <div className='text-primary'>
                    <FaImage size={20} />
                  </div>
                  <p>Image</p>
                  <input type="file" id='uploadImage' className='hidden' onChange={handelUploadImage} />
                </label>
                <label htmlFor='uploadVideo' className='flex gap-2 items-center p-1 px-3 cursor-pointer hover:bg-slate-200'>
                  <div className='text-purple-400'>
                    <FaVideo size={20} />
                  </div>
                  <p>Video</p>
                  <input type="file" id='uploadVideo' className='hidden' onChange={handelUploadVideo} />
                </label>
              </form>
            </div>
          )}
        </div>

        {/* input */}
        <form action="" className='w-full h-full flex justify-between' onSubmit={handleSubmit}>
          <input type="text" placeholder='Enter Message' className='w-full h-full py-1 px-3 outline-none' value={message?.text} onChange={handleChange} />
          <button className='hover:text-primary'>
            <IoMdSend size={25} />
          </button>
        </form>
      </section>
    </div >
  )
}

export default Message
