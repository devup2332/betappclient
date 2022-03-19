import React from "react";
import HeaderAdmin from "../../components/moleculas/headerAdmin";
import TablesContainer from "../../containers/TablesContainer";
import withAuth from "../../hoocs/withAuth";
import BaseAdmin from "../../layouts/baseAdmin";

const TablesPage = () => {
  return (
    <BaseAdmin section="Tablas" header={<HeaderAdmin section="Tablas" />}>
      <TablesContainer />
    </BaseAdmin>
  );
};

export default withAuth(TablesPage);
