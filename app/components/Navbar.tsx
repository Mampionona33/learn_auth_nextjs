import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const handleLogout = () => {
    signOut();
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        {session ? (
          <div className="container-fluid">
            <p>{session.user!.email}</p>
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
