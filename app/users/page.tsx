"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useGetUserLoggedGroupe from "@hook/useGetUserLoggedGroupe";
import { useAppContext } from "@context/AppContext";
import { useAppDispatch, useAppSelector } from "../hook/store";
import { redirect } from "next/navigation";
import { fetchUsers } from "../store/users/userActions";
import CustomTable from "../components/TableUsers";
import { IUser } from "../context/interfaceUser";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import DataTable from "@components/DataTable";
import Pagination from "@components/Pagination";
import ModalAddUser from "@components/ModalAddUser";
import { fields } from "@components/ModalAddUser";
import CustomModal from "@components/CustomModal";

const Users = () => {
  const { appState } = useAppContext();
  const [isLoading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const userLogged = useAppSelector((state) => state.userLogged);
  const userList = useAppSelector((state) => state.userList);
  const dispatch = useAppDispatch();
  const [data, setData] = useState<IUser[]>([]);

  const users: IUser[] = userList.liste ? [userList?.liste].flat() : [];

  const [userData, setUserData] = useState([]);

  const Modaledit = () => {
    const dispatch = useAppDispatch();
    return (
      <>
        <CustomModal
          title="Modifier utilisateur"
          id="modalEdit"
          labelButtonShow="Modifier"
          fields={fields}
          variantButtonShow="info"
        />
      </>
    );
  };

  const columnHelper = createColumnHelper<IUser>();
  const columns = [
    columnHelper.accessor("name.firstname", {
      cell: (info) => info.getValue(),
      header: () => "fistname",
    }),
    columnHelper.accessor("name.lastname", {
      cell: (info) => info.getValue(),
      header: () => "last name",
    }),
    columnHelper.accessor("email", {
      cell: (info) => info.getValue(),
      header: () => "email",
    }),
    columnHelper.accessor("id", {
      header: () => "action",
      cell: (info) => (
        <div className="flex gap-2 justify-center">
          {/* <Link
            className="btn capitalize bg-warning "
            href={`/users/edit/${info.getValue()}`}
          >
            Modifier
          </Link> */}
          <Modaledit />
          <Link
            className="btn capitalize bg-danger text-white"
            href={`/users/delete/${info.getValue()}`}
          >
            Supprimer
          </Link>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const {
    userGroupe,
    loading: loadingUserGroupe,
    error: errorOnLoadingUserGroupe,
  } = useGetUserLoggedGroupe();

  useEffect(() => {
    let mount = true;

    const fetchUserList = async () => {
      try {
        if (users.length <= 0) {
          await dispatch(fetchUsers());
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données utilisateur:",
          error,
        );
      }
    };

    if (mount) {
      fetchUserList();
    }

    return () => {
      mount = false;
    };
  }, [userList, dispatch, users]);

  useEffect(() => {
    let mount = true;

    if (session) {
      setLoading(false);
    }

    return () => {
      mount = false;
    };
  }, [session]);

  // const UserTable = () => {
  //   const headerGroups = table.getHeaderGroups();
  //   const rows = table.getRowModel().rows;

  //   return (
  //     <>
  //       <table className="table table-striped round shadow-sm">
  //         <thead className="table-dark">
  //           {headerGroups.map((headerGroup) => (
  //             <tr key={headerGroup.id}>
  //               {headerGroup.headers.map((header) => (
  //                 <th className="capitalize" key={header.id}>
  //                   {header.isPlaceholder
  //                     ? null
  //                     : flexRender(
  //                         header.column.columnDef.header,
  //                         header.getContext(),
  //                       )}
  //                 </th>
  //               ))}
  //             </tr>
  //           ))}
  //         </thead>
  //         <tbody>
  //           {rows.map((row) => (
  //             <tr key={row.id}>
  //               {row.getVisibleCells().map((cell) => (
  //                 <td key={cell.id}>
  //                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
  //                 </td>
  //               ))}
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </>
  //   );
  // };

  if (errorOnLoadingUserGroupe)
    return <h1>String(errorOnLoadingUserGroupe)</h1>;

  if (userLogged.groupe && userLogged.groupe!.name !== "admin") {
    redirect("/unauthorized");
    return null;
  }

  return (
    <div className="col-md-9 ml-sm-auto col-lg-10 p-4">
      {isLoading || loadingUserGroupe ? (
        <p>Loading...</p>
      ) : userLogged.groupe && userLogged.groupe!.name === "admin" ? (
        <>
          <div className="flex flex-col gap-2">
            <div>
              <h3>User list</h3>
              <div className="flex justify-content-end ">
                {/* <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modaAddUser">Ajouter</button> */}
                <ModalAddUser />
              </div>
            </div>
            {/* <UserTable /> */}
            <DataTable data={users} columns={columns} />
            {/*<Pagination />*/}
          </div>
        </>
      ) : (
        <div className="d-flex">
          <h1>Vous n'êtes pas autorisé à accéder à cette page !</h1>
        </div>
      )}
    </div>
  );
};

export default Users;
