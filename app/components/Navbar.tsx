import { signIn, signOut, useSession } from "next-auth/react";
import { ActionTypes, useAppContext } from "../context/AppContext";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [isLoading, setLoading] = useState(true);
  const { appState } = useAppContext();

  const handleLogout = () => {
    signOut();
  };

  if (!session?.user) return null;

  return (
    <>
      <nav className="navbar bg-primary z-50 sticky-top" data-bs-theme="dark">
        <div className="container-fluid d-flex align-middle">
          <p className="text-white m-0">{session?.user!.email}</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            type="button"
            onClick={handleLogout}
          >
            sign out
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
