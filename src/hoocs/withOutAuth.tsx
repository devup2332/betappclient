import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const withOutAuth = (Component: React.FunctionComponent) => {
  return (props: any) => {
    const [verify, setVerify] = useState(false);
    const router = useRouter();
    useEffect(() => {
      const token = localStorage.getItem("token-api");

      if (token) {
        setVerify(true);
        router.replace("/dashboard/profile");
      }
    }, []);

    if (!verify) {
      return <Component {...props} />;
    }
    return null;
  };
};

export default withOutAuth;
