import React, { useState } from 'react'
import ImageOpenModal from './ImageOpenModal';
import { baseURL } from '../../baseURL';

const ImageOpenModalButton = ({imagePath}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [currentImage, setCurrentImage] = useState('');
  
    const handleImageClick = (imageUrl) => {
      setCurrentImage(imageUrl);
      setModalVisible(true);
    };
  
    const handleModalClose = () => {
      setModalVisible(false);
    };
  
  return (
    <div>
        <img
            src={`${baseURL}/static${imagePath}`}
            alt=""
            className="h-[50px] cursor-pointer"
            onClick={() => handleImageClick(`${baseURL}/static${imagePath}`)}
        />
     <ImageOpenModal
        visible={modalVisible}
        onClose={handleModalClose}
        imageSrc={currentImage}
      />
    </div>
  )
}

export default ImageOpenModalButton