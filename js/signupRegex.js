function taoTaiKhoan(){
    let isValid = true;

    //Check fullName
    let hoTen = document.getElementById("txtHoten").value;
    let errorName = document.getElementById("errHoten");
    let tenRegex = /^[A-Z][a-zA-Z]*(?:\s[A-Z][a-zA-Z]*)+$/;
    if(hoTen.trim() === ""){
        errorName.innerHTML = "Họ tên không được để trống!";
        isValid = false;
    }else if(hoTen.trim() !== "" && !tenRegex.test(hoTen)){
        errorName.innerHTML = "Họ tên phải từ hai từ trở lên, mỗi ký tự đầu phải viết hoa!";
        isValid = false;
    }

    //Check email
    let mail = document.getElementById('txtMail').value;
    let errMail = document.getElementById("errMail");
    let regrexMail = /^[a-zA-Z0-9]{3,}@[a-zA-Z]{4,7}.[a-zA-Z]{2,3}$/;
    if(regrexMail.test(mail)){
    }else{
        errMail.innerHTML = 'Email phải nhập theo địng dạng: abc123@gmail.com';
        isValid = false;
    }

    //Check Password
    let pwd = document.getElementById("txtPwd").value;
    let erPwd = document.getElementById("errPwd");
    let regexpassword = /^[A-Za-z0-9!@#$%^&*()_]{8,20}$/;
    if(!regexpassword.test(pwd)){
        erPwd.innerHTML = "Mật khẩu phải từ 8-20 ký tự!";
       isValid = false;
    }

    //Check RePassword
    let rePwd = document.getElementById('txtRePwd').value;
    let errRePwd = document.getElementById("errRePwd");
    if( pwd !== rePwd){
        errRePwd.innerHTML = "Mật khẩu không trùng khớp!";
        isValid = false;
    }

    //Check số điện thoại

    let phone = document.getElementById('txtPhone').value;
    let errPhone = document.getElementById("errPhone");
    let regrexPhone = /^0[3-9]{1}\d{8}$/;
    if(!regrexPhone.test(phone)){
        errPhone.innerHTML = 'Số điện thoại không bao gồm các ký tự là chữ cái, gồm 10 chữ số!';
    }

    //Check tỉnh
    let tinh = document.getElementById('txtTinh').value;
    let errTinh = document.getElementById("errTinh");
    if(tinh.trim() === ""){
        errTinh.innerHTML = "Tỉnh/Thành phố không được để trống!"
    }

    //Check Huyện
    let huyen= document.getElementById('txtHuyen').value;
    let errHuyen = document.getElementById("errHuyen");
    if(huyen.trim() === ""){
        errHuyen.innerHTML = "Quận/Huyện không được để trống!"
    }

    //Check Xã
    let xa = document.getElementById('txtXa').value;
    let errXa = document.getElementById("errXa");
    if(xa.trim() === ""){
        errXa.innerHTML = "Xã/Phường không được để trống!"
    }

    //Check Địa chỉ
    let diaChi = document.getElementById('txtDiaChi').value;
    let errDiaChi = document.getElementById("errDiaChi");
    if(diaChi.trim() === ""){
        errDiaChi.innerHTML = "Quận/Huyện không được để trống!"
    }

    //Check mã bưu chính
    let buuChinh = document.getElementById('txtBuu').value;
    let errBuu = document.getElementById("errBuu");
    if(buuChinh.trim() === ""){
        errBuu.innerHTML = "Quận/Huyện không được để trống!"
    }

    //Check checkbox
    // Lấy đối tượng checkbox bằng ID
    let checkbox = document.getElementById("txtChk");
    let errChk = document.getElementById("errChk");
    // Kiểm tra xem checkbox có được chọn hay không
    if (checkbox.checked) {
    } else {
        errChk.innerHTML = "Vui lòng chọn Tôi đồng ý với Điều khoản và dịch vụ để tiếp tục!";
    }

    if (isValid) {
        $('#myModal').modal('show');
    }

    document.getElementById("closeModalButton").addEventListener("click", function () {
        $('#myModal').modal('hide'); // Close the modal
        resetForm(); // Reset the form fields
    });

    document.getElementById("closeModal").addEventListener("click", function () {
        $('#myModal').modal('hide'); // Close the modal
        resetForm(); // Reset the form fields
    });
}


