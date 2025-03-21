import jwt from "jsonwebtoken";

const deleteCookie = (req, res) => {
  const decoded = jwt.verify(req.cookies.NeuGames, process.env.SECRET_KEY);
  if (decoded) {
    try {
      res.clearCookie("NeuGames");
      return res.status(200).json({ Message: "Logout Successfull." });
    } catch (err) {
      res.status(400).json({ Message: "Something Went Wrong" });
    }
  } else {
    res.status(401).json({ Message: "Invalid user." });
  }
};

export default deleteCookie;
