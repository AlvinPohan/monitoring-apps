import api from ".";

const ENDPOINT = {
  LOGIN: "login.php",
};

const loginBJB = async (reqData) => {
  try {
    const url = `${ENDPOINT.LOGIN}`;
    const data = {
      email: reqData.email,
      password: reqData.password,
    };

    const response =  api.post(url, data);

    return response;
  } catch (err) {
    throw Error(err);
  }
};

export default loginBJB ;
