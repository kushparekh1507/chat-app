import React from 'react'
import Avatar from "./Avatar"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const SearchUserCard = ({ userData, onClose }) => {
  const { user } = useSelector(state => state?.user);
  return (
    <Link to={"/" + userData._id} className='flex items-center gap-4 p-2 lg:p-4 border border-transparent border-b-slate-300 hover:border hover:border-primary rounded cursor-pointer' onClick={onClose}>
      <div>
        <Avatar width={40} height={40} userId={userData?._id} imageUrl={userData?.profile_pic} name={userData?.name} />
      </div>
      <div>
        <p className='font-semibold text-ellipsis line-clamp-1'>
          {
            userData?.name === user?.name ? (
              userData?.name + " (You)"
            ) : (
              userData?.name
            )
          }
        </p>
        <p className='text-ellipsis line-clamp-1'>{user?.email}</p>
      </div>
    </Link>
  )
}

export default SearchUserCard
