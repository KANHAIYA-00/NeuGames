import { useState, useEffect } from "react";
import { Camera } from "../assets/svgs.jsx";
import fetchUser from "../Functions/Fetchuser.jsx";
import LogOutbtn from "../Components/Logoutbtn.jsx";
import { Success } from "../Functions/Toastify.jsx";
import { ToastContainer } from "react-toastify";
const Profile = () => {
  const [User, setUser] = useState({});
  const [image, setImage] = useState("");
  const [edit, setEdit] = useState(false);

  const imageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64String = reader.result;
      setImage(base64String);
    };
  };

  const updateProfile = async () => {
    if (image) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}api/update`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ image }),
          }
        );
        const result = await response.json();
        if (response.ok) {
          window.location.reload();
        } else {
          Error(result.Message);
        }
      } catch (error) {
        console.error("Error:", error);
        Error("Something Went Wrong.");
      }
    }
  };

  const deleteAccount = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}api/delete`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      const result = await response.json();
      if (response.ok) {
        Success(result.Message);
        setTimeout(() => {
          window.location.href = "/Login";
        }, 2100);
      } else {
        Error(result.Message);
      }
    } catch (error) {
      console.error("Error:", error);
      Error("Something Went Wrong.");
    }
  };

  useEffect(() => {
    const handleFetchUser = async () => {
      try {
        const userData = await fetchUser();
        setUser(userData);
      } catch (error) {
        console.error("Error:", error);
        Error("Unable to fetch user.");
      }
    };
    handleFetchUser();
  }, []);

  return (
    <>
      <ToastContainer />
      <div
        id="MAIN"
        className="h-full w-[95vw] pl-2 rounded-ss-2xl overflow-y-scroll custom-scrollbar flex justify-center items-center"
        style={{ boxShadow: "inset 5px 5px 6px #111111e6" }}
      >
        <div className="flex flex-col gap-2 justify-center items-center">
          <div
            id="CIRCLE"
            className=" max-2xl:h-32 sm:max-2xl:w-32 h-[20vh] w-[10vw] flex justify-center items-center rounded-full bg-[#282828] cursor-pointer"
          >
            <img
              id="PROFILE"
              src={
                image === ""
                  ? User.avatar === ""
                    ? "/images/profile.png"
                    : User.avatar
                  : image
              }
              alt="profile"
              className="sm:max-2xl:h-28 sm:max-2xl:w-28 h-[18vh] w-[9vw] rounded-full"
            />
            {edit === true && (
              <span
                id="CAMERA_SVG"
                className="max-sm:mt-20 max-sm:ml-20 sm:max-2xl:mt-24 sm:max-2xl:ml-28 mt-28 ml-32 flex justify-center items-center h-10 w-10 rounded-full absolute bg-[#101010ca]"
              >
                <label htmlFor="IMAGEUPLOAD" className="cursor-pointer">
                  <Camera />
                </label>
                <input
                  id="IMAGEUPLOAD"
                  type="file"
                  accept="image/*"
                  onChange={imageUpload}
                  className="hidden"
                />
              </span>
            )}
          </div>
          <div className="text-2xl text-white">{User.username}</div>
          <div className="text-2xl text-[#888888]">{User.email}</div>
          <div className="flex gap-5">
            <button
              onClick={() => setEdit(!edit)}
              className="mt-10 rounded-md p-1 text-white cursor-pointer"
              style={{
                boxShadow: "3px 3px 6px #000000, -2px -2px 6px #484848fb",
              }}
            >
              Edit profile
            </button>
            <button
              onClick={updateProfile}
              className="mt-10 rounded-md p-1 text-white cursor-pointer"
              style={{
                boxShadow: "3px 3px 6px #000000, -2px -2px 6px #484848fb",
              }}
            >
              Update
            </button>
          </div>

          <section className="flex gap-10 mt-40 ">
            <button
              onClick={deleteAccount}
              className="text-red-500 rounded-md p-2 cursor-pointer"
              style={{
                boxShadow: "3px 3px 6px #000000, -2px -2px 6px #484848fb",
              }}
            >
              Delete account
            </button>
            <span className="flex gap-2 text-2xl text-white justify-center items-center">
              <LogOutbtn />
              Logout
            </span>
          </section>
        </div>
      </div>
    </>
  );
};
export default Profile;
