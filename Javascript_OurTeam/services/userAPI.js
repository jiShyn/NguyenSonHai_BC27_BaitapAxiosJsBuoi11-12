const baseURL = "https://6299dac16f8c03a9784b5a5e.mockapi.io/api/Users"

// hàm call API lấy danh sách User
function apiGetUsers() {
	return axios({
		url: baseURL,
		method: "GET",
	})
}

// hàm call API thêm User
// hàm call API xóa User
// hàm call API lấy lấy thông tin chi tiết User
// hàm call API cập nhật User