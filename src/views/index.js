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

  async loginAdmin(username, password) {
    let response = await Service.post("/admin", {
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
  async sendFormToBackend(formData) {
    try {
      let route;
      switch (formData.type) {
        case 'bazen':
          route = '/bazen';
          break;
        case 'apartman':
          route = '/apartman';
          break;
        case 'studio':
          route = '/studio';
          break;
        case 'dvoriste':
          route = '/dvoriste';
          break;
        case 'igraonica':
          route = '/igraonica';
          break;
        default:
          throw new Error('Unsupported form type');
      }
  
      let response = await Service.post(route, formData);
      return response.data;
    } catch (error) {
      console.error("Error sending form data to backend:", error);
      throw new Error("Error sending form data to backend");
    }
  },

  async getFromBackend(route) {
    try {
      let response = await Service.get(route);
      return response.data;
    } catch (error) {
      console.error("Error getting data from backend:", error);
      throw new Error("Error getting data from backend");
    }
  },
};

export { Service, Auth };
