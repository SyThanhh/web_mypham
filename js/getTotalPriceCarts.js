document.addEventListener('DOMContentLoaded', function () {
    clickAddProducts()
    // Đặt tất cả mã JavaScript của bạn ở đây
    const addProducts = document.getElementById('product-addtocart-button');
    addProducts.addEventListener('click', function() {
        clickAddProducts();
    });

    
    function clickAddProducts() {
        const cartData = JSON.parse(localStorage.getItem('cartItems'));
        const totalPriceCart = document.querySelector('.total-price');
    
        let totalPrice = 0;
        for (const key in cartData) {
            if (cartData.hasOwnProperty(key)) {
                const product = cartData[key];
    
                // Chuyển đổi giá từ chuỗi sang số nguyên
                // Loại bỏ ký tự không phải số
                
                const price = parseInt(product.price.replace(/\D+/g, '')); 
                let formattedPrice = product.price.toLocaleString();
    
    
                const total = price * product.quantity;
                totalPrice += total;
    
                
                totalPriceCart.textContent = totalPrice.toLocaleString() + " ₫";
            }
        }
    }
});


