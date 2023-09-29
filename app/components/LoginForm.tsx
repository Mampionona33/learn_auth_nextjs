const LoginForm = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="shadow p-3 rounded">
        <form className="flex items-center flex-col gap-1">
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text">Username</span>
            <input
              className="form-control"
              type="text"
              name="username"
              id="username"
              required
            />
          </div>
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text">Password</span>
            <input
              className="form-control"
              type="password"
              name="password"
              id="password"
              required
            />
          </div>
          <input className="btn btn-primary" type="submit" value="Sign In" />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
