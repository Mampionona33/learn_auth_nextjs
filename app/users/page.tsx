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

const Users = () => {
  const { appState } = useAppContext();
  const [isLoading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const userLogged = useAppSelector((state) => state.userLogged);
  const userList = useAppSelector((state) => state.userList);
  const dispatch = useAppDispatch();
  const [data, setData] = useState<IUser[]>([]);

  const users: IUser[] = [userList?.liste?.users].flat();

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
        <Link
          className="btn btn-primary capitalize "
          href={`/users/edit/${info.getValue()}`}
        >
          edit
        </Link>
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
        await dispatch(fetchUsers({ page: 1, limite: 5 }));
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
  }, [userList, dispatch]);

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
          <h3>User list</h3>
          {/* <UserTable /> */}
          <DataTable data={users} columns={columns} />
          <Pagination />
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
