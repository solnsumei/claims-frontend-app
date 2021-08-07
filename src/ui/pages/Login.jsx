import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../providers/auth';
import { loginResolver } from '../../utils/validators';
import Loading from '../components/Loading';


const Login = () => {
  const  [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: loginResolver(),
  });

  const { loginUser } = useAuth();
  const history = useHistory();


  const submitForm = async (data) => {
    try {
      setLoading(true);
      await loginUser(data);
      setLoading(false);
      history.replace("/");
    } catch (e) {
      setLoading(false)
      setError(e.response?.data?.detail);
    }
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
                {error && <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  {error}
								  <button 
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-label="Close"
                    onClick={() => setError(null)}>
                    <span aria-hidden="true">×</span>
                  </button>
                </div>}
                <form onSubmit={handleSubmit(submitForm)}>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      className="form-control"
                      type="email"
                      {...register("email")}
                    />
                    {errors.email && <p className="text-danger">{errors.email.message}</p>}
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
                      {...register("password")}
                    />
                    {errors.password && <p className="text-danger">{errors.password.message}</p>}
                  </div>
                  <div className="form-group text-center">
                    <button className="btn btn-primary account-btn" type="submit">
                      Login
                      {loading && <Loading />}
                    </button>
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