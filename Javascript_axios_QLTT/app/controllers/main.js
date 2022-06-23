
main();

//hàm main tự động chạy để render ra giao diện data từ API
function main() {
   apiGetUsers()
      .then((result) => {
         const users = result.data;

         //duyệt mảng với mỗi user ta tạo thành 1 đối tượng mới để có method (data ở API ko có method)
         users.map((user) => {
            user = new User(
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
            return users;
         });

         //sau khi có danh sách users ta gọi hàm display()
         display(users);
      })
      .catch((error) => {
         console.log(error);
      });
}

//hàm display để hiển thị ra giao diện
function display(users) {
   let html = "";
   users.forEach((user, index) => {
      html += /*html*/ `
		<tr>
			<td>${index + 1}</td>
			<td>${user.taiKhoan}</td>
			<td>${user.matKhau}</td>
			<td>${user.hoTen}</td>
			<td>${user.email}</td>
			<td>${user.ngonNgu}</td>
			<td>${user.loaiND}</td>
			<td>
				<button class="btn btn-primary" data-type='select' data-id='${
               user.id
            }'>Cập nhật</button>
				<button class="btn btn-danger" data-type='delete' data-id='${
               user.id
            }'>Xóa</button>
			</td>
		</tr>
		`;
   });

   document.getElementById("tblDanhSachNguoiDung").innerHTML = html;
}

// lắng nghe sự kiện click ở nút Thêm mới
document
   .getElementById("btnThemNguoiDung")
   .addEventListener("click", (event) => {
      document.querySelector(".modal-title").innerHTML = "THÊM NGƯỜI DÙNG";
      document.querySelector(".modal-footer").innerHTML = `
		<button class="btn btn-success" data-type='add'>Thêm</button>
		<button class="btn btn-warning" data-dismiss="modal">Đóng</button>
	`;
   });

// Lắng nghe sự kiện click trong modal-footer
document.querySelector(".modal-footer").addEventListener("click", (event) => {
   const type = event.target.getAttribute("data-type");

   const taiKhoan = document.getElementById("TaiKhoan").value;
   const hoTen = document.getElementById("HoTen").value;
   const matKhau = document.getElementById("MatKhau").value;
   const email = document.getElementById("Email").value;
   const hinhAnh = document.getElementById("HinhAnh").value;
   const loaiND = document.getElementById("loaiNguoiDung").value;
   const ngonNgu = document.getElementById("loaiNgonNgu").value;
   const moTa = document.getElementById("MoTa").value;

   const user = new User(
      null,
      taiKhoan,
      hoTen,
      matKhau,
      email,
      loaiND,
      ngonNgu,
      moTa,
      hinhAnh
   );

   switch (type) {
      case "add": {
         addUser(user);
         break;
      }

			case "update": {
				updateUserAPI(userID);
				break;
			}
   }
});


//hàm add user vào API
function addUser(user) {
   apiAddUser(user)
      .then(() => {
         main();
      })
      .catch((error) => {
         console.log(error);
      });
}
