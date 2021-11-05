const userLogout = () => {
  return (dispatch) => {
    dispatch(logoutUser());
  };
};
const logoutUser = () => ({
  type: "LOGOUT_ACTION",
  payload: {},
});
export default userLogout;
