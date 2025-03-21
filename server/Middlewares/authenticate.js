import jwt from "jsonwebtoken";

const authenticateToken = (req, res) => {
  const token = req.cookies.NeuGames;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;
      return res.status(200).json({ Message: "Access granted." });
    } catch (err) {
      res.status(400).json({ Message: "Authentication failed." });
    }
  } else {
    res.status(401).json({ Message: "Authentication failed." });
  }
};

export default authenticateToken;
