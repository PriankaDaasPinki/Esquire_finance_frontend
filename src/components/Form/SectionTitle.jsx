import React from 'react'
//import './CSS/SectionTitle.css'
 
function SectionTitle({title}) {
  return (
    <div>
    <div className="flex justify-between page-title-head">
        <div className="add-form-page-title my-auto">
          <h1 className='uppercase'>{title}</h1>
        </div>
      </div>
    </div>
  )
}
 
export default SectionTitle