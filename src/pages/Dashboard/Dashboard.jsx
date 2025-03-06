import React from "react";
import DeliveriesTable from "../../components/tables/DeliviriesTable/DeliveriesTable";
import Layout from "../Layout/Layout";
import deliveryStore from "../../stores/DeliveryStore";

const Dashboard = () => {
  return (
    <Layout>
      <DeliveriesTable />
    </Layout>
  );
};

export default Dashboard;
