import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import '../../assest/CSS/AddFormPage.css'

function FormPageTitle({title,FormPageRightSideButtonURL, LinkName}) {
  return (
    <div>
    <div className="flex justify-between page-title-head mb-5">
        <div className="add-form-page-title my-auto">
          <h1 className='uppercase'>{title}</h1>
        </div>
        <div className="flex my-auto mr-5">
          {LinkName?
              <div className="add-form-close-button px-2">
              <Link to={FormPageRightSideButtonURL}>{LinkName}</Link>
            </div>
            :<></>
          }

        </div>
      </div>
    </div>
  )
}

export default FormPageTitle;