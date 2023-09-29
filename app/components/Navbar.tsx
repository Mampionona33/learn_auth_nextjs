import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const handleLogout = () => {
    signOut();
  };
  return (
    <>
      {session ? (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          type="button"
          onClick={handleLogout}
        >
          sign out
        </button>
      ) : null}
    </>
  );
};

export default Navbar;