
import CustomModal from "@components/CustomModal";
import { useAppDispatch, useAppSelector } from "../hook/store";
import axios from "axios";
import { fetchUsers } from "../store/users/userActions";


const deleteUser = (id,dispatch) =>{
	axios.delete(`/api/users/${id}`).then(function(resp){
		dispatch(fetchUsers());
	}).catch(function(err){
		console.log(err);
	})
}

const ModalDeleteUser =({id})=>{
	const dispatch = useAppDispatch();
	
	return(
		<>
			<CustomModal
	          body={<div className="flex justify-center">Êtes-vous sûr de vouloir supprimer cet utilisateur ?</div>}
	          title="Supprimer utilisateur"
	          id="modalDeleteUser"
	          labelButtonShow="Supprimer"
	          variantButtonShow="danger"
	          handleSubmit={(formData) => deleteUser(id, dispatch)}
	        />
		</>
	);
}

export default ModalDeleteUser;