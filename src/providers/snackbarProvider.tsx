import { createContext, Context, useContext, useState } from "react";
import { SnackBar } from "../components/organism";

interface SnackbarProviderProps {
  children: JSX.Element;
}

interface SnackbarContext extends Context<SnackbarProviderProps> {
  openSnack: (state: boolean) => void;
  configMessage: (message: string) => void;
}

const Context = createContext({});

export const useSnackbar = () => {
  const context = useContext(Context);

  return context as SnackbarContext;
};

const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const openSnack = (state: boolean) => {
    setOpen(state);
  };
  const configMessage = (sms: string) => {
    setMessage(sms);
  };
  return (
    <Context.Provider value={{ openSnack, configMessage }}>
      {children}
      <SnackBar message={message} open={open} setOpen={setOpen} />
    </Context.Provider>
  );
};

export default SnackbarProvider;
