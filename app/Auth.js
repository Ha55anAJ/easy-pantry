// components/withAuth.js
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/router";
import { useEffect } from "react";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push("/login");
      }
    }, [user, loading]);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (user) {
      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export default withAuth;