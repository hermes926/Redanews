import axios from "../../api";

async function fetchUser(id, loginUser) {
  await axios
    .get("/user/" + id)
    .catch((e) => {
      console.log(e);
    })
    .then((res) => {
      if (res !== undefined) {
        console.log(res.data.user, id);
        loginUser(res.data.user);
      }
    });
}

export default fetchUser;
