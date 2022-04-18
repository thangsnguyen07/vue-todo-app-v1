import login from "./modules/login";
import register from "./modules/register";
import logout from "./modules/logout";

export default {
  namespaced: true,
  modules: {
    login,
    register,
    logout,
  },
};
