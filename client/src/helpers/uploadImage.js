import axios from "axios";

const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/auto/upload`

async function uploadImage(file) {
  const formData = new FormData();
  formData.append("file", file)
  formData.append("upload_preset", "chat_app")

  const response = await axios.post(url, formData)

  return response;
}

export default uploadImage