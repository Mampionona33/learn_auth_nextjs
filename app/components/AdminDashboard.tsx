import Card from "./Card";

const AdminDashboard = () => {
  return (
    <>
      <div>Admin dashboard</div>
      <Card
          title="User"
          body="list utilisateurs"
          link="/users"
          icon="supervised_user_circle"
        />
    </>
  );
};

export default AdminDashboard;
