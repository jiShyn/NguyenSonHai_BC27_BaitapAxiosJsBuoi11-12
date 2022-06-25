const baseURL = "https://6299dac16f8c03a9784b5a5e.mockapi.io/api/Users";

//hàm call API lấy danh sách người dùng
function apiGetUsers(userSearch) {
   return axios({
      url: baseURL,
      method: "GET",
      params: {
         hoTen: userSearch,
      }
   });
}

//hàm call API thêm người dùng
function apiAddUser(user) {
   return axios({
      url: baseURL,
      method: "POST",
      data: user,
   });
}

//hàm call API xóa người dùng
function apiDeleteUser(userID) {
   return axios({
      url: `${baseURL}/${userID}`,
      method: "DELETE",
   });
}

//hàm call API lấy thông tin chi tiết 1 người dùng với ID
function apiGetUser(userID) {
   return axios({
      url: `${baseURL}/${userID}`,
      method: "GET",
   });
}

//hàm call API cập nhật người dùng
function apiUpdateUser(user) {
   return axios({
      url: `${baseURL}/${user.id}`,
      method: "PUT",
      data: user,
   })
}