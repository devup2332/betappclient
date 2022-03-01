import React from "react";
import HeaderAdmin from "../../components/moleculas/headerAdmin";
import ProfileUserContainer from "../../containers/ProfileUserContainer";
import withAuth from "../../hoocs/withAuth";
import BaseAdmin from "../../layouts/baseAdmin";

const ProfilePage = () => {
    return (
        <BaseAdmin section="Perfil" header={<HeaderAdmin section="Perfil" />}>
            <ProfileUserContainer />
        </BaseAdmin>
    );
};

export default withAuth(ProfilePage);
