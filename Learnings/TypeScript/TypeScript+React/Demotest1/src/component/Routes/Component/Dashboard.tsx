import { Outlet, Link } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      <aside style={{ width: "200px", background: "#333", color: "white", padding: "20px" }}>
        <h3>Dashboard</h3>
        <Link to="profile">Profile</Link><br />
        <Link to="settings">Settings</Link>
      </aside>

      <section style={{ padding: "20px", flex: 1 }}>
        <Outlet />
      </section>
    </div>
  );
};

export default DashboardLayout;
