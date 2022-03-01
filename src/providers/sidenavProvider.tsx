import { createContext, useContext, useState, Context, useEffect } from "react";

interface SidenavProviderProps {
  children: JSX.Element;
}

interface SidenavContext extends Context<SidenavContext> {
  openNav: boolean;
  setOpenNav: Function;
}
const Context = createContext({});

export const useSideNav = () => {
  const context = useContext(Context);

  return context as SidenavContext;
};

const SidenvProvider = ({ children }: SidenavProviderProps) => {
  const [openNav, setOpenNav] = useState(false);
  useEffect(() => {
    setOpenNav(false);
  }, []);
  return <Context.Provider value={{ openNav, setOpenNav }}>{children}</Context.Provider>;
};

export default SidenvProvider;
