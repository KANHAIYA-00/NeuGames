import { Bounce, toast, Slide } from "react-toastify";

const Success = (Message) => {
  toast.success(Message, {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: 0,
    theme: "dark",
    transition: Bounce,
  });
};
const Error = (Message) => {
  toast.error(Message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    theme: "dark",
    transition: Bounce,
  });
};
const Warn = (Message) => {
  toast.error(Message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    theme: "dark",
    transition: Slide,
  });
};
const Info = (Message) => {
  toast.info(Message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: 0,
    theme: "dark",
    transition: Bounce,
  });
};

export { Success, Error, Warn, Info };
