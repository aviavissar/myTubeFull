import axios1 from "axios";
let axios = axios1.default;

const KEY = "AIzaSyBjCR--vSQ75wgxc05OlVZVQP5hsz8Qt0w";
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZThmYjFkMThjNmM0MjM0Yzg4MGMyNyIsImlhdCI6MTU5MjUxNTQwOH0.QKGwL9AFIHZuHUZlpUvw8N4e91geQ3iAwwLlIV8LHok";



// export const fetchYouTube = async (term) => {
//   return await fetch(
//     "https://www.googleapis.com/youtube/v3/search?key=AIzaSyBjCR--vSQ75wgxc05OlVZVQP5hsz8Qt0w&part=snippet&maxResults=20"
//   )
//     .then((resp) => resp.json())
//     .then((resp) => {
//       console.log(resp);
//     });
// };

export const login = async (email, password) => {
  try {
    console.log(email + "," + password);
    const response = await axios.post(
      "/users/login",
      { email, password },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.status === 200) {
      if (response.data === 400) {
        return new Error("Unable to find your mail please sign in");
      } else if (response.data === 401) {
        return new Error("wrong password try again");
      }
      token = response.data.token;
      return response;
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const logout = async (userToken) => {
  try {
    const response = await axios.post(
      "/users/logout",
      {},
      {
        headers: {
          Authorization: userToken,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(" client error" + error);
  }
};

export const createUser = async (email, password, fname, lname) => {
  console.log("createftch");
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios({
      method: "post",
      url: "/users",
      headers: {},
      data: {
        fname,
        lname,
        email,
        password,
      },
    }).catch((e) => {
      console.log("error", e.response);
      if (e.response.data.code === 11000) {
        throw new Error("this email already exist");
      }
    });
    console.log("createftch", response);
    return response;
  } catch (error) {
    console.log("createftcherr", error.message);
    throw error;
  }
};

export const updateProfile = async (profile, userToken) => {
  const { password, fname='my defaultName', lname } = profile;
  try {
    console.log("response", profile);
    const response = await axios({
      method: "patch",
      url: "/users/me",
      data: {
        fname,
        lname,
               password,
      },
      headers: {
        Authorization: userToken,
      },
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error(" client error");
  }
};

/****catagories */
export const getCatagories = async (userToken) => {
  try {
    const response = await axios({
      method: "get",
      url: "/catagories",
      headers: {
        Authorization: userToken,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createCategory = async (userToken, category) => {
  try {
    const response = await axios({
      method: "post",
      url: "/catagories",
      headers: {
                "Content-Type": "application/json; charset=utf-8",
        Authorization: userToken,
      },
      data: category,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const updateCategory = async (editCat, userToken) => {
  console.log(editCat);
  const { _id, cat_name, videos } = editCat;
  try {
    console.log("response", editCat);
    const response = await axios({
      method: "patch",
      url: `/catagories/${_id}`,
      data: {
        cat_name,
        videos,
      },
      headers: {
        Authorization: userToken,
      },
    });
    return response.data;
  } catch (error) {
    console.error(" claint error");
  }
};

export const deleteCategory = async (userToken, id) => {
  try {
    await axios.delete(`/catagories/${id}`, {
      headers: {
        Authorization: userToken,
      },
    });
  } catch (error) {
    console.error(" exios claint error" + error);
  }
};

export const createList = async (userToken, catagories) => {
  try {
    const response = await axios({
      method: "post",
      url: "/catagories/list",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: userToken,
      },
      data: catagories,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};
