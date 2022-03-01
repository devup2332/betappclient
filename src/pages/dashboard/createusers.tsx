import React from "react";
import HeaderAdmin from "../../components/moleculas/headerAdmin";
import CreateUserContainer from "../../containers/CreateUserContainer";
import withAuth from "../../hoocs/withAuth";
import BaseAdmin from "../../layouts/baseAdmin";

const CreateUserPage = () => {
    return (
        <BaseAdmin
            children={<CreateUserContainer />}
            section="Create User"
            header={<HeaderAdmin section="Crear Usuario" />}
        />
    );
};

export default withAuth(CreateUserPage);
