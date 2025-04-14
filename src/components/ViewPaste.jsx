import React from 'react'
import {  useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ViewPaste = () => {
  const {id} =useParams();
  const allPaste = useSelector((state) => state.paste.pastes);
  const paste = allPaste.filter((p) => p._id === id)[0];

  return (
    <div>
      {console.log(paste)}
    <div className='flex flex-row gap-7 place-content-between'>
      <input className="border border-gray-400 p-2 rounded mt-2 w-[66%] pl-4"
      type="text" 
      placeholder='Enter title here'
      value ={paste.title}
      disabled
      />
      
  </div>

  <div>
    <textarea className='border border-gray-400 rounded-2xl mt-4 min-w-[500px] p-4'
      value = {paste.content}
      placeholder='Enter content here'
      disabled
      rows={20}
    />
  </div>
</div>
  )
}

export default ViewPaste