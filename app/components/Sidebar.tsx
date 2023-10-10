"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useAppSelector } from "../hook/store";

const Sidebar = () => {
  const { data: session, status } = useSession();
  const [isLoading, setLoading] = useState(true);
  const { appState } = useAppContext();
  const userLogged =  useAppSelector((state)=>state.userLogged);

  useEffect(() => {
    let mount = true;

    if (userLogged.generalInfo) {
      setLoading(false);
    }

    return () => {
      mount = false;
    };
  }, [userLogged.generalInfo]);


  return (
    <>
      {userLogged.generalInfo && !isLoading  ? (
        <div className="d-flex flex-col bg-zinc-300 flex-md-nowrap p-0 shadow h-[40rem]">
          <div className="sidebar  block">
            <div className="sidebar-sticky">
              <ul className="nav flex-column text-capitalize">
                <li className="nav-item pl-1 hover:bg-slate-600">
                  <Link
                    className=" text-decoration-none  text-dark d-block hover:text-white-important py-2.5"
                    href="/dashboard"
                  >
                    dashboard
                  </Link>
                </li>
                <li className="nav-item pl-1 hover:bg-slate-600">
                  <Link
                    className="text-decoration-none  text-dark d-block hover:text-white-important py-2.5	"
                    href="/users"
                  >
                    utilisateur
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Sidebar;
