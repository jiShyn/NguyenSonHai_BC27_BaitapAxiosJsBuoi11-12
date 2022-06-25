let usersArray = [];
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

         //biến global usersArray để kiểm tra validation bị trùng tên tài khoàn hay không
         usersArray = users;

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
				<button class="btn btn-primary" data-toggle="modal" data-target="#myModal" data-type='select' data-id='${
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
document.getElementById("btnThemNguoiDung").addEventListener("click", () => {
   document.querySelector(".modal-title").innerHTML = "THÊM NGƯỜI DÙNG";
   document.querySelector(".modal-footer").innerHTML = `
		<button class="btn btn-success" data-type='add'>Thêm</button>
		<button class="btn btn-warning" data-dismiss="modal">Đóng</button>
	`;

   resetForm();
});

// lắng nghe sự kiện ở nút DanhSachNguoiDung/Cập Nhật
document
   .getElementById("DanhSachNguoiDung")
   .addEventListener("click", (event) => {
      const type = event.target.getAttribute("data-type");
      const id = event.target.getAttribute("data-id");

      switch (type) {
         case "select":
            selectUserWithId(id);
            break;
         case "delete":
            deleteUserWithID(id);
            break;
      }
   });

//hàm select user và open Modal
function selectUserWithId(userID) {
   document.querySelector(".modal-title").innerHTML = "CẬP NHẬT NGƯỜI DÙNG";
   document.querySelector(".modal-footer").innerHTML = `
   <button class="btn btn-success" data-type='update'>Cập nhật</button>
   <button class="btn btn-warning" data-dismiss="modal">Đóng</button>
`;

   resetForm();

   apiGetUser(userID)
      .then((result) => {
         const selectedUser = result.data;

         document.getElementById("TaiKhoan").value = selectedUser.taiKhoan;
         document.getElementById("TaiKhoan").disabled = true;
         document.getElementById("UserID").value = selectedUser.id;
         document.getElementById("HoTen").value = selectedUser.hoTen;
         document.getElementById("MatKhau").value = selectedUser.matKhau;
         document.getElementById("Email").value = selectedUser.email;
         document.getElementById("HinhAnh").value = selectedUser.hinhAnh;
         document.getElementById("loaiNguoiDung").value = selectedUser.loaiND;
         document.getElementById("loaiNgonNgu").value = selectedUser.ngonNgu;
         document.getElementById("MoTa").value = selectedUser.moTa;
      })
      .catch((error) => {
         console.log(error);
      });
}

// Hàm xóa user
function deleteUserWithID(userID) {
   apiDeleteUser(userID)
      .then(() => {
         main();
      })
      .catch((error) => {
         console.log(error);
      });
}

//============================================
// Lắng nghe sự kiện click trong modal-footer (Thêm/Cập nhật)
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
   const id = document.getElementById("UserID").value;

   const user = new User(
      id,
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
         let isValid = validation();
         if (!isValid) {
            return;
         }
         addUser(user);
         break;
      }

      case "update": {
         let isValid = validation();
         if (!isValid) {
            return;
         }
         updateUser(user);
         document.getElementById("TaiKhoan").disabled = false;
         console.log('12343432');
         break;
      }
   }
});

//hàm add user vào API
function addUser(user) {
   apiAddUser(user)
      .then(() => {
         main();
         resetForm();
      })
      .catch((error) => {
         console.log(error);
      });
}

// hàm update user lên API
function updateUser(user) {
   apiUpdateUser(user)
      .then(() => {
         main();
         resetForm();
      })
      .catch((error) => {
         console.log(error);
      });
}

//==============================
// Lắng nghe sự kiện 'click' của người dùng vào nút search
document.getElementById("basic-addon2").addEventListener("click", () => {
   const userSearch = document.getElementById("txtSearch").value;
   apiGetUsers(userSearch)
      .then((result) => {
         const userSearch = result.data;
         display(userSearch);
      })
      .catch((error) => {
         console.log(error);
      });
});

