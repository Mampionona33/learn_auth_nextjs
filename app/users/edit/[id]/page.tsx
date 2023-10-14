"use client"

const UserEditById = ({params}) => {
	return (
		<>
			<div>
				<div>Modifier Utilisateur</div>
				<div>Id utilisateur: {params.id}</div>
			</div>
		</>
	)
}

export default UserEditById;