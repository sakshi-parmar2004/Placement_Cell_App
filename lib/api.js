import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// - RENDER
const BASE_URL = "https://server-ep92.onrender.com"
// - WIFI
// const BASE_URL = "http://192.168.31.178:5000";
// - MOBILE
// const BASE_URL = "http://192.168.97.109:5000";

export const loginUser = async (id, password) => {
  if (!id || !password) return null;
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      id,
      password,
    });
    if(response.data.status != "success"){
        return null;
    }
    await AsyncStorage.setItem("user", JSON.stringify(response.data.data));
    await AsyncStorage.setItem("token", response.data.token);
    return response.data.status;
  } catch (error) {
    return null;
  }
};

export const registerUser = async ({ name, id, email, password, resume }) => {
  const formData = new FormData();

  formData.append("name", name);
  formData.append("id", id);
  formData.append("email", email);
  formData.append("password", password);

  if (resume) {
    formData.append("resume", {
      uri: resume.uri, // local file path
      type: resume.type || "application/pdf", // MIME type
      name: resume.name || "resume.pdf",
    });
  }

  console.log("form data: ",formData)

  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });      
    // console.log(response.data)
    if(response.data.status != 'success') return null;
    await AsyncStorage.setItem("user", JSON.stringify(response.data.data));
    await AsyncStorage.setItem("token", response.data.token);
    return response.data.status;
  } catch (error) {
    console.error("Registration error:", error);
    return null;
  }
};
