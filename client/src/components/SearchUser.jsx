import React, { useEffect, useState } from 'react'
import { IoClose, IoSearchOutline } from 'react-icons/io5'
import Loading from './Loading';
import SearchUserCard from './SearchUserCard';
import { toast } from "react-toastify"
import axios from "axios";

const SearchUser = ({ onClose }) => {
  const [searchUsers, setSearchUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const handleSearch = async (e) => {
    try {
      setLoading(true);
      setSearch(e?.target?.value);
      await axios.post("/serach-user", { search })
        .then((res) => {
          setLoading(false);
          setSearchUsers(res.data.data)
        })
    } catch (e) {
      toast.error(e?.response?.data?.message);
    }
  }

  useEffect(() => {
    handleSearch();
  }, [search])

  return (
    <div className='fixed left-0 right-0 bottom-0 top-0 bg-opacity-55 bg-slate-400 p-2 z-10'>
      <div className="w-full max-w-lg mx-auto mt-10">
        <div className='bg-white h-14 overflow-hidden rounded flex'>
          <input type="text" placeholder='Search Users by name or email' onChange={handleSearch} className='w-full outline-none py-1 px-2 h-full' />
          <div className='h-14 w-14 flex justify-center items-center'>
            <IoSearchOutline size={23} />
          </div>
        </div>

        {/* display serach Users */}
        <div className='bg-white mt-2 w-full p-4 rounded'>
          {/* if loading is false and no data is available i.e no users Found */}
          {
            (!loading && searchUsers.length === 0) && (
              <p className='text-center text-slate-500'>No Users Found</p>
            )
          }

          {/* if data is loading */}
          {
            loading && (
              <Loading />
            )
          }

          {/* if loading is false and data is available i.e users Found */}
          {
            !loading && searchUsers.length !== 0 && (
              searchUsers.map((s, index) => {
                return (
                  <SearchUserCard key={index} userData={s} onClose={onClose} />
                )
              })
            )
          }
        </div>
      </div>
      <div className='absolute top-0 right-0 cursor-pointer p-2 hover:text-secondary' onClick={onClose}>
        <IoClose size={30} />
      </div>
    </div>
  )
}

export default SearchUser
