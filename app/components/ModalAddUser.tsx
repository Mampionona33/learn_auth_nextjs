import CustomModal from "@components/CustomModal";
import CustomModal_1 from "@components/CustomModal_1";

const FormAddUser = () => {
  return (
    <>
      <div className="row g-3">
        <div className="col-md-6">
          <label htmlFor="name" className="visually-hidden">
            name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Name"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="lastname" className="visually-hidden">
            lastname
          </label>
          <input
            type="text"
            className="form-control"
            id="lastname"
            placeholder="Lastname"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="username" className="visually-hidden">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Username"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="password" className="visually-hidden">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="email" className="visually-hidden">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Email"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="phone" className="visually-hidden">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            placeholder="Phone"
          />
        </div>
        <div className="col-md-6">{/*placeholder liste groupe*/}</div>
      </div>
    </>
  );
};

const fields = [
  { type: "text", id: "name", placeholder: "Name", required: true },
  { type: "text", id: "username", placeholder: "Username", required: true },
  { type: "password", id: "password", placeholder: "Password", required: true },
  { type: "email", id: "email", placeholder: "Email" },
  { type: "text", id: "phone", placeholder: "Phone" },
  {
    type: "select",
    id: "groupe",
    placeholder: "Groupe",
    options: ["admin", "responsable", "student"],
  },
  {
    type: "radio",
    name: "sex",
    id: "sex",
    placeholder: "Sex",
    options: ["Male", "female"],
  },
];

const ModalAddUser = () => {
  return (
    <>
      {/*<CustomModal title="Ajout utilisateur" body={<FormAddUser/>} id="modaAddUser" />*/}
      <CustomModal_1
        title="Ajout utilisateur"
        fields={fields}
        id="modaAddUser"
      />
    </>
  );
};

export default ModalAddUser;
