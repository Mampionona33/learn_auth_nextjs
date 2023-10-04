"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Sidebar = () => {
  const { data: session, status } = useSession();
  return (
    <>
      {session ? (
        <div className="col-md-2 d-none d-md-block bg-light flex flex-col p-0 fixed top-0 ">
          <div className="bg-light flex-md-nowrap p-0 shadow h-screen my-8">
            <div className="sidebar pt-6">
              <div className="sidebar-sticky">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <Link href="/dasboard">dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/users">utilisateur</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Sidebar;
