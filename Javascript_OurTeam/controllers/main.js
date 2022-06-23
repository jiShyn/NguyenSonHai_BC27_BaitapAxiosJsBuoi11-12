main()

function main() {
	apiGetUsers().then((result) => {
		const users = result.data
		console.log(users);
		// users.forEach((user) => {
		// 	user = new User(user.id,
		// 		user.taiKhoan,
		// 		user.hoTen,
		// 		user.matKhau,
		// 		user.email,
		// 		user.loaiND,
		// 		user.ngonNgu,
		// 		user.moTa,
		// 		user.hinhAnh,)
		// })

		for (var i = 0; i < users.length; i++) {
			var user = users[i];
			users[i] = new User(
				user.id,
				user.taiKhoan,
				user.hoTen,
				user.matKhau,
				user.email,
				user.loaiND,
				user.ngonNgu,
				user.moTa,
				user.hinhAnh
			);
	}

		console.log(users);
		users.apiGetUsers()
	})


}