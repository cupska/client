import axios from "axios";

export default async function checkUsernameAvalability(username = ""): Promise<{
  username: { isExist: boolean };
}> {
  try {
    const res = await axios.get(
      import.meta.env.VITE_API_URL + "/user/check/" + username
    );
    return res.data.data;
  } catch (err) {
    throw new Error("telah terjadi kesalahan");
  }
}
