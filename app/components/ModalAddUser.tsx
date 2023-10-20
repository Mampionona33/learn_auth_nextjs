import CustomModal from "@components/CustomModal";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../hook/store";
import { fetchUsers } from "../store/users/userActions";

export const fields = [
  {
    type: "text",
    id: "firstname",
    placeholder: "Firstname",
    required: true,
  },
  {
    type: "text",
    id: "lastname",
    placeholder: "Lastname",
    required: true,
  },
  {
    type: "text",
    id: "username",
    placeholder: "Username",
    required: true,
  },
  { type: "password", id: "password", placeholder: "Password", required: true },
  { type: "email", id: "email", placeholder: "Email" },
  { type: "text", id: "phone", placeholder: "Phone" },
  {
    type: "select",
    id: "groupe",
    placeholder: "Groupe",
    options: ["admin", "responsable", "student"],
    defaultValue: "responsable",
  },
  {
    type: "radio",
    name: "sex",
    id: "sex",
    placeholder: "Sex",
    options: ["Male", "female"],
    defaultValue: "Male",
  },
  {
    type: "checkbox",
    id: "subscribe",
    placeholder: "Subscribe to newsletter",
    defaultValue: false,
  },
];

const postData = (data, dispatch) => {
  if (data) {
    // console.log("test", data);
    axios
      .post("/api/users", {
        username: data.username,
        password: data.password,
        email: data.email,
        phone: data.phone,
        firstname: data.firstname,
        lastname: data.lastname,
      })
      .then(function (resp) {
        dispatch(fetchUsers());
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
      <CustomModal
        title="Ajout utilisateur"
        fields={fields}
        id="modaAddUser"
        labelButtonShow="Ajout"
        handleSubmit={(formData) => postData(formData, dispatch)}
      />
    </>
  );
};

export default ModalAddUser;
