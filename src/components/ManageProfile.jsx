import React, { useEffect, useReducer, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { apiFetch } from "../utils/apiFetch";
import {
  Add,
  Cancel,
  Close,
  Delete,
  Done,
  Edit,
  Image,
} from "@mui/icons-material";
import CustomInput from "./CustomInput";
import { useAlert } from "./AlertContext";
import { useDropzone } from "react-dropzone";
import { setUser } from "../store/authSlice";

const ManageProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [profilePicture, setProfilePicture] = useState(null);
  const [changedFields, setChangedFields] = useState([]);
  const [isChanged, setIsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { showAlert } = useAlert();
  const [isAddLinkActive, setIsAddLinkActive] = useState(false);
  const [newLink, setNewLink] = useState();
  const handleProfilePictureChange = async (e) => {
    e.preventDefault();
    setProfilePicture(e.target.files[0]);
    setIsChanged(true);
  };

  const deleteLink = (index) => {
    const newLinks = formData.links;
    newLinks.splice(index, 1);
    console.log(newLinks);
    setIsChanged(true);
    setFormData((prevFormData) => ({
      ...prevFormData,
      links: newLinks,
    }));
    if (!changedFields.includes("links")) {
      setChangedFields([...changedFields, "links"]);
    }
  };
  // Fetch user profile
  const getUserProfile = async () => {
    try {
      const response = await apiFetch(`/users/${user.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      setFormData(data);
      setIsLoading(false);
    } catch (error) {
      showAlert("Failed to fetch user profile", "error");
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    setIsChanged(true);
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    changedFields.includes(name)
      ? ""
      : setChangedFields([...changedFields, name]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isChanged) return;
    try {
      const formSubmit = new FormData();
      changedFields.forEach((field) => {
        console.log(formData[field]);
        formSubmit.append(field, formData[field]);
      });
      if (profilePicture) {
        formSubmit.append("picture", profilePicture);
      }
      const response = await apiFetch(`/users/${user.id}`, {
        method: "PATCH",
        body: formSubmit,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg);
      }
      dispatch(
        setUser({
          name: `${data.firstName} ${data.lastName}`,
          friends: data.firends,
          picturePath: data.picturePath,
        })
      );
      setChangedFields([]);
      setIsChanged(false);
      showAlert("User profile updated successfully", "success");
    } catch (error) {
      console.log(error);
      showAlert(error.message, "error");
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);
  return (
    <div className="flex flex-col items-center w-full max-w-2xl  *:flex-grow justify-between pb-5">
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col gap-3">
          <div className="relative [&:hover_.edit-image]:visible rounded-full">
            <img
              className="border-2 w-36 h-36 rounded-full object-cover "
              src={
                profilePicture
                  ? URL.createObjectURL(profilePicture)
                  : user.picturePath
              }
              alt={user.name}
            />
            <div className="edit-image invisible text-neutral-dark bg-black/70 rounded-full cursor-pointer flex flex-col justify-center items-center absolute bottom-0 top-0 right-0 left-0 ">
              <Image className="" fontSize="medium" />
              <div>Click to Change</div>
              <input
                onChange={handleProfilePictureChange}
                className="absolute opacity-0 w-full h-full"
                type="file"
              />
            </div>
            <Edit className="edit-image cursor-pointer invisible absolute top-2 right-2 bg-primary-main text-white p-1 rounded-full" />
          </div>
          <div className="text-center text-neutral-mediumMain font-semibold ">
            {user.name}
          </div>
        </div>
        <div className="[&_.custom-input]:bg-background-default  [&_.input-label]:bg-background-default w-full">
          <div className=" grid  grid-cols-1 sm:grid-cols-4 sm:grid-rows-2 sm:gap-x-3 lg:gap-x-5 *:max-w-xl">
              <CustomInput
                formData={formData}
                handleChange={handleChange}
                name="firstName"
                type="text"
                className="col-span-2 text-neutral-dark"
                label="First Name"
              />
              <CustomInput
                formData={formData}
                handleChange={handleChange}
                name="lastName"
                type="text"
                className="col-span-2 text-neutral-dark"
                label="Last Name"
              />
            <CustomInput
              formData={formData}
              handleChange={handleChange}
              name="location"
              type="text"
              className="col-span-2 text-neutral-dark"
              label="Location"
            />
            <CustomInput
              formData={formData}
              handleChange={handleChange}
              name="occupation"
              type="text"
              className="col-span-2 text-neutral-dark"
              label="Occupation"
            />
            </div>
          <div>
            <div className="text-neutral-dark font-semibold">Links</div>
            <div>
              <ul>
                {formData.links?.length > 0 ? (
                  formData.links.map((link, index) => {
                    return (
                      <div key={link + index}>
                        <li className="flex justify-between items-end">
                          <a target="_blank" href={link}>{link}</a>

                          <button onClick={() => deleteLink(index)}>
                            <Delete fontSize="" />
                          </button>
                        </li>
                        <hr />
                      </div>
                    );
                  })
                ) : (
                  <div>No links found...</div>
                )}
              </ul>
              <hr className="mb-2" />
              {isAddLinkActive && (
                <div
                  className={`flex  gap-3 w-full py-0.5 border-b-2 mb-1 ${
                    newLink ? "border-primary-main" : "border-white"
                  }`}
                >
                  <input
                    className="w-full bg-transparent text-neutral-dark placeholder:text-neutral-main/80 outline-none select-none"
                    value={newLink}
                    placeholder="New link...."
                    onChange={(e) => {
                      setNewLink(e.target.value);
                    }}
                    type="text"
                  />
                  <div className="flex">
                    <button
                      onClick={() => {
                        setIsAddLinkActive(false);
                        setNewLink("");
                      }}
                    >
                      <Close fontSize="small" className="text-red-500" />
                    </button>
                    <button
                      onClick={() => {
                        if (newLink) {
                          setFormData((prevFormData) => {
                            return {
                              ...prevFormData,
                              links: [...prevFormData.links, newLink],
                            };
                          });
                          setNewLink("");
                          setIsAddLinkActive(false);
                          setIsChanged(true);
                          if (!changedFields.includes("links")) {
                            setChangedFields([...changedFields, "links"]);
                          }
                        }
                      }}
                    >
                      <Done
                        className={`${
                          newLink ? " text-primary-main" : "cursor-not-allowed"
                        } `}
                      />
                    </button>
                  </div>
                </div>
              )}
              {!isAddLinkActive && formData.links?.length < 5 && (
                <button
                  className={`text-3xl flex justify-center items-center py-1 w-full text-white bg-primary-main`}
                  onClick={() => setIsAddLinkActive(!isAddLinkActive)}
                >
                  <Add />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-5 items-center justify-end w-full">
        {isChanged && (
          <button
            onClick={() => {
              getUserProfile();
              setIsChanged(false);
              setChangedFields([]);
              setIsAddLinkActive(false);
              setNewLink("");
              setProfilePicture(null);
            }}
            className="bg-neutral-light px-3 py-2 mt-5 rounded-lg text-neutral-medium hover:bg-red-800 hover:text-neutral-dark"
          >
            Cancel
          </button>
        )}
        <button
          onClick={handleSubmit}
          className={`px-3 py-2 mt-5 rounded-lg ${
            isChanged
              ? "bg-primary-main text-background-default cursor-pointer hover:bg-primary-dark"
              : "bg-neutral-light text-neutral-medium cursor-not-allowed hover:bg-neutral-light hover:text-neutral-mediumMain"
          }`}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ManageProfile;
