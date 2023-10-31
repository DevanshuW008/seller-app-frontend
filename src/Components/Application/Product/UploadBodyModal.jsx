import React from "react"

import FileIcon from "../../../Assets/Images/fileIcon.svg"
import DeleteIcon from "../../../Assets/Images/deleteIcon.svg"

const UploadBodyModal = () => {
  return (
    <>
      {true ? (
        <div className="file-body-modal">
          <div className="content">
            <div className="file-icon">
              <img src={FileIcon} alt="File Icon" />
            </div>
            <div className="text">
              For Generate Image with speech please press the Mic icon or if you
              want to upload a photo please select upload from the gallery.
            </div>
            <div className="upload-btn">
              <input type="file" />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="show-image">
            <img
              src="https://images.unsplash.com/photo-1698509147731-b28aefd9c147?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
            <div className="remove-button">
              <img src={DeleteIcon} alt="delete icon" />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default UploadBodyModal
