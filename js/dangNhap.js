document.addEventListener('DOMContentLoaded', function () {
    const email = document.getElementById('email');
    const pass = document.getElementById('pass');

    const user = JSON.parse(localStorage.getItem('user')) || {};

    if (!user || !user.sdt || !user.password) {
        email.value = '';
        pass.value = '';
    } else {
        email.value = user.sdt;
        pass.value = user.password;
    }

    
});
