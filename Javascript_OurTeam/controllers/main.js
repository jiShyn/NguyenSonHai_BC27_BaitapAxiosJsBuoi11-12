main();

function main() {
   apiGetUsers()
      .then((result) => {
         const users = result.data;

         display(users);
      })
      .catch((error) => {
         console.log(error);
      });
}

// hàm hiền thị động danh sách GV ra giao diện
function display(users) {
   let html = "";
   users.forEach((user) => {
      if (user.loaiND === "GV") {
         html += /*html */ `
			<div class="col-12 col-sm-6 col-lg-3 mb-sm-3 mb-lg-5">
                        <div
                           class="card animate__animated animate__bounceInLeft wow"
                        >
                           <div class="wrapper-img">
													 <img
													 src="${user.hinhAnh}"
                                 alt=""
                                 class="img-fluid d-block"
																 />
																 </div>
																 <div class="card-body">
																 <h4 class="card-country">${user.ngonNgu}</h4>
																 <p class="card-name">${user.hoTen}</p>
																 <p class="card-text">
                                 ${user.moTa}
																 </p>
																 </div>
																 </div>
																 </div>
																 `;
      }
   });

	 document.querySelector('.js-row').innerHTML = html
}
