import Card from "./Card";

const ResponsableDashboard = () => {
  return (
    <>
      <div>Responable dashboard</div>
        <Card
          title="User"
          body="list utilisateurs"
          link="/users"
          icon="supervised_user_circle"
        />
    </>
  );
};

export default ResponsableDashboard;
