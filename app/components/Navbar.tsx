import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const handleLogout = () => {
    signOut();
  };
  return (
    <>
      <nav className="navbar bg-primary " data-bs-theme="dark">
        {session ? (
          <div className="container-fluid d-flex align-middle">
            <p className="text-white m-0">{session.user!.email}</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
              type="button"
              onClick={handleLogout}
            >
              sign out
            </button>
          </div>
        ) : null}
      </nav>
    </>
  );
};

export default Navbar;
