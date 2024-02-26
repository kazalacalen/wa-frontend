import axios from "axios";

let Service = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
});

Service.interceptors.request.use((request) => {
  try {
    request.headers["Authorization"] = "Bearer " + Auth.getToken();
  } catch (e) {
    console.error(e);
  }
  return request;
});

Service.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      Auth.logout();
    }
    return Promise.reject(error);
  }
);

let Auth = {
  async register(username, password) {
    await Service.post("/register", {
      username: username,
      password: password,

    });

    return true;
  },

  async loginPage(username, password) {
    let response = await Service.post("/login", {
      username: username,
      password: password,
    });
    let user = response.data;

    localStorage.setItem("user", JSON.stringify(user));

    return true;
  },
  logout() {
    localStorage.removeItem("user");
  },

  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  },

  getName() {
    let user = JSON.parse(localStorage.getItem("user"));
    return user.name;
  },

  getToken() {
    let user = Auth.getUser();
    if (user && user.token) {
      return user.token;
    } else return false;
  },

  authenticated() {
    let user = Auth.getUser();
    if (user && user.token) {
      return true;
    }
    return false;
  },

  state: {
    get authenticated() {
      return Auth.authenticated();
    },
    get userUsername() {
      let user = Auth.getUser();

      if (user) {
        return user.username;
      }
      return false;
    },
    get userName() {
      let user = Auth.getUser();

      if (user) {
        return user.name;
      }
      return false;
    },
  },
};
export { Service, Auth }; // exportamo Service za ručne pozive ili Posts za
