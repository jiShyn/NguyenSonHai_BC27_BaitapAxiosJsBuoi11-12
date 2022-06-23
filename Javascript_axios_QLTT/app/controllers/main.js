const managerUser = new ManagerUser();

main();

//hàm main tự động chạy để render ra giao diện data từ API
function main() {
   apiGetUsers()
      .then((result) => {
         let users = result.data;

         //duyệt mảng với mỗi user ta tạo thành 1 đối tượng mới để có method (data ở API ko có method)
         users.forEach((user) => {
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
						managerUser.addUser(user)
         });

				 users = managerUser.users

				 console.log("users: ", managerUser.users);
				 console.log("managerUser: ", managerUser);

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

// Hàm add User
// document
//    .getElementById("btnThemNguoiDung")
//    .addEventListener("click", (event) => {
//       document.querySelector(".modal-title").innerHTML = "THÊM NGƯỜI DÙNG";
//       document.querySelector(".modal-footer").innerHTML = `
// 		<button class="btn btn-success" data-type='add'>Thêm</button>
// 		<button class="btn btn-warning" data-dismiss="modal">Đóng</button>
// 	`;

//       const taiKhoan = document.getElementById("TaiKhoan").value;
//       const hoTen = document.getElementById("HoTen").value;
//       const matKhau = document.getElementById("MatKhau").value;
//       const email = document.getElementById("Email").value;
//       const hinhAnh = document.getElementById("HinhAnh").value;
//       const loaiND = document.getElementById("loaiNguoiDung").value;
//       const ngonNgu = document.getElementById("loaiNgonNgu").value;
//       const moTa = document.getElementById("MoTa").value;

//       const user = new User(
//          null,
//          taiKhoan,
//          hoTen,
//          matKhau,
//          email,
//          loaiND,
//          ngonNgu,
//          moTa,
//          hinhAnh
//       );

//       // Hàm add User
//       document
//          .querySelector(".modal-footer")
//          .addEventListener("click", (event) => {
//             const type = event.target.getAttribute("data-type");

//             switch (type) {
//                case "add":
//                   console.log("Users from ManagerUser: ", managerUser);
//                   managerUser.addUser(user);

//                   break;

//                default:
//                   break;
//             }
//          });
//    });
