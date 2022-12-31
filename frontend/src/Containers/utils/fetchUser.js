// Functions, Utils
import axios from "../../api";

async function fetchUser(id, updateUser, stateFlag) {
  await axios
    .get("/user/" + id)
    .catch((e) => {
      console.log(e);
    })
    .then((res) => {
      if (res !== undefined) {
        updateUser(res.data.user);
        if (stateFlag) {
          stateFlag(true);
        }
      }
    });
}

export default fetchUser;
