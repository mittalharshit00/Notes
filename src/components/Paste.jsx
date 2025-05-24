import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes } from '../Redux/pasteSlice';
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";
import { FaRegEye, FaRegTrashAlt, FaRegEdit, FaRegCopy, FaShareAlt } from 'react-icons/fa';

const paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch =useDispatch();
  const [searchTerm,setSearchTerm] = useState("");
  const filterData =pastes.filter(
    (paste)=> paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId){
    dispatch(removeFromPastes(pasteId))
  }
  return (
    <div className="min-h-screen px-2 sm:px-8 md:px-24 max-w-7xl mx-auto w-full relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="/src/components/notes1.avif" alt="background" className="w-full h-full object-cover blur-lg scale-110" />
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
      </div>
      <div className="relative z-10">
        <input className='border border-gray-400 rounded-2xl mt-4 w-full min-w-0 p-4 bg-white/80' 
          type="text" 
          placeholder='Search here'
          value ={searchTerm}
          onChange={(e)=>setSearchTerm(e.target.value)} 
        />
        <br />
        <br />
        <div className='flex flex-col gap-5 '>
          {
            filterData.length === 0 && 
            <p className="text-gray-500 mt-4">No matching pastes found.</p>
          }
          {
            filterData.length > 0 && filterData.map(
              (paste) =>{
                return(
                  <div  className="bg-[#BBD5ED] rounded-lg p-4 shadow-md overflow-x-auto max-w-5xl mx-auto w-full"
                  key={paste._id}>
                    <div className="text-lg font-bold mb-2 break-words">
                      {paste.title}
                    </div>
                    <div className="text-gray-600 mb-4 break-words whitespace-pre-wrap">
                      {paste.content}
                    </div>
                    <div className="flex flex-col xs:flex-col sm:flex-row gap-2 sm:gap-4 justify-between w-full">
                        <button className="w-full sm:w-auto flex items-center justify-center gap-2 text-blue-500">
                          <FaRegEdit />
                        </button>
                        <button className="w-full sm:w-auto flex items-center justify-center gap-2 text-blue-500">
                          <FaRegEye />
                        </button>
                        <button className='w-full sm:w-auto flex items-center justify-center gap-2 text-blue-500'
                        onClick={()=>{
                          handleDelete(paste?._id);
                        }}>
                          <FaRegTrashAlt />
                        </button>
                        <button className='w-full sm:w-auto flex items-center justify-center gap-2 text-blue-500'
                        onClick={()=>{
                          navigator.clipboard.writeText(paste?.content);
                          toast.success("Copied To ClipBoard");
                        }}>
                          <FaRegCopy />
                        </button>
                       <button className='w-full sm:w-auto flex items-center justify-center gap-2 text-blue-500'
                          onClick={async () => {
                            if (navigator.share) {
                              try {
                                await navigator.share({
                                  title: paste.title,
                                  text: paste.content,
                                  url: window.location.origin + `/pastes/${paste._id}`,
                                });
                                toast.success("Shared successfully");
                              } catch (error) {
                                if (error.name !== 'AbortError') {
                                  toast.error("Error sharing: " + error.message);
                                }
                              }
                            } else {
                              toast.error("Web Share API not supported on this device/browser");
                            }
                          }}
                        >
                          <FaShareAlt />
                        </button>
                    </div>
                    <div className="text-xs text-gray-500 mt-2 break-words">
                      {paste.createdAt}
                    </div>
                  </div>
                )
              }
            )
          }
        </div>
      </div>
    </div>
  )
}
export default paste