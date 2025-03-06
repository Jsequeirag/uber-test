import { React, useState } from "react";
import BranchesTable from "../../components/tables/BranchTable/BranchesTable";
import Layout from "../Layout/Layout";
import BranchForm from "../../components/forms/BranchForms/BranchForm";

const Branches = () => {
  return (
    <Layout>
      <h3 className="flextext-xl/tight text-dark  py-8">
        <span className="p-7 font-semibold text-xl/tight">Sucursales </span>
      </h3>
      <div className="flex justify-center desktop:items-start desktop:flex-row  laptop:flex-col-reverse tablet:flex-col-reverse  phone:flex-col-reverse">
        {/*<BranchForm />*/}
        {<BranchesTable />}
      </div>
    </Layout>
  );
};

export default Branches;
