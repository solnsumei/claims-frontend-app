import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../providers/auth';


const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  const { login } = useAuth();
  const history = useHistory();


  const loginUser = async (data) => {
    console.log(data);
    await login(data);
     history.push("/");
  }

  return (
    <div className="account-page">
      <div className="main-wrapper">
        <div className="account-content">
          <div className="container">
            <div className="account-logo">
              <Link to="/"><h3>Claims Management App</h3></Link>
            </div>					
            <div className="account-box">
              <div className="account-wrapper">
                <h3 className="account-title">Login</h3>
                <p className="account-subtitle">Access to our dashboard</p>
                <form onSubmit={handleSubmit(loginUser)}>
                  <div className="form-group">
                    <label>Username</label>
                    <input
                      className="form-control"
                      type="text"
                      name="username"
                      ref={register({ required: 'This field is required' })}
                    />
                    {errors.username && <p className="text-danger">{errors.username.message}</p>}
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col">
                        <label>Password</label>
                      </div>
                      <div className="col-auto">
                        <Link className="text-muted" to="/forgot-password">
                          Forgot password?
                        </Link>
                      </div>
                    </div>
                    <input
                      className="form-control"
                      type="password"
                      name="password"
                      ref={register({ required: 'This field is required' })}
                    />
                    {errors.password && <p className="text-danger">{errors.password.message}</p>}
                  </div>
                  <div className="form-group text-center">
                    <button className="btn btn-primary account-btn" type="submit">Login</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default Login;