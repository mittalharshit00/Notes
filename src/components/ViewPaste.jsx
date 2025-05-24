import React from 'react'
import {  useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ViewPaste = () => {
  const {id} =useParams();
  const allPaste = useSelector((state) => state.paste.pastes);
  const paste = allPaste.filter((p) => p._id === id)[0];

  return (
    <div className="min-h-screen px-2 sm:px-8 md:px-24 max-w-7xl mx-auto w-full relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="/src/components/notes1.avif" alt="background" className="w-full h-full object-cover blur-lg scale-110" />
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
      </div>
      <div className="relative z-10">
        <div className='flex flex-col md:flex-row gap-4 md:gap-7 md:items-center md:justify-between w-full'>
          <input className="border border-gray-400 p-2 rounded mt-2 w-full md:w-3/4 pl-4 min-w-0 bg-white/80" 
            type="text" 
            placeholder='Enter title here'
            value ={paste.title}
            disabled
          />
        </div>
        <div>
          <textarea className='border border-gray-400 rounded-2xl mt-4 w-full min-w-0 p-4 resize-y min-h-[180px] md:min-h-[350px] lg:min-h-[400px] bg-white/80'
            value = {paste.content}
            placeholder='Enter content here'
            disabled
            rows={10}
          />
        </div>
      </div>
    </div>
  )
}

export default ViewPaste