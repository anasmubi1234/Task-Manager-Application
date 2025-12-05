import { useNavigate } from 'react-router-dom';

function Login() {
  const Navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Navigate("/Task");
  }

  return (
    <>
      <div className="login-container">
        <div className="login-form-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>User ID</label>
              <input type="text" placeholder="Enter user id" required />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="Enter password" required />
            </div>
            <button type="submit" className="login-button">Login</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;