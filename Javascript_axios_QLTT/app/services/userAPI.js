const baseURL = "https://6299dac16f8c03a9784b5a5e.mockapi.io/api/Users"

//hàm call API lấy danh sách người dùng
function apiGetUsers() {
	return axios({
		url: baseURL,
		method: "GET",
	})
}

//hàm call API thêm người dùng

//hàm call API xóa người dùng

//hàm call API lấy thông tin chi tiết người dùng

//hàm call API cập nhật người dùng