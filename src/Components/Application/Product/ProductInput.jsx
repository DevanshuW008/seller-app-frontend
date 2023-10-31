import React, { useEffect, useRef, useState } from "react"
import { styled } from "@mui/material/styles"
import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  TextField,
  Stack,
  Chip,
  Modal,
  Box
} from "@mui/material"
import { DeleteOutlined } from "@mui/icons-material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import moment from "moment"
import dayjs from "dayjs"
import PlacePickerMap from "../../../Components/PlacePickerMap/PlacePickerMap"
import { TimePicker } from "@mui/x-date-pickers/TimePicker"
import { postCall } from "../../../Api/axios"

import DaysPicker from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel"

import MicIcon from "../../../Assets/Images/micIcon.svg"
import TextBodyModal from "./TextBodyModal"
import UploadBodyModal from "./UploadBodyModal"

const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black"
    },
    "&:hover fieldset": {
      borderColor: "#1c75bc"
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1c75bc"
    }
  }
})

const ProductInput = ({
  item,
  state,
  stateHandler,
  onChange,
  previewOnly,
  setFocusedField
}) => {
  const uploadFileRef = useRef(null)
  const [isImageChanged, setIsImageChanged] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [listening, setListening] = useState(false)
  const [open, setOpen] = useState(false)
  const [fetchedImageSize, setFetchedImageSize] = useState(0)

  const handleFocus = (fieldId) => {
    if (setFocusedField) {
      setFocusedField(fieldId)
    }
  }

  const handleBlur = () => {
    if (setFocusedField) {
      setFocusedField(null)
    }
  }

  const getSizeWithUnit = (size) => {
    if (size >= 1024 * 1024) {
      return (size / (1024 * 1024)).toFixed(2) + " MB"
    } else if (size >= 1024) {
      return (size / 1024).toFixed(2) + " KB"
    } else {
      return size + " bytes"
    }
  }

  const getImageSizeFromUrl = async () => {
    try {
      const response = await fetch(state[item.id])
      const blob = await response.blob()
      const sizeInBytes = blob.size
      const sizeInKilobytes = sizeInBytes / 1024
      setFetchedImageSize(sizeInKilobytes.toFixed(2) + " KB")
    } catch (error) {
      setFetchedImageSize("2 MB")
    }
  }

  useEffect(() => {
    if (item.type !== "upload") return
    if (isImageChanged === false && state[item.id] !== "") {
      getImageSizeFromUrl()
    } else {
      const sizeInBytes = getSizeWithUnit(uploadFileRef.current?.files[0]?.size)
      setFetchedImageSize(sizeInBytes)
    }
  }, [isImageChanged, state[item.id]])

  if (item.type === "input") {
    return (
      <div className={`${item.class} relative`}>
        <label className="text-sm text-label py-2 ml-1 font-medium text-left text-[#606161] inline-block">
          {item.title}
          {item.required && <span className="text-[#FF0000]"> *</span>}
        </label>
        <CssTextField
          type={item.password ? "password" : "input"}
          className="w-full h-full text-input px-2.5 py-3.5 text-[#606161] bg-transparent !border-black"
          required={item.required}
          size="small"
          multiline={item.multiline || false}
          maxRows={item.multiline ? 5 : 1}
          autoComplete="off"
          placeholder={item.placeholder}
          error={item.error || false}
          disabled={item?.isDisabled || previewOnly || false}
          helperText={item.error && item.helperText}
          value={state[item.id]}
          onChange={(e) =>
            stateHandler({
              ...state,
              [item.id]: item.isUperCase
                ? e.target.value.toUpperCase()
                : e.target.value
            })
          }
          inputProps={{
            maxLength: item.maxLength || undefined,
            minLength: item.minLength || undefined
          }}
          onFocus={() => handleFocus(item.id)}
          onBlur={handleBlur}
        />
        {item.hasMicIcon && (
          <>
            <span className="mic-icon" onClick={() => setOpen(!open)}>
              <img src={MicIcon} alt="" />
            </span>
            <Modal
              open={open}
              keepMounted
              //   onClose={() => setOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <div class="speech-modal">
                <div className="modal-header">
                  <span
                    className="close-btn cursor-pointer"
                    onClick={() => setOpen(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M20.4988 3.50562C15.8304 -1.16854 8.16958 -1.16854 3.50125 3.50562C-1.16708 8.17978 -1.16708 15.8502 3.50125 20.5243C5.89526 22.9214 8.88778 24 12 24C15.1122 24 18.1047 22.8015 20.4988 20.5243C25.1671 15.8502 25.1671 8.17978 20.4988 3.50562ZM16.9077 15.4906C17.2668 15.8502 17.2668 16.5693 16.9077 16.9288C16.6683 17.1685 16.4289 17.1685 16.1895 17.1685C15.9501 17.1685 15.7107 17.0487 15.4713 16.9288L12 13.4532L8.52868 16.9288C8.28928 17.1685 8.04988 17.1685 7.81047 17.1685C7.57107 17.1685 7.33167 17.0487 7.09227 16.9288C6.73317 16.5693 6.73317 15.8502 7.09227 15.4906L10.5636 12.015L7.09227 8.53933C6.73317 8.17978 6.73317 7.46067 7.09227 7.10112C7.45137 6.74157 8.16958 6.74157 8.52868 7.10112L12 10.5768L15.4713 7.10112C15.8304 6.74157 16.5486 6.74157 16.9077 7.10112C17.2668 7.46067 17.2668 8.17978 16.9077 8.53933L13.4364 12.015L16.9077 15.4906Z"
                        fill="#B5B5B5"
                      />
                    </svg>
                  </span>
                </div>
                <div className="modal-body">
                  <TextBodyModal />
                </div>
                <div className="modal-footer">
                  <div className="btn-group">
                    <span className="mic-button">
                      {!listening ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M11.9999 16.615C13.2693 16.615 14.3556 16.1631 15.2594 15.2596C16.1631 14.3562 16.6149 13.2693 16.6149 12V4.61551C16.6149 3.34621 16.1634 2.25979 15.2594 1.35588C14.3556 0.45218 13.2693 0 11.9999 0C10.7306 0 9.64416 0.45218 8.7403 1.35588C7.8364 2.25964 7.38452 3.34621 7.38452 4.61551V12C7.38452 13.2692 7.8366 14.3562 8.7403 15.2596C9.64401 16.1631 10.7306 16.615 11.9999 16.615Z"
                            fill="white"
                          />
                          <path
                            d="M20.0333 9.50482C19.8511 9.3221 19.6343 9.23071 19.3843 9.23071C19.1345 9.23071 18.9182 9.3221 18.7353 9.50482C18.5528 9.68749 18.4614 9.9038 18.4614 10.1537V12C18.4614 13.7789 17.829 15.3004 16.5646 16.5648C15.3006 17.8293 13.7788 18.4615 11.9999 18.4615C10.2209 18.4615 8.69936 17.8293 7.43486 16.5648C6.17052 15.3008 5.53839 13.7789 5.53839 12V10.1537C5.53839 9.9038 5.44701 9.68749 5.26439 9.50482C5.08167 9.3221 4.86555 9.23071 4.61539 9.23071C4.36523 9.23071 4.14887 9.3221 3.96625 9.50482C3.78347 9.68749 3.69214 9.9038 3.69214 10.1537V12C3.69214 14.125 4.4014 15.9736 5.81952 17.5456C7.23769 19.1176 8.99009 20.0189 11.0768 20.2495V22.1536H7.3845C7.13449 22.1536 6.91817 22.2451 6.7355 22.4278C6.55278 22.6104 6.46139 22.8268 6.46139 23.0768C6.46139 23.3264 6.55278 23.5432 6.7355 23.7258C6.91817 23.9084 7.13449 24 7.3845 24H16.615C16.8649 24 17.0815 23.9084 17.264 23.7258C17.4469 23.5433 17.5383 23.3264 17.5383 23.0768C17.5383 22.8268 17.4469 22.6104 17.264 22.4278C17.0816 22.2451 16.865 22.1536 16.615 22.1536H12.9232V20.2495C15.0095 20.0189 16.7617 19.1176 18.18 17.5456C19.5984 15.9736 20.3078 14.125 20.3078 12V10.1537C20.3078 9.90386 20.2162 9.68769 20.0333 9.50482Z"
                            fill="white"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="Swap me">
                            <path
                              id="Vector"
                              d="M6 6C5.73478 6 5.48043 6.10536 5.29289 6.29289C5.10536 6.48043 5 6.73478 5 7V17C5 17.2652 5.10536 17.5196 5.29289 17.7071C5.48043 17.8946 5.73478 18 6 18C6.26522 18 6.51957 17.8946 6.70711 17.7071C6.89464 17.5196 7 17.2652 7 17V7C7 6.73478 6.89464 6.48043 6.70711 6.29289C6.51957 6.10536 6.26522 6 6 6ZM9 9C8.73478 9 8.48043 9.10536 8.29289 9.29289C8.10536 9.48043 8 9.73478 8 10V14C8 14.2652 8.10536 14.5196 8.29289 14.7071C8.48043 14.8946 8.73478 15 9 15C9.26522 15 9.51957 14.8946 9.70711 14.7071C9.89464 14.5196 10 14.2652 10 14V10C10 9.73478 9.89464 9.48043 9.70711 9.29289C9.51957 9.10536 9.26522 9 9 9ZM3 9C2.73478 9 2.48043 9.10536 2.29289 9.29289C2.10536 9.48043 2 9.73478 2 10V14C2 14.2652 2.10536 14.5196 2.29289 14.7071C2.48043 14.8946 2.73478 15 3 15C3.26522 15 3.51957 14.8946 3.70711 14.7071C3.89464 14.5196 4 14.2652 4 14V10C4 9.73478 3.89464 9.48043 3.70711 9.29289C3.51957 9.10536 3.26522 9 3 9ZM21 10C20.7348 10 20.4804 10.1054 20.2929 10.2929C20.1054 10.4804 20 10.7348 20 11V13C20 13.2652 20.1054 13.5196 20.2929 13.7071C20.4804 13.8946 20.7348 14 21 14C21.2652 14 21.5196 13.8946 21.7071 13.7071C21.8946 13.5196 22 13.2652 22 13V11C22 10.7348 21.8946 10.4804 21.7071 10.2929C21.5196 10.1054 21.2652 10 21 10ZM12 3C11.7348 3 11.4804 3.10536 11.2929 3.29289C11.1054 3.48043 11 3.73478 11 4V20C11 20.2652 11.1054 20.5196 11.2929 20.7071C11.4804 20.8946 11.7348 21 12 21C12.2652 21 12.5196 20.8946 12.7071 20.7071C12.8946 20.5196 13 20.2652 13 20V4C13 3.73478 12.8946 3.48043 12.7071 3.29289C12.5196 3.10536 12.2652 3 12 3ZM18 6C17.7348 6 17.4804 6.10536 17.2929 6.29289C17.1054 6.48043 17 6.73478 17 7V17C17 17.2652 17.1054 17.5196 17.2929 17.7071C17.4804 17.8946 17.7348 18 18 18C18.2652 18 18.5196 17.8946 18.7071 17.7071C18.8946 17.5196 19 17.2652 19 17V7C19 6.73478 18.8946 6.48043 18.7071 6.29289C18.5196 6.10536 18.2652 6 18 6ZM15 8C14.7348 8 14.4804 8.10536 14.2929 8.29289C14.1054 8.48043 14 8.73478 14 9V15C14 15.2652 14.1054 15.5196 14.2929 15.7071C14.4804 15.8946 14.7348 16 15 16C15.2652 16 15.5196 15.8946 15.7071 15.7071C15.8946 15.5196 16 15.2652 16 15V9C16 8.73478 15.8946 8.48043 15.7071 8.29289C15.5196 8.10536 15.2652 8 15 8Z"
                              fill="white"
                            />
                          </g>
                        </svg>
                      )}
                    </span>
                    <span className="sbt-button">Submit</span>
                  </div>
                </div>
              </div>
            </Modal>
          </>
        )}
      </div>
    )
  } else if (item.type === "number") {
    return (
      <div className={`${item.class}`}>
        <label className="text-sm py-2 ml-1 font-medium text-left text-[#606161] inline-block">
          {item.title}
          {item.required && <span className="text-[#FF0000]"> *</span>}
        </label>
        <CssTextField
          type="number"
          className="w-full h-full px-2.5 py-3.5 text-input text-[#606161] bg-transparent !border-black"
          required={item.required}
          size="small"
          InputProps={{
            inputProps: { min: item.min || 0, max: item.max || 100000 }
          }}
          placeholder={item.placeholder}
          error={item.error || false}
          disabled={item?.isDisabled || previewOnly || false}
          helperText={item.error && item.helperText}
          value={state[item.id]}
          onChange={(e) => {
            const value = item.valueInDecimal
              ? parseFloat(e.target.value).toFixed(2)
              : e.target.value

            // Enforce maximum length
            const maxLength = item.maxLength || undefined
            if (maxLength && value.length > maxLength) {
              return
            }

            stateHandler({
              ...state,
              [item.id]: value
            })
          }}
          inputProps={{
            step: "1"
          }}
          onFocus={() => handleFocus(item.id)}
          onBlur={handleBlur}
        />
      </div>
    )
  } else if (item.type === "radio") {
    // console.log("state[item.id]=====>", state[item.id]);
    // console.log("item.options=====>", item.options);
    let isDisabled = false
    if (
      item.id === "isVegetarian" &&
      state["productCategory"] &&
      state["productCategory"] !== "f_and_b"
    ) {
      isDisabled = true
    } else {
    }
    return (
      <div className={`${item.class}`}>
        <label className="text-sm py-2 ml-1 font-medium text-left text-[#606161] inline-block">
          {item.title}
          {item.required && <span className="text-[#FF0000]"> *</span>}
        </label>
        <div className="field-rep-block">
          {item.options.map((radioItem, i) => {
            return (
              <div
                className={`field-radio-block${
                  radioItem.value === state[item.id] ? " radio-checked" : ""
                }`}
                key={i}
              >
                <label className="radio radio-outline-primary field-radio mb-0">
                  <input
                    type="radio"
                    name={item.id}
                    disabled={
                      item?.isDisabled || isDisabled || previewOnly || false
                    }
                    onChange={(e) => {
                      console.log("e.target.value=====>", e.target.value)
                      console.log("item.i=====>", item.id)
                      stateHandler({ ...state, [item.id]: e.target.value })
                    }}
                    value={radioItem.value}
                    checked={radioItem.value === state[item.id]}
                  />
                  <span>{radioItem.key}</span>
                  <span className="checkmark"></span>
                </label>
              </div>
            )
          })}
        </div>
        {/* <RadioGroup
          aria-label={item.id}
          name={item.id}
          value={state[item.id]}
          onChange={(e) => {
            console.log("e.target.value=====>", e.target.value)
            console.log("item.i=====>", item.id)
            // stateHandler({ ...state, [item.id]: e.target.value });
          }}
          disabled={isDisabled}
        >
          <div className="flex flex-row">
            {item.options.map((radioItem, i) => (
              <FormControlLabel
                disabled={
                  item?.isDisabled || isDisabled || previewOnly || false
                }
                key={i}
                value={radioItem.value}
                control={
                  <Radio
                    size="small"
                    checked={radioItem.value === state[item.id]}
                  />
                }
                label={
                  <div className="text-sm font-medium text-[#606161]">
                    {radioItem.key}
                  </div>
                }
              />
            ))}
          </div>
        </RadioGroup> */}
      </div>
    )
  } else if (item.type === "checkbox") {
    //  console.log("state[item.id]=====>", state[item.id]);
    //  console.log("item.options=====>", item.options);
    const onChange = (e) => {
      const val = e.target.name
      const itemIndex = state[item.id].indexOf(val)
      if (itemIndex == -1) {
        stateHandler((prevState) => {
          const newState = {
            ...prevState,
            [item.id]: [...prevState[item.id], val]
          }
          return newState
        })
      } else {
        stateHandler((prevState) => {
          const newState = {
            ...prevState,
            [item.id]: prevState[item.id].filter((ele) => ele != val)
          }
          return newState
        })
      }
    }
    return (
      <div className="py-1 flex flex-col">
        <label className="text-sm py-2 ml-1 font-medium text-left text-[#606161] inline-block">
          {item.title}
          {item.required && <span className="text-[#FF0000]"> *</span>}
        </label>
        <FormGroup row>
          {item.options.map((checkboxItem) => (
            <FormControlLabel
              control={
                <Checkbox
                  disabled={item?.isDisabled || previewOnly || false}
                  key={checkboxItem.key}
                  onChange={onChange}
                  name={checkboxItem.value}
                  size="small"
                  checked={
                    state[item.id] &&
                    state[item.id].find((day) => day === checkboxItem.value)
                      ? true
                      : false
                  }
                />
              }
              label={
                <div
                  className="text-sm font-medium text-[#606161]"
                  key={checkboxItem.key}
                >
                  {checkboxItem.key}
                </div>
              }
            />
          ))}
        </FormGroup>
      </div>
    )
  } else if (item.type === "select") {
    //  console.log("state[item.id]=====>", item.id, "=====>", state[item.id]);

    return (
      <div className={`${item.class}`}>
        <label className="text-sm py-2 ml-1 font-medium text-left text-[#606161] block">
          {item.title}
          {item.required && <span className="text-[#FF0000]"> *</span>}
        </label>
        <FormControl error={item.error || false} className="block w-full">
          <Autocomplete
            disableClearable={
              item.disableClearable !== undefined
                ? item.disableClearable
                : false
            }
            disabled={item?.isDisabled || previewOnly || false}
            // filterSelectedOptions
            size="small"
            options={item.options}
            getOptionLabel={(option) => option.key}
            value={
              state[item.id] !== "" && item.options && item.options.length > 0
                ? item.options.find((option) => option.value === state[item.id])
                : null
            }
            onChange={(event, newValue) => {
              stateHandler((prevState) => {
                if (item.id === "productCategory") {
                  const newState = {
                    ...prevState,
                    [item.id]: newValue.value || "",
                    productSubcategory1: ""
                  }
                  return newState
                } else {
                  const newState = {
                    ...prevState,
                    [item.id]: newValue.value
                  }
                  return newState
                }
              })
            }}
            className="text-input"
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={
                  !previewOnly && !state[item.id] ? item.placeholder : ""
                }
                variant="outlined"
                error={item.error || false}
                helperText={item.error && item.helperText}
              />
            )}
          />
        </FormControl>
      </div>
    )
  } else if (item.type === "location-picker") {
    return (
      <div className="py-1 flex flex-col">
        <label className="text-sm py-2 ml-1 mb-1 font-medium text-left text-[#606161] inline-block">
          {item.title}
          {item.required && <span className="text-[#FF0000]"> *</span>}
        </label>
        <div style={{ width: "100%", height: "400px" }}>
          <PlacePickerMap
            location={
              state[item.id]
                ? { lat: state[item.id].lat, lng: state[item.id].long }
                : {}
            }
            setLocation={(location) => {
              const {
                district,
                city,
                state: stateVal,
                area: country,
                pincode: area_code,
                locality,
                lat,
                lng
              } = location
              stateHandler({
                ...state,
                [item.id]: {
                  lat: lat,
                  long: lng
                },
                address_city: city != "" ? city : district,
                state: stateVal,
                country,
                area_code,
                locality
                // city: city != "" ? city : district,
              })
            }}
          />
        </div>
      </div>
    )
  } else if (item.type === "date-picker") {
    function reverseString(str) {
      // empty string
      let newString = ""
      for (let i = str.length - 1; i >= 0; i--) {
        newString += str[i]
      }
      return newString
    }
    const dateValue = moment(
      state[item.id],
      item.format || "DD/MM/YYYY"
    ).format(item.format ? reverseString(item.format) : "YYYY/MM/DD")
    return (
      <div className={`${item.class}`}>
        <label className="text-sm py-2 ml-1 mb-1 font-medium text-left text-[#606161] inline-block">
          {item.title}
          {item.required && <span className="text-[#FF0000]"> *</span>}
        </label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            disableFuture
            className="w-full date-input text-input-date"
            format={item.format || "DD/MM/YYYY"}
            views={item.views || ["year", "month", "day"]}
            onChange={(newValue) => {
              const date = moment(new Date(newValue))
                .format(item.format || "DD/MM/YYYY")
                .toString()
              stateHandler((prevState) => {
                const newState = {
                  ...prevState,
                  [item.id]: date
                }
                return newState
              })
            }}
            value={state[item.id] ? dayjs(dateValue) : ""}
            slots={{
              TextField: (params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  error={item.error || false}
                  helperText={item.error && item.helperText}
                />
              )
            }}
          />
        </LocalizationProvider>
      </div>
    )
  } else if (item.type === "time-picker") {
    function reverseString(str) {
      // empty string
      let newString = ""
      for (let i = str.length - 1; i >= 0; i--) {
        newString += str[i]
      }
      return newString
    }
    const dateValue = moment(state[item.id], item.format || "hh:mm A")
    //  console.log("item.format======>", item.format);
    //  console.log("dateValue=====>", dateValue);
    return (
      <div className="py-1 flex flex-col" style={{ position: "relative" }}>
        {item.title && (
          <label className="text-sm py-2 ml-1 mb-1 font-medium text-left text-[#606161] inline-block">
            {item.title}
            {item.required && <span className="text-[#FF0000]"> *</span>}
          </label>
        )}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            closeOnSelect={false}
            ampm={item.ampm !== undefined ? item.ampm : true}
            format={item.format || "hh:mm A"}
            onChange={(newValue) => {
              if (stateHandler) {
                const date = moment(new Date(newValue))
                  .format(item.format || "hh:mm A")
                  .toString()
                stateHandler((prevState) => {
                  const newState = {
                    ...prevState,
                    [item.id]: date
                  }
                  return newState
                })
              } else {
                const date = moment(new Date(newValue))
                  .format(item.format || "hh:mm A")
                  .toString()
                onChange(date)
              }
            }}
            value={state[item.id] ? dayjs(dateValue) : ""}
            slots={{
              TextField: (params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  error={item.error || false}
                  helperText={item.error && item.helperText}
                />
              )
            }}
          />
        </LocalizationProvider>
      </div>
    )
  } else if (item.type === "days-picker") {
    function reverseString(str) {
      // empty string
      let newString = ""
      for (let i = str.length - 1; i >= 0; i--) {
        newString += str[i]
      }
      return newString
    }
    let values = state[item.id]
    // if(values && values.length > 0){
    //   values = values.map((itemDate) => moment(itemDate, item.format || 'DD/MM/YYYY').format(item.format?reverseString(item.format):'YYYY/MM/DD'));
    // }else{}
    return (
      <div className="py-1 flex flex-col">
        <label className="text-sm py-2 ml-1 mb-1 font-medium text-left text-[#606161] inline-block">
          {item.title}
          {item.required && <span className="text-[#FF0000]"> *</span>}
        </label>
        <DaysPicker
          value={values || []}
          multiple
          format={item.format || "DD/MM/YYYY"}
          plugins={[<DatePanel />]}
          onChange={(newValue) => {
            stateHandler((prevState) => {
              const newState = {
                ...prevState,
                [item.id]: newValue.map((itemDate) => {
                  const date = moment(new Date(itemDate))
                    .format(item.format || "DD/MM/YYYY")
                    .toString()
                  console.log("date=====>", date)
                  return date
                })
              }
              return newState
            })
          }}
          render={(value, openCalendar) => {
            const valuesArray = value ? value.split(",") : ""
            return (
              <Autocomplete
                multiple
                id="tags-readOnly"
                options={[]}
                readOnly
                getOptionLabel={(option) => option}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option}
                      {...getTagProps({ index })}
                      onClick={() => {}}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder={
                      !previewOnly && !state[item.id] ? item.placeholder : ""
                    }
                    onFocus={openCalendar}
                  />
                )}
                value={valuesArray || []}
              />
            )
          }}
        />
      </div>
    )
  } else if (item.type === "multi-select") {
    return (
      <div className="py-1 flex flex-col">
        {item.title && (
          <label className="text-sm py-2 ml-1 mb-1 font-medium text-left text-[#606161] inline-block">
            {item.title}
            {item.required && <span className="text-[#FF0000]"> *</span>}
          </label>
        )}
        <FormControl>
          <Autocomplete
            disabled={item?.isDisabled || previewOnly || false}
            multiple
            // filterSelectedOptions
            size="small"
            options={item.options}
            getOptionLabel={(option) => option.key}
            value={state[item.id]}
            onChange={(event, newValue) => {
              stateHandler((prevState) => {
                const newState = {
                  ...prevState,
                  [item.id]: newValue
                }
                return newState
              })
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={
                  state[item.id].length === 0 ? item.placeholder : ""
                }
                variant="outlined"
                error={item.error || false}
                helperText={item.error && item.helperText}
              />
            )}
          />
        </FormControl>
      </div>
    )
  } else if (item.type === "upload") {
    const allowedMaxSize = 2 * 1024 * 1024 // 2 MB in Bytes
    const getSignUrl = async (file) => {
      const url = `/api/v1/upload/${item?.file_type}`
      const file_type = file.type.split("/")[1]
      const data = {
        fileName: file.name.replace(`\.${file_type}`, ""),
        fileType: file_type
      }
      const res = await postCall(url, data)
      console.log("getSignUrl", res)
      return res
    }

    const renderUploadedUrls = () => {
      if (item?.multiple) {
        if (state?.uploaded_urls) {
          return state?.uploaded_urls?.map((url) => {
            return (
              <img
                src={url}
                height={50}
                width={50}
                style={{ margin: "10px" }}
              />
            )
          })
        }
      } else {
        if ((!isImageChanged && state?.tempURL?.[item.id]) || state[item.id]) {
          return (
            <img
              src={state?.tempURL?.[item.id] || state[item.id] || ""}
              height={50}
              width={50}
              style={{ margin: "10px" }}
            />
          )
        } else {
          return <></>
        }
      }
    }

    if (previewOnly) {
      if (typeof state[item.id] == "string") {
        return (
          <div
            style={{ height: 100, width: 100, marginBottom: 40, marginTop: 10 }}
          >
            <label
              className="text-sm py-2 ml-1 font-medium text-left text-[#606161] inline-block"
              style={{ width: 200 }}
            >
              {item.title}
            </label>
            <img className="ml-1 h-full w-full" src={state[item.id]} />
          </div>
        )
      } else {
        return (
          <div
            style={{ height: 100, width: 100, marginBottom: 40, marginTop: 10 }}
            className="flex"
          >
            <label className="text-sm py-2 ml-1 font-medium text-left text-[#606161] inline-block">
              {item.title}
            </label>
            {state[item.id]?.map((img_url) => (
              <img className="ml-1 h-full w-full" key={img_url} src={img_url} />
            ))}
          </div>
        )
      }
    }

    const UploadedFile = ({ name, size }) => {
      if (!name) return

      const getImageName = (path) => {
        const splitPath = path.split("/")
        const fileTypeIndex = splitPath.indexOf(item.file_type)

        if (fileTypeIndex !== -1 && fileTypeIndex + 1 < splitPath.length) {
          const nameUrl = splitPath[fileTypeIndex + 1]
          return nameUrl
        } else {
          return item.file_type
        }
      }
      const getImageType = (path) => {
        const splitPath = path.split("/")
        const fileType = splitPath[splitPath.length - 1].split(".").pop()
        return fileType
      }

      return (
        <Stack
          direction="row"
          spacing={1}
          alignItems={"center"}
          style={{ marginBottom: 20 }}
        >
          <IconButton
            style={{ width: 35, height: 35 }}
            size="small"
            color="error"
            onClick={(e) => {
              e.stopPropagation()
              // reset file input
              uploadFileRef.current.value = null
              stateHandler((prevState) => {
                const newState = {
                  ...prevState,
                  [item.id]: Array.isArray(prevState[item.id])
                    ? prevState[item.id].filter((ele) => ele != name)
                    : "",
                  uploaded_urls: []
                }
                return newState
              })
            }}
          >
            <DeleteOutlined fontSize="small" />
          </IconButton>
          <div>
            <div className="flex items-center">
              <p className="text-xs text-neutral-900 max-w-sm">
                File name: &nbsp;
              </p>
              <p className="text-xs text-neutral-600 max-w-sm">
                {getImageName(name)}
              </p>
            </div>
            <div className="flex items-center">
              <p className="text-xs text-neutral-900 max-w-sm">
                File type: &nbsp;
              </p>
              <p className="text-xs text-neutral-600 max-w-sm">
                {getImageType(name)}
              </p>
            </div>
            {!item.multiple && (
              <div className="flex items-center">
                <p className="text-xs text-neutral-900 max-w-sm">
                  File size: &nbsp;
                </p>
                <p className="text-xs text-neutral-600 max-w-sm">
                  {fetchedImageSize}
                </p>
              </div>
            )}
          </div>
        </Stack>
      )
    }

    return (
      <div className={`${item.class}`}>
        <label
          htmlFor="contained-button-file"
          className="text-sm py-2 ml-1 font-medium text-left text-[#606161] inline-block"
        >
          {item.title}
          {item.required && <span className="text-[#FF0000]"> *</span>}
        </label>
        <div style={{ display: "flex" }}>{renderUploadedUrls()}</div>
        <div className="file-input-box">
          <button type="button" onClick={() => setOpen(true)}>
            Choose Files
          </button>
        </div>
        <p className="note">
          Multiple file selection allowed, Maximum size of 2MB for each file{" "}
          <span className="text-[#FF0000]"> *</span>
        </p>
        <Modal
          open={open}
          keepMounted
          //   onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="speech-modal">
            <div className="modal-header">
              <span
                className="close-btn cursor-pointer"
                onClick={() => setOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M20.4988 3.50562C15.8304 -1.16854 8.16958 -1.16854 3.50125 3.50562C-1.16708 8.17978 -1.16708 15.8502 3.50125 20.5243C5.89526 22.9214 8.88778 24 12 24C15.1122 24 18.1047 22.8015 20.4988 20.5243C25.1671 15.8502 25.1671 8.17978 20.4988 3.50562ZM16.9077 15.4906C17.2668 15.8502 17.2668 16.5693 16.9077 16.9288C16.6683 17.1685 16.4289 17.1685 16.1895 17.1685C15.9501 17.1685 15.7107 17.0487 15.4713 16.9288L12 13.4532L8.52868 16.9288C8.28928 17.1685 8.04988 17.1685 7.81047 17.1685C7.57107 17.1685 7.33167 17.0487 7.09227 16.9288C6.73317 16.5693 6.73317 15.8502 7.09227 15.4906L10.5636 12.015L7.09227 8.53933C6.73317 8.17978 6.73317 7.46067 7.09227 7.10112C7.45137 6.74157 8.16958 6.74157 8.52868 7.10112L12 10.5768L15.4713 7.10112C15.8304 6.74157 16.5486 6.74157 16.9077 7.10112C17.2668 7.46067 17.2668 8.17978 16.9077 8.53933L13.4364 12.015L16.9077 15.4906Z"
                    fill="#B5B5B5"
                  />
                </svg>
              </span>
            </div>
            <div className="modal-body">
              <UploadBodyModal />
            </div>
            <div className="modal-footer">
              <div className="btn-group">
                <span className="mic-button">
                  {true ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M11.9999 16.615C13.2693 16.615 14.3556 16.1631 15.2594 15.2596C16.1631 14.3562 16.6149 13.2693 16.6149 12V4.61551C16.6149 3.34621 16.1634 2.25979 15.2594 1.35588C14.3556 0.45218 13.2693 0 11.9999 0C10.7306 0 9.64416 0.45218 8.7403 1.35588C7.8364 2.25964 7.38452 3.34621 7.38452 4.61551V12C7.38452 13.2692 7.8366 14.3562 8.7403 15.2596C9.64401 16.1631 10.7306 16.615 11.9999 16.615Z"
                        fill="white"
                      />
                      <path
                        d="M20.0333 9.50482C19.8511 9.3221 19.6343 9.23071 19.3843 9.23071C19.1345 9.23071 18.9182 9.3221 18.7353 9.50482C18.5528 9.68749 18.4614 9.9038 18.4614 10.1537V12C18.4614 13.7789 17.829 15.3004 16.5646 16.5648C15.3006 17.8293 13.7788 18.4615 11.9999 18.4615C10.2209 18.4615 8.69936 17.8293 7.43486 16.5648C6.17052 15.3008 5.53839 13.7789 5.53839 12V10.1537C5.53839 9.9038 5.44701 9.68749 5.26439 9.50482C5.08167 9.3221 4.86555 9.23071 4.61539 9.23071C4.36523 9.23071 4.14887 9.3221 3.96625 9.50482C3.78347 9.68749 3.69214 9.9038 3.69214 10.1537V12C3.69214 14.125 4.4014 15.9736 5.81952 17.5456C7.23769 19.1176 8.99009 20.0189 11.0768 20.2495V22.1536H7.3845C7.13449 22.1536 6.91817 22.2451 6.7355 22.4278C6.55278 22.6104 6.46139 22.8268 6.46139 23.0768C6.46139 23.3264 6.55278 23.5432 6.7355 23.7258C6.91817 23.9084 7.13449 24 7.3845 24H16.615C16.8649 24 17.0815 23.9084 17.264 23.7258C17.4469 23.5433 17.5383 23.3264 17.5383 23.0768C17.5383 22.8268 17.4469 22.6104 17.264 22.4278C17.0816 22.2451 16.865 22.1536 16.615 22.1536H12.9232V20.2495C15.0095 20.0189 16.7617 19.1176 18.18 17.5456C19.5984 15.9736 20.3078 14.125 20.3078 12V10.1537C20.3078 9.90386 20.2162 9.68769 20.0333 9.50482Z"
                        fill="white"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="Swap me">
                        <path
                          id="Vector"
                          d="M6 6C5.73478 6 5.48043 6.10536 5.29289 6.29289C5.10536 6.48043 5 6.73478 5 7V17C5 17.2652 5.10536 17.5196 5.29289 17.7071C5.48043 17.8946 5.73478 18 6 18C6.26522 18 6.51957 17.8946 6.70711 17.7071C6.89464 17.5196 7 17.2652 7 17V7C7 6.73478 6.89464 6.48043 6.70711 6.29289C6.51957 6.10536 6.26522 6 6 6ZM9 9C8.73478 9 8.48043 9.10536 8.29289 9.29289C8.10536 9.48043 8 9.73478 8 10V14C8 14.2652 8.10536 14.5196 8.29289 14.7071C8.48043 14.8946 8.73478 15 9 15C9.26522 15 9.51957 14.8946 9.70711 14.7071C9.89464 14.5196 10 14.2652 10 14V10C10 9.73478 9.89464 9.48043 9.70711 9.29289C9.51957 9.10536 9.26522 9 9 9ZM3 9C2.73478 9 2.48043 9.10536 2.29289 9.29289C2.10536 9.48043 2 9.73478 2 10V14C2 14.2652 2.10536 14.5196 2.29289 14.7071C2.48043 14.8946 2.73478 15 3 15C3.26522 15 3.51957 14.8946 3.70711 14.7071C3.89464 14.5196 4 14.2652 4 14V10C4 9.73478 3.89464 9.48043 3.70711 9.29289C3.51957 9.10536 3.26522 9 3 9ZM21 10C20.7348 10 20.4804 10.1054 20.2929 10.2929C20.1054 10.4804 20 10.7348 20 11V13C20 13.2652 20.1054 13.5196 20.2929 13.7071C20.4804 13.8946 20.7348 14 21 14C21.2652 14 21.5196 13.8946 21.7071 13.7071C21.8946 13.5196 22 13.2652 22 13V11C22 10.7348 21.8946 10.4804 21.7071 10.2929C21.5196 10.1054 21.2652 10 21 10ZM12 3C11.7348 3 11.4804 3.10536 11.2929 3.29289C11.1054 3.48043 11 3.73478 11 4V20C11 20.2652 11.1054 20.5196 11.2929 20.7071C11.4804 20.8946 11.7348 21 12 21C12.2652 21 12.5196 20.8946 12.7071 20.7071C12.8946 20.5196 13 20.2652 13 20V4C13 3.73478 12.8946 3.48043 12.7071 3.29289C12.5196 3.10536 12.2652 3 12 3ZM18 6C17.7348 6 17.4804 6.10536 17.2929 6.29289C17.1054 6.48043 17 6.73478 17 7V17C17 17.2652 17.1054 17.5196 17.2929 17.7071C17.4804 17.8946 17.7348 18 18 18C18.2652 18 18.5196 17.8946 18.7071 17.7071C18.8946 17.5196 19 17.2652 19 17V7C19 6.73478 18.8946 6.48043 18.7071 6.29289C18.5196 6.10536 18.2652 6 18 6ZM15 8C14.7348 8 14.4804 8.10536 14.2929 8.29289C14.1054 8.48043 14 8.73478 14 9V15C14 15.2652 14.1054 15.5196 14.2929 15.7071C14.4804 15.8946 14.7348 16 15 16C15.2652 16 15.5196 15.8946 15.7071 15.7071C15.8946 15.5196 16 15.2652 16 15V9C16 8.73478 15.8946 8.48043 15.7071 8.29289C15.5196 8.10536 15.2652 8 15 8Z"
                          fill="white"
                        />
                      </g>
                    </svg>
                  )}
                </span>
                <span className="file-upload-btn">Upload</span>
              </div>
            </div>
          </div>
        </Modal>
        {/* <FormControl error={item.error}>
          <input
            ref={uploadFileRef}
            id="contained-button-file"
            name="contained-button-file"
            style={{
              opacity: "none",
              color: item.fontColor ? item.fontColor : "#f0f0f0",
              marginBottom: 10
            }}
            accept="image/*"
            type="file"
            multiple={item?.multiple || false}
            key={item?.id}
            onChange={(e) => {
              const token = Cookies.get("token")
              for (const file of e.target.files) {
                if (!file.type.startsWith("image/")) {
                  cogoToast.warn("Only image files are allowed")
                  // reset file input
                  uploadFileRef.current.value = null
                  return
                }
                if (file.size > allowedMaxSize) {
                  cogoToast.warn("File size should be less than 2 MB")
                  // reset file input
                  uploadFileRef.current.value = null
                  return
                }
                const formData = new FormData()
                formData.append("file", file)
                getSignUrl(file).then((d) => {
                  const url = d.urls
                  console.log("url=====>", url)
                  axios(url, {
                    method: "PUT",
                    data: file,
                    headers: {
                      ...(token && { "access-token": `Bearer ${token}` }),
                      "Content-Type": "multipart/form-data"
                    }
                  })
                    .then((response) => {
                      setIsImageChanged(true)
                      if (item.multiple) {
                        stateHandler((prevState) => {
                          const newState = {
                            ...prevState,
                            [item.id]: [...prevState[item.id], d.path],
                            uploaded_urls: []
                          }
                          return newState
                        })
                      } else {
                        let reader = new FileReader()
                        let tempUrl = ""
                        reader.onload = function (e) {
                          tempUrl = e.target.result
                          stateHandler({
                            ...state,
                            [item.id]: d.path,
                            tempURL: {
                              ...state.tempURL,
                              [item.id]: tempUrl
                            }
                          })
                        }
                        reader.readAsDataURL(file)
                      }
                      response.json()
                    })
                    .then((json) => {})
                })
              }
            }}
          />

          {item.multiple ? (
            state[item.id]?.map((name) => {
              return <UploadedFile name={name} />
            })
          ) : (
            <UploadedFile name={state[item.id]} />
          )}
          {item.error && <FormHelperText>{item.helperText}</FormHelperText>}
        </FormControl> */}
      </div>
    )
  } else if (item.type === "label") {
    return <p className="text-2xl font-semibold mb-4 mt-14">{item.title}</p>
  }
}

export default ProductInput
