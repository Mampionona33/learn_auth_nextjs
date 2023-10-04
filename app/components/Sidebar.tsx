"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

const Sidebar = () => {
  const { data: session, status } = useSession();
  const [isLoading, setLoading] = useState(true);
  const { appState } = useAppContext();

  useEffect(() => {
    let mount = true;

    if (appState.user) {
      setLoading(false);
    }

    return () => {
      mount = false;
    };
  }, [appState]);

  return (
    <>
      {session && !isLoading ? (
        // <div className="col-md-2 d-none d-md-block bg-light flex flex-col p-0 fixed top-0 ">
        <div className="bg-light flex-md-nowrap p-0 shadow">
          <div className="sidebar pt-6 block">
            <div className="sidebar-sticky">
              <ul className="nav flex-column">
                <li className="nav-item pl-1">
                  <Link href="/dashboard">dashboard</Link>
                </li>
                <li className="nav-item pl-1">
                  <Link href="/users">utilisateur</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : // </div>
      null}
    </>
  );
};

export default Sidebar;
