import axios from "../../api";

async function fetchUser(id, updateUser) {
  await axios
    .get("/user/" + id)
    .catch((e) => {
      console.log(e);
    })
    .then((res) => {
      if (res !== undefined) {
        updateUser(res.data.user);
      }
    });
}

export default fetchUser;
