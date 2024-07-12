
/* eslint-disable react/prop-types */
import { useState } from "react";
import { LayoutModal, ReactionInfoBox } from "..";
import { noImage } from "../../assets";
import axios from "axios";

function EditProfileModal({ setShowEditProfileModal, data }) {
  const token = JSON.parse(localStorage.getItem('token'));
  const { userId, email, username, name, img,  bio } = data;
  const defaultImg = img || "";

  const [formData, setFormData] = useState({ email, name, username, bio, imgFile: defaultImg});
  const [isAvailable, setIsAvailable] = useState(null);
  const [savingState, setSavingState] = useState('Save');
  const [infoSavingReaction, setInfoSavingReaction] = useState(false);

  let usernameUnderlineText = getUsernameUnderlineText(isAvailable);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const handleImgSelect = (e) => {
    setFormData({ ...formData, imgFile: e.target.files[0] });
  }
  const handleCancel = () => {
    setShowEditProfileModal(false);
  }
  const handleSave = async () => {
    setSavingState('Saving...');
    try {
      let dataOfForm = new FormData();
      dataOfForm.append('imgFile', formData.imgFile);
      dataOfForm.append('email', formData.email);
      dataOfForm.append('username', formData.username);
      dataOfForm.append('bio', formData.bio);
      dataOfForm.append('name', formData.name);
      dataOfForm.append('token', token);

      const response = await axios.post(`http://localhost:8080/profile/edit_profile/${userId}`, dataOfForm)
      const result = await response.data;

      setShowEditProfileModal(false);
      if (result.success) {
        if (result.profileData) {
          localStorage.setItem('email', JSON.stringify(result.profileData.email));
          localStorage.setItem('username', JSON.stringify(result.profileData.username));
          localStorage.setItem('name', JSON.stringify(result.profileData.name));
          localStorage.setItem('bio', JSON.stringify(result.profileData.bio));
          localStorage.setItem('img', JSON.stringify(result.profileData.img));
        }
        setSavingState("Saved.");
        window.location.reload();
      }
      else {
        setSavingState('Save');
      }
    }
    catch (err) {
      setSavingState("Save");
      setInfoSavingReaction(true);

      setTimeout(() => {
        setInfoSavingReaction(false);
      }, 3000);
    }
  }

  const handleUsernameChange = async (e) => {
    handleChange(e);
    setIsAvailable("checking");
    const value = e.target.value;

    if (/\s/.test(value)) setIsAvailable("error");
    else if (value && value.trim().length > 0) {
      const response = await fetch(`http://localhost:8080/signup/check_username/${value}`);
      const result = await response.json();

      if (result.available) setIsAvailable(true);
      else setIsAvailable(false);
    }
  }

  return (
    <>
      <LayoutModal hideModal={handleCancel} maxWidth="sm:max-w-lg">
        <div className="w-full flex justify-center items-center bg-gradient-to-r from-[var(--blue)] to-[var(--blue-semidark2)] py-2 border-b-2">
          <h1 className="text-lg font-medium text-white">Edit Profile</h1>
        </div>

        <div className="min-h-[50px] overflow-auto max-h-[70vh]">
          <div className="flex justify-center items-center mt-5 ">
            <img src={formData.imgFile !== defaultImg ? URL.createObjectURL(formData.imgFile) : (img || noImage) } alt="" className="w-32 h-32 object-contain rounded-full " />
          </div>
          <div className="flex flex-col justify-center items-center mt-12 w-full max-w-[400px] gap-7">
            <input type='file' name="imgFile" onChange={handleImgSelect} className="" />
            <Input type='email' name="email" value={formData.email} handleChange={handleChange} placeholder="Enter New Email Address" />
            <Input type="text" name="name" value={formData.name} handleChange={handleChange} placeholder="Enter Name" />
            <Input type="text" name="username" value={formData.username} handleChange={handleUsernameChange} placeholder="Enter Your new Username" >
              <p className="text-[9px] font-semibold w-[65%] absolute top-7">
                {usernameUnderlineText}
              </p>
            </Input>
            <textarea type="text" name="bio" value={formData.bio} onChange={handleChange} placeholder="Enter Bio" className="w-[65%] h-16 border-b-[0.5px] focus:border-b-[2px] border-gray-300 focus:border-[var(--blue)] outline-none" maxLength="150"></textarea>
            <div className="flex justify-end w-[65%] -mt-7">
              <span className="font-normal text-xs text-gray-600">{150 - formData.bio?.length || 0}/150</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 mt-2">
          <button type="button" onClick={handleSave} className="inline-flex w-full justify-center rounded-md bg-gradient-to-r from-[var(--blue)] to-[var(--blue-semidark2)] hover:from-[var(--blue-hover)] hover:to-[var(--blue-semidark-hover)] px-6 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto transition-all" disabled={!(savingState === "Save")}>{savingState}</button>
          <button type="button" onClick={handleCancel} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-6 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
        </div>
      </LayoutModal>
      <ReactionInfoBox showInfo={infoSavingReaction} text="Couldn't save profile info." />
    </>
  )
}

export default EditProfileModal;



const Input = ({ type, name, value, handleChange, placeholder, children }) => {
  return (
    <>
      <div className="w-[65%] relative">
        <input type={type} name={name} value={value} onChange={(e) => handleChange(e)} placeholder={placeholder} required className="border-b-[0.5px] focus:border-b-[2px] border-gray-300 focus:border-[var(--blue)] outline-none w-full"
        />
        {children}
      </div>
    </>
  )
}


const getUsernameUnderlineText = (isAvailable) => {
  if (isAvailable === "checking") return (<span className="text-yellow-600">checking...</span>);
  else if (isAvailable === "error") return (<span className="text-red-600">Username can not contain spaces!</span>);
  else if (isAvailable === true) return (<span className="text-green-500">Available.</span>);
  else if (isAvailable === false) return (<span className="text-red-600">Not Available!</span>);
}
