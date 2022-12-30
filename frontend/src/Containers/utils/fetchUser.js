import axios from "../../api";

async function fetchUser(id, loginUser) {
  await axios
    .get("/user/" + id)
    .catch((e) => {
      console.log(e);
    })
    .then((res) => {
      if (res !== undefined) {
        loginUser(res.data.user);
      }
    });
}

export default fetchUser;
