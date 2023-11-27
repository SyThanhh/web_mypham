$(document).ready(function() {
    function checkTenDangNhap() {
        let dangNhap = $("#txtDN").val();
        if (dangNhap.trim() == "") {
            $('#errDN').html("(*) Bắt buộc nhập");
            return false;
        } else {
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
        } else {
            $('#errMK').html("");
            return true;
        }
    }


    $("#txtMK").blur(function() {
        checkMK();
    });

});
