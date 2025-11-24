export default {
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  create: import.meta.env.VITE_CREATE,
  login: import.meta.env.VITE_LOGIN,
  logout: import.meta.env.VITE_LOGOUT,
};
