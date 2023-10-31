import React from "react"

import Loader from "../../../Assets/Images/loaderSpiner.svg"

const TextBodyModal = ({ listening, transcript }) => {
  return (
    <div className="text-body-modal">
      {!listening && transcript.length === 0 ? (
        <span>For Speech to Text please press the Mic icon</span>
      ) : (
        <>
          {transcript.length === 0 ? (
            <img src={Loader} alt="loader" width="80" className="chat-loader" />
          ) : (
            <span className="text-black">{transcript}</span>
          )}
        </>
      )}
    </div>
  )
}

export default TextBodyModal
