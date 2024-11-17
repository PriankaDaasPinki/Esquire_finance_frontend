import React from 'react'
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

function PageTitleComponent({title,closeURL}) {
  return (
    <div>
    <div className="page-title-head mb-5 shadow-lg ">
        <div className="my-auto py-2 flex justify-between">
          <div><h1 className='uppercase text-[20px] text-[#2e6da4] font-semibold'>{title}</h1></div>
          <div>
            {closeURL &&(
              <Link className='text-[30px]' to={`/${closeURL}`}><IoArrowBackCircleSharp className='text-[#2e6da4]' /></Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageTitleComponent