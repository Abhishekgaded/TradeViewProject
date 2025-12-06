import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../../../component/Component/FullAuthenticationSystem/context/AuthContext";
import { useNavigate } from "react-router-dom";

const DashboardLayout = () => {

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ display: "flex" }}>
      <aside style={{ width: "200px", background: "#333", color: "white", padding: "20px" }}>
        <h3>Dashboard</h3>
        <Link to="profile">Profile</Link><br />
        <Link to="settings">Settings</Link>
      </aside>

      <section style={{ padding: "20px", flex: 1 }}>
        <button onClick={handleLogout} >Logout</button>
        <Outlet />
      </section>
    </div>
  );
};

export default DashboardLayout;
