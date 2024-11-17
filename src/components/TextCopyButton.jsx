// CopyButton.js
import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { IoCopyOutline } from "react-icons/io5";
import './../assest/CSS/tooltiptext.css'

function TextCopyButton({ text }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    setIsCopied(true);

    // Reset the "Copied!" message after 3 seconds
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <CopyToClipboard text={text} onCopy={handleCopyClick}>
      <div className="tooltip">
        <p className='mx-2 my-auto text-[]'>
          { <IoCopyOutline className='text-[#2039eb]' />}
        </p>
        <span className="tooltiptext">{isCopied ? <p className='tooltiptext1'>Copied</p> : <p className='tooltiptext2'>Copy to Clipboard</p>}</span>
      </div>
    </CopyToClipboard>

  );
}

export default TextCopyButton;
