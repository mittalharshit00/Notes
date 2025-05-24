import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../Redux/pasteSlice';

const Home = () => {
  const [title,setTitle] =useState("");
  const [value,setvalue] =useState("");
  const [searchParams,setSearchparams] =useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPaste = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if(pasteId){
      const paste =allPaste.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setvalue(paste.content);
    }
  }, [pasteId])
  

  function createPaste(){

    const paste ={
      title : title,
      content : value,
      _id : pasteId ||
            Date.now().toString(36),
      createdAt : new Date().toISOString(),
    }

    if(pasteId){
      dispatch(updateToPastes(paste));
    }
    else{
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setvalue("");
    setSearchparams({});


  }
  return (
    <div className="min-h-screen px-2 sm:px-8 md:px-24 max-w-7xl mx-auto w-full relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="/src/components/notes1.avif" alt="background" className="w-full h-full object-cover blur-lg scale-110" />
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
      </div>
      <div className="relative z-10">
        <div className='flex flex-col gap-4 md:flex-row md:gap-7 md:items-center md:justify-between w-full'>
          <input className="border border-gray-400 p-2 rounded mt-2 w-full md:w-3/4 pl-4 min-w-0" 
          type="text" 
          placeholder='Enter title here'
          value ={title}
          onChange={(e)=>setTitle(e.target.value)} 
          />
          <button onClick={createPaste}
          className="border border-gray-400 p-2 bg-[#0D0628] text-blue-500 rounded mt-2 w-full md:w-auto md:ml-4">
            {pasteId ? "Update My Paste" : "Create My Paste"}
          </button>
      </div>
      <div>
        <textarea className='border border-gray-400 rounded-2xl mt-4 w-full min-w-0 p-4 resize-y min-h-[200px] md:min-h-[500px] lg:min-h-[600px]'
          value = {value}
          placeholder='Enter content here'
          onChange={(e)=>setvalue(e.target.value)}
          rows={14}
        />
      </div>
      </div>
    </div>
  )
}

export default Home