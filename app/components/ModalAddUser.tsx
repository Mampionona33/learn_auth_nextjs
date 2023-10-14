import CustomModal from "@components/CustomModal";


const FormAddUser = ( ) =>{
	return(
		<>
		<div className="row g-3">
			<div className="col-auto">
				<label className="visually-hidden" for="username">username</label>
				<input type="text" className="form-control" id="username" placeholder="username"/>
			</div>
		</div>
		</>
	)
}

const ModalAddUser = () =>{
	return(
		<>
		 <CustomModal title="Ajout utilisateur" body={<FormAddUser/>} id="modaAddUser" />
		</>
	)
}

export default ModalAddUser;