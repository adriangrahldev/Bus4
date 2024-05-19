import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const AdminRoute = ({ children, redirectPath = "/login" }) => {
  const { user } = useContext(UserContext);

  return (
    <>
      {user && user.role === "admin" ? (
        children
      ) : (
        <Navigate to={redirectPath} replace />
      )}
    </>
  );
};

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirectPath: PropTypes.string,
};

export default AdminRoute;
