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
    <div>
        <div className='flex flex-row gap-7 place-content-between'>
          <input className="border border-gray-400 p-2 rounded mt-2 w-[66%] pl-4"
          type="text" 
          placeholder='Enter title here'
          value ={title}
          onChange={(e)=>setTitle(e.target.value)} 
          />
          <button onClick={createPaste}
          className="border border-gray-400 p-2 bg-[#0D0628] text-blue-500 rounded mt-2">
            {pasteId ? "Update My Paste" : "Create My Paste"}
          </button>
      </div>

      <div>
        <textarea className='border border-gray-400 rounded-2xl mt-4 min-w-[600px] p-4'
          value = {value}
          placeholder='Enter content here'
          onChange={(e)=>setvalue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  )
}

export default Home 