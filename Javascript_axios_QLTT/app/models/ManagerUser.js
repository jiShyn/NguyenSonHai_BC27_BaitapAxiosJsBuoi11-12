class ManagerUser {
	constructor() {
		this.users = []
	}

	//method add user
	addUser(user) {
		this.users.push(user)
	}
	
	//method delete user
	deleteUser(userID) {
		const index = this.users.findIndex((user) => {
			return user.id === userID
		})

		this.users.splice(index,1)
	}
}