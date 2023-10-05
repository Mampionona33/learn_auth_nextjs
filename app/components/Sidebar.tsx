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
        <div className="bg-light flex-md-nowrap p-0 shadow min-h-min h-[100rem]">
          <div className="sidebar pt-6 block">
            <div className="sidebar-sticky">
              <ul className="nav flex-column">
                <li className="nav-item pl-1 hover:bg-slate-400 ">
                  <Link
                    className="text-capitalize text-decoration-none text-dark d-block hover:text-white "
                    href="/dashboard"
                  >
                    dashboard
                  </Link>
                </li>
                <li className="nav-item pl-1 hover:bg-slate-400">
                  <Link
                    className="text-capitalize text-decoration-none text-dark d-block"
                    href="/users"
                  >
                    utilisateur
                  </Link>
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
