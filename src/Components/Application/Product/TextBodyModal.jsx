import React from "react"

import Loader from "../../../Assets/Images/loaderSpiner.svg"

const TextBodyModal = ({
  listening,
  aiInput,
  setAiInput,
  item,
  aiInputResponse,
  aiLoading
}) => {
  const changeHandler = (event) => {
    setAiInput({
      id: item.id,
      value: event.target.value
    })
  }

  return (
    <div className="text-body-modal">
      {!listening && aiInputResponse.length === 0 ? (
        <>
          <textarea
            placeholder="Text or Speech"
            value={aiInput.value}
            onChange={changeHandler}
            disabled={aiLoading}
          ></textarea>
          {aiLoading && (
            <>
              <span className="loader"></span>
            </>
          )}
        </>
      ) : (
        <>
          {listening ? (
            <img src={Loader} alt="loader" width="80" className="chat-loader" />
          ) : (
            <div className="response text-black">{aiInputResponse}</div>
          )}
        </>
      )}
    </div>
  )
}

export default TextBodyModal
