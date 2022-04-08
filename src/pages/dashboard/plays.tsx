import React from "react";
import HeaderAdmin from "../../components/moleculas/headerAdmin";
import PlaysContainer from "../../containers/PlaysContainer";
import BaseAdmin from "../../layouts/baseAdmin";

const PlaysPage = () => {
  return (
    <BaseAdmin section="Jugadas" header={<HeaderAdmin section="Jugadas" />}>
      <PlaysContainer />
    </BaseAdmin>
  );
};

export default PlaysPage;
