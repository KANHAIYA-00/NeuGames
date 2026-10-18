const fetchUser = async () => {
  console.log("hello");
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}api/user`, {
      method: "GET",
      credentials: "include",
    });
    console.log("hello2");
    const data = await response.json();
    if (response.ok) {
      return data;
    }
  } catch (error) {
    console.error("Error:", error);
    window.location.href = "/Login";
  }
};
export default fetchUser;
