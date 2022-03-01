import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const withAuth = (Component: React.FunctionComponent) => {
  return (props: any) => {
    const router = useRouter();
    const [verify, setVerify] = useState(false);
    useEffect(() => {
      const token = localStorage.getItem("token-api");
      if (!token) {
        setVerify(false);
        router.replace("/login");
        return;
      }
      if (router.pathname === "/dashboard") {
        setVerify(true);
        router.replace("/dashboard/profile");
        return;
      }
      setVerify(true);
    }, []);
    if (verify) return <Component {...props} />;
    return null;
  };
};

export default withAuth;
