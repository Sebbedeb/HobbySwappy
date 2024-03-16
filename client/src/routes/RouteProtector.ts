import { useNavigate } from "react-router-dom";

function RouteProtector() {
  const navigate = useNavigate();
  // Get the token from local storage
  const token = localStorage.getItem("token");

  // Check if the user is authenticated
  if (!token) {
    // If not authenticated, redirect to the login page
    navigate("/login");
  }
}

export default RouteProtector;