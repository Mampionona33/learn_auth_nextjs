import CustomModal from "@components/CustomModal";
import CustomModal_2 from "@components/CustomModal_2";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../hook/store";
import { fetchUsers } from "../store/users/userActions";


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
  { type: "text", id: "firstname", placeholder: "Firstname", required: true },
  { type: "text", id: "lastname", placeholder: "Lastname", required: true },
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
  {
    type: "checkbox",
    id: "subscribe",
    placeholder: "Subscribe to newsletter",
  },
];

const postData = (data) => {
  if (data) {
    // console.log("test", data);
    axios
      .post("/api/users", {
        username: data.username,
        password: data.password,
        email: data.email,
        phone: data.phone,
        firstname: data.firstname,
        lastname: data.lastname
      })
      .then(function (resp) {
        const users = resp.data.users

        // il faut créer un action synchrone dans store
        // pour remplacer la valeur de userList
        console.log("ModalAddUser:", users);
        
      })
      .catch(function (err) {
        console.log(err);
      });
  }
};

const ModalAddUser = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      {/*<CustomModal title="Ajout utilisateur" body={<FormAddUser/>} id="modaAddUser" />*/}
      <CustomModal_2
        title="Ajout utilisateur"
        fields={fields}
        id="modaAddUser"
        labelButtonShow="Ajout"
        handleSubmit={(formData) => postData( formData)}
      />
    </>
  );
};

export default ModalAddUser;
