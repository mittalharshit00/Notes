import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes } from '../Redux/pasteSlice';
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";

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
    <div>
        <input className='border border-gray-400 rounded-2xl mt-4 min-w-[500px] p-4'
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
                  <div  className="border border-gray-300  bg-[#BBD5ED] rounded-lg p-4 shadow-md"
                  key={paste._id}>
                    <div className="text-lg font-bold mb-2">
                      {paste.title}
                    </div>
                    <div className="text-gray-600 mb-4">
                      {paste.content}
                    </div>
                    <div className="flex flex-row gap-4 justify-between">
                        <button ><Link to={`/?pasteId=${paste?._id}`}>Edit</Link></button>
                        <button>
                        <Link to={`/pastes/${paste._id}`}>View</Link>
                        </button>
                        <button className='text-blue-500'
                        onClick={()=>{
                          handleDelete(paste?._id);
                        }}>Delete</button>

                        <button className='text-blue-500'
                        onClick={()=>{
                          navigator.clipboard.writeText(paste?.content);
                          toast.success("Copied To ClipBoard");
                        }}>Copy</button>

                       <button className='text-blue-500'
                          onClick={() => {
                            if (navigator.share) {
                              navigator.share({
                                title: paste.title,
                                text: paste.content,
                                url: `/pastes/${paste._id}`,
                              })
                                .then(() => console.log("Shared successfully"))
                                .catch((error) => console.log("Error sharing:", error));
                            } else {
                              // Fallback for browsers that don't support Web Share API
                              console.log("Web Share API not supported");
                            }
                          }}
                        >
                        Share</button>
                    </div>
                    <div>
                      {paste.createdAt}
                    </div>
                  </div>
                )
              }
            )
          }
        </div>
    </div>
  )
}
export default paste