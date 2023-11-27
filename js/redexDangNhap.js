$(document).ready(function() {

    const email = $('#email');
    const pass = $('#pass');

    const user = JSON.parse(localStorage.getItem('user')) || {};
    let sdt = user.sdt;
    let password = user.password;
    
    function checkTenDangNhap() {
        let dangNhap = $("#txtDN").val();
        if (dangNhap.trim() == "") {
            $('#errDN').html("(*) Bắt buộc nhập");
            return false;
        } else  if(sdt!= dangNhap) {
            $('#errDN').html("(*) Sdt hoặc email bị sai!");
            return false;
        }
        else {
            $('#errDN').html("");
            return true;
        }
       

    }
    $("#txtDN").blur(function() {
        checkTenDangNhap();
    });

    function checkMK() {
        let MK = $("#txtMK").val();
        if (MK.trim() == "") {
            $('#errMK').html("(*) Bắc buộc nhập");
            return false;
        } else if(password != MK) {
            $('#errDN').html("(*) Sdt hoặc email bị sai!");
            return false;
        } else
        {
            $('#errMK').html("");
            return true;
        }
    }


    $("#txtMK").blur(function() {
        checkMK();
    });


    $('#send2').click(function(event) {
        if(!checkTenDangNhap() && !checkMK()) {
            alert('Tài khoản không chính xác!');
            event.preventDefault(); 
        }
    })
});
