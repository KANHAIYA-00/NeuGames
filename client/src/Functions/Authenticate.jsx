const Authenticate = async (Navigate, path, e) => {
  e.preventDefault();
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}check`, {
      method: "POST",
      credentials: "include",
    });
    if (response.ok) {
      Navigate(path);
    } else {
      Navigate("/Login");
    }
  } catch (error) {
    console.error(error);
    Navigate("/Login");
  }
};

export default Authenticate;