//==============================
//hàm xử lý reset form và đóng modal
function resetForm() {
   document.getElementById("TaiKhoan").value = "";
   document.getElementById("HoTen").value = "";
   document.getElementById("MatKhau").value = "";
   document.getElementById("Email").value = "";
   document.getElementById("HinhAnh").value = "";
   document.getElementById("loaiNguoiDung").value = "";
   document.getElementById("loaiNgonNgu").value = "";
   document.getElementById("MoTa").value = "";
   document.getElementById("UserID").value = "";

   document.getElementById("tbTaiKhoan").innerHTML = "";
   document.getElementById("tbHoTen").innerHTML = "";
   document.getElementById("tbMatKhau").innerHTML = "";
   document.getElementById("tbEmail").innerHTML = "";
   document.getElementById("tbHinhAnh").innerHTML = "";
   document.getElementById("tbLoaiNguoiDung").innerHTML = "";
   document.getElementById("tbLoaiNgonNgu").innerHTML = "";
   document.getElementById("tbMoTa").innerHTML = "";

   //đóng modal (vì sử dụng bootstrap nên phải tuân theo cách làm của nó)
   $("#myModal").modal("hide");
}
//==========================
//validation
function validation() {
   const taiKhoan = document.getElementById("TaiKhoan").value;
   const hoTen = document.getElementById("HoTen").value;
   const matKhau = document.getElementById("MatKhau").value;
   const email = document.getElementById("Email").value;
   const hinhAnh = document.getElementById("HinhAnh").value;
   const loaiND = document.getElementById("loaiNguoiDung").value;
   const ngonNgu = document.getElementById("loaiNgonNgu").value;
   const moTa = document.getElementById("MoTa").value;

   let tbTaiKhoan = document.getElementById("tbTaiKhoan");
   let tbHoTen = document.getElementById("tbHoTen");
   let tbMatKhau = document.getElementById("tbMatKhau");
   let tbEmail = document.getElementById("tbEmail");
   let tbHinhAnh = document.getElementById("tbHinhAnh");
   let tbLoaiND = document.getElementById("tbLoaiNguoiDung");
   let tbNgonNgu = document.getElementById("tbLoaiNgonNgu");
   let tbMoTa = document.getElementById("tbMoTa");

   let isValid = true;

   // Kiểm tra tài khoản trùng chỉ chạy ở chức năng ADD USER
   const isDisabled = document.getElementById("TaiKhoan").disabled;

   // Nếu isDisabled = false (có nghĩa là người dùng đang chọn chức năng addUser) thì mới chạy kiểm tra trùng tài khoản hay không.
   if (!isDisabled) {
      // Kiểm tra tài khoản để trống hoặc trùng
      if (taiKhoan === "") {
         isValid = false;
         tbTaiKhoan.innerHTML = `Tên tài khoản không được để trống`;
      } else {
         const index = usersArray.findIndex((user) => {
            return user.taiKhoan === taiKhoan;
         });

         if (index !== -1) {
            isValid = false;
            tbTaiKhoan.innerHTML = `Tên tài khoản đã bị trùng !!!`;
         } else {
            tbTaiKhoan.innerHTML = "";
         }
      }
   }

   //Kiểm tra họ tên ko để trống, ko chứa số và kí tự đặc biệt
   const lettersFullName = /^[a-zA-Z\s]*$/g;
   if (hoTen === "") {
      isValid = false;
      tbHoTen.innerHTML = `Họ và tên không được để trống`;
   } else if (!lettersFullName.test(hoTen)) {
      isValid = false;
      tbHoTen.innerHTML = `Họ và tên không chứa số và ký tự đặc biệt`;
   } else {
      tbHoTen.innerHTML = "";
   }

   // Kiểm tra mật khẩu ko để trống, đúng format có 1 kí tự hoa, 1 kí tự đặc biệt, 1 số, độ dài 6-8 kí tự
   const lettersPassword = new RegExp(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,8}$"
   );
   if (matKhau === "") {
      isValid = false;
      tbMatKhau.innerHTML = `Mật khẩu không được để trống`;
   } else if (!lettersPassword.test(matKhau)) {
      isValid = false;
      tbMatKhau.innerHTML = `Mật khẩu không được để trống, đúng format (có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự 
         số, độ dài 6-8)
         `;
   } else {
      tbMatKhau.innerHTML = "";
   }

   //Kiểm tra email ko để trống và đúng format
   const lettersEmail = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$");
   if (email === "") {
      isValid = false;
      tbEmail.innerHTML = `Email không được để trống`;
   } else if (!lettersEmail.test(email)) {
      isValid = false;
      tbEmail.innerHTML = `Vui lòng nhập đúng format Email`;
   } else {
      tbEmail.innerHTML = "";
   }

   //Kiểm tra hình ảnh ko đc để trống
   if (hinhAnh === "") {
      isValid = false;
      tbHinhAnh.innerHTML = `Url hình ảnh không được để trống.`;
   } else {
      tbHinhAnh.innerHTML = "";
   }

   //Kiểm tra loại người dùng có được chọn không
   if (loaiND !== "GV" && "HV") {
      isValid = false;
      tbLoaiND.innerHTML = `Vui lòng chọn loại người dùng.`;
   } else {
      tbLoaiND.innerHTML = "";
   }

   //Kiểm tra loại ngôn ngữ có được chọn không
   if (ngonNgu === "Chọn ngôn ngữ") {
      isValid = false;
      tbNgonNgu.innerHTML = `Vui lòng chọn loại ngôn ngữ.`;
   } else {
      tbNgonNgu.innerHTML = "";
   }

   //Kiểm tra mô tả không đc để trống, không vượt quá 60 kí tự
   if (moTa === "") {
      isValid = false;
      tbMoTa.innerHTML = `Vui lòng không bỏ trống mô tả.`;
   } else if (moTa.length > 60) {
      isValid = false;
      tbMoTa.innerHTML = `Mô tả không được vượt quá 60 kí tự.`;
   } else {
      tbMoTa.innerHTML = "";
   }

   return isValid;
}
