import { useGoogleAuth } from 'src/contexts/GoogleAuthContext/GoogleAuthContext';

const AuthComponent = () => {
  const { login, logout, authenticated, currentUser } = useGoogleAuth();

  const loginHandler = async () => await login();
  const logoutHandler = async () => await logout();

  return (
    <div>
      {authenticated ? (
        <div>
          <button
            className="bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded"
            onClick={logoutHandler}
          >
            Sign out
          </button>
          <div className="mt-4">
            <span className="font-semibold">
              Logged in as {currentUser.email}
            </span>
          </div>
        </div>
      ) : (
        <button
          className="bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded"
          onClick={loginHandler}
        >
          Sign in with Google
        </button>
      )}
    </div>
  );
};

export default AuthComponent;
