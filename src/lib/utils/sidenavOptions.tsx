import { NextRouter } from "next/router";
import {
    IconBall,
    IconDashbaord,
    IconExit,
    IconHome,
    IconPerson,
    IconSearch,
    IconTable,
} from "../../components/atoms/icons";
import IconBell from "../../components/atoms/icons/iconBell";

export const sidenavOptions = [
    {
        label: "Panel de Administracion",
        icon: <IconDashbaord className="text-white fill-current w-5" />,
        actions: () => {},
    },
    {
        label: "Perfil",
        icon: <IconPerson className="text-white stroke-current w-5" />,
        actions: (router: NextRouter) => {
            router.push("/dashboard/profile");
        },
    },
    {
        label: "Inicio",
        icon: <IconHome className="fill-white text-disabledText w-5" />,
        actions: () => {},
    },
    {
        label: "Partidos",
        icon: <IconBall className="text-white stroke-current w-5" />,
        actions: () => {},
    },
    {
        label: "Tablas",
        icon: <IconTable className="text-white fill-current w-5" />,
        actions: (router: NextRouter) => {
            router.push("/dashboard/tables");
        },
    },
    {
        label: "Buscar",
        icon: <IconSearch className="text-white stroke-current w-5" />,
        actions: () => {},
    },
    {
        label: "Notificaciones",
        icon: <IconBell className="text-white fill-current w-5" />,
        actions: () => {},
    },
    {
        label: "Salir",
        icon: <IconExit className="text-danger fill-current w-5" />,
        actions: (router: NextRouter) => {
            localStorage.removeItem("token-api");
            router.push("/login");
        },
    },
];
