import { createContext, useContext, useState, Context, useEffect } from "react";
import { getUser } from "../lib/api/getUser";
import { IUser } from "../lib/models/user";

interface UserProviderProps {
    children: JSX.Element;
}

interface UserProviderContext extends Context<UserProviderContext> {
    user: IUser;
    setToken: Function;
    setUserLogged: Function;
}
const Context = createContext({});

export const useUserLogged = () => {
    const context = useContext(Context);

    return context as UserProviderContext;
};

const UserLoggedProvider = ({ children }: UserProviderProps) => {
    const [userLogged, setUserLogged] = useState();
    const getData = async () => {
        const t = localStorage.getItem("token-api");
        if (!t) return;
        const { user } = await getUser();
        setUserLogged(user);
    };
    useEffect(() => {
        getData();
    }, []);
    return <Context.Provider value={{ user: userLogged, setUserLogged }}>{children}</Context.Provider>;
};

export default UserLoggedProvider;
