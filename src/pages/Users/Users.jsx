import { React, useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import UsersTable from "../../components/tables/UsersTable/UsersTable";
import UserForm from "../../components/forms/UserForms/UserForm";
const Users = () => {
  const [users, setUsers] = useState([]);

  return (
    <Layout>
      <h3 className="flextext-xl/tight text-dark  py-8">
        <span className="p-7 font-semibold text-xl/tight">Usuarios</span>
      </h3>
      <div className="flex justify-center desktop:items-start desktop:flex-row laptop:flex-col-reverse  tablet:flex-col-reverse phone:flex-col-reverse">
        <UserForm />
        <UsersTable />
      </div>
    </Layout>
  );
};

export default Users;
