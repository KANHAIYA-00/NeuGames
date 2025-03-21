const ValidateUsername = (username) => {
  if (!username) {
    return "Username is required !";
  } else if (username.length < 3) {
    return "Username must be at least 3 characters long.";
  } else if (username.length > 20) {
    return "Username must be less than 20 characters.";
  } else return null;
};
const ValidateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return "Email is required !";
  } else if (!regex.test(email)) {
    return "Invalid email address.";
  } else return null;
};
const ValidatePassword = (password) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_])[A-Za-z\d!@#$%^&*(),.?":{}|<>_]{8,}$/;
  if (!password) {
    return "Password is required !";
  } else if (!regex.test(password)) {
    return "Password must contain 8 characters including at least one Uppercase, Lowercase, Digit and Special character.";
  } else return null;
};
export { ValidatePassword, ValidateEmail, ValidateUsername };
