import React, { useState } from 'react'
import ClipLoader from "react-spinners/ClipLoader";

const SubmitButtonComponent = ({isLoading}) => {
    let [color, setColor] = useState("#ffffff");
  return (
    <div>
        {!isLoading?
            <button type='submit' className='bg-[#FA6669] text-[#fff] rounded-[5px] px-10 py-2'>Submit</button>
            :
            <button disabled className='bg-[#f08f91] text-[#fff] flex rounded-[5px] px-10 py-1'>
                <span className='my-auto'>Submiting..</span>
                <span className='mt-2'>
                    <ClipLoader
                        color={color}
                        loading={isLoading}
                        size={20}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </span>
            </button>
        }
    </div>
  )
}

export default SubmitButtonComponent