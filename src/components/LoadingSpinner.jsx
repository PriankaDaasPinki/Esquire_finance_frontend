import React from 'react';
import '../assest/CSS/LoadingSpinner.css';
 
function LoadingSpinner() {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner"></div>
      <p className='ml-4 text-[30px]'>Loading...</p>
    </div>
  );
}
 
export default LoadingSpinner;