import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../UserProvider/index";
import ajax from "../services/fetchService";
import Loader from "../components/Loader";
import { jwtDecode } from "jwt-decode";


const PrivateRoute = ({ children }) => {
  const user = useUser();
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [decodedJwt, setDecodedJwt] = useState(null);

  useEffect(() => {
    if (user.jwt) {
      ajax(`/api/auth/validate?token=${user.jwt}`, "get", user.jwt)
        .then((isValidated) => {
          const decoded = jwtDecode(user.jwt);
          setDecodedJwt(decoded);
          setIsValid(isValidated);
        })
        .catch(() => {
          setIsValid(false); // Set to false if there’s an error
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setIsValid(false);
    }
  }, [user.jwt]);

  if (isLoading) {
    return <Loader />;
  }

  if (!isValid) {
    return <Navigate to="/" />;
  }

  return decodedJwt?.isdefault ? <Navigate to="/reset_default" /> : children;
};

export default PrivateRoute;

