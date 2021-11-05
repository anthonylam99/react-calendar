import axios from "axios";
import { useHistory } from "react-router";
import { LOGIN_ACTION } from "./types";

const userLogin = (data) => {
  return (dispatch) => {
    dispatch(loginUser(data));
  };
};
const loginUser = (userObj) => ({
  type: "LOGIN_ACTION",
  payload: {
    isAuthenticated: true,
    username: userObj.data.user.name
  },
});
export default userLogin;
