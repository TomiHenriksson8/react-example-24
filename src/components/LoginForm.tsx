import { useNavigate } from "react-router-dom";
import {useAuthentication} from "../hooks/apiHooks";
import {useForm} from "../hooks/formHooks";
import {Credentials} from "../types/LocalTypes";

const LoginForm = () => {
  const {postLogin} = useAuthentication();
  const initValues: Credentials = {username: '', password: ''};
  const navigate = useNavigate();

  const doLogin = async () => {
    console.log('submit callback, inputs:', inputs);
    // TODO: use postLogin to authenticate with server
    const loginResult = await postLogin(inputs as Credentials);
    if (loginResult) {
      localStorage.setItem('token', loginResult.token);
      navigate('/');
    }
  }

  const {handleSubmit, handleInputChange, inputs} = useForm(doLogin, initValues);

  return (
    <>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="UserWithLevelname">Username</label>
          <input
            name="username"
            type="text"
            id="UserWithLevelname"
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="loginpassword">Password</label>
          <input
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
