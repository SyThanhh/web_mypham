// Cart
let cartIcon = document.querySelector(".cart-icon");
let cart = document.querySelector(".cart-info");
let cartClose = document.querySelector("#close-cart");


document.addEventListener('mousedown', function (event) {
    const isClickInsideModal = cart.contains(event.target);
    const isClickOnCartIcon = cartIcon.contains(event.target);

    if (!isClickInsideModal && !isClickOnCartIcon && cart.classList.contains('active')) {
        cart.classList.remove('active');
    }
});


//Open cart
cartIcon.onclick = () => {
    cart.classList.add("active");
};

// Close cart
cartClose.addEventListener("click", function () {
    cart.classList.remove("active");
});

class CartItem{
    constructor(name, img, price){
        this.name = name;
        this.img=img;
        this.price = price;
        this.quantity = 1;
   }
}

//Lưu giỏ hàng vào local storage
class LocalCart{
    static key = "cartItems";

    static getLocalCartItems(){
        let cartMap = new Map(); //Tạo map để lưu giỏ hàng
        const cart = localStorage.getItem(LocalCart.key); //Lấy giỏ hàng từ local storage
        if(cart===null || cart.length===0)  
            return cartMap;
        return new Map(Object.entries(JSON.parse(cart))); //Chuyển giỏ hàng từ json sang map
    }

    static addItemToLocalCart(id, item){
        let cart = LocalCart.getLocalCartItems();
        if(cart.has(id)){
            let mapItem = cart.get(id); //Lấy item từ map
            mapItem.quantity +=1;
            cart.set(id, mapItem);
        }
        else{
            //Set số lượng = 1 nếu chưa có trong giỏ hàng
            item.quantity = 1;
            cart.set(id, item);
        }
       localStorage.setItem(LocalCart.key, JSON.stringify(Object.fromEntries(cart)));
       updateCartUI();
        
    }

    static removeItemFromCart(id){
        let cart = LocalCart.getLocalCartItems();
        if(cart.has(id)){
            let mapItem = cart.get(id);
            if(mapItem.quantity>1){
                cart.delete(id);
        }else{
            cart.delete(id);
        }
        
        } 
        if (cart.length===0){
            localStorage.clear();
        }
        
        else{
            localStorage.setItem(LocalCart.key,  JSON.stringify(Object.fromEntries(cart)));
            updateCartUI();
        }        
    }

}


const cartIconElement = document.querySelector('.cart-icon');
const wholeCartWindow = document.querySelector('.cart-info');
wholeCartWindow.inWindow = 0; //0: ẩn, 1: hiện
const addToCartBtns = document.querySelectorAll('.tocart');

//Thêm sự kiện cho nút thêm vào giỏ hàng
addToCartBtns.forEach( (btn)=>{
    btn.addEventListener('click', addItemFunction)
}); 

//Thêm sản phẩm vào giỏ hàng
function addItemFunction(e){
    
    //Lấy id của sản phẩm
    const productContainer = e.target.closest('.row[data-id]');
    // console.log(productContainer)
    const id = productContainer.getAttribute("data-id");
    const img = productContainer.querySelector('.product-img').src;
    const name = productContainer.querySelector('.pro-name').textContent;
    let price = productContainer.querySelector('.price').textContent;
    price = price.replace("₫", '').trim(); //Xóa dấu tiền và khoảng trắng
    const item = new CartItem(name, img, price);
    LocalCart.addItemToLocalCart(id, item);
    updateCartUI();
}

 
//Cập nhật UI
function updateCartUI(){
    const cartWrapper = document.querySelector('.cart-contents');
    cartWrapper.innerHTML = "";
    let count = 0;
    const items = LocalCart.getLocalCartItems();
    if (items === null) return;
    for (const [key, value] of items.entries()) {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-items');
        
        count += 1;
        cartItem.innerHTML =
        `
            <div class="cart-item-image">
                <a href="../html/kemnen_chitietsp.html">
                    <img class="cart-img" src="${value.img}" alt="">
                </a>
            </div>
            <div class="cart-item-info">
                <div class="cart-item-name">
                    <span>${value.name}</span>
                </div>
                <div class="cart-item-price">
                    <span>Đơn giá: ${value.price}đ</span>
                    <br>
                    <input type="number" class="cart-item-quantity" value="${value.quantity}" min="1">
                </div>
                
            </div>
            <!--Remove item-->
            <i class="fas fa-trash cart-remove"></i>
        `;
        
        const quantityInput = cartItem.querySelector('.cart-item-quantity');

        // Thêm sự kiện input để theo dõi thay đổi giá trị
        quantityInput.addEventListener('change', (event) => {
            const newQuantity = parseInt(event.target.value);
            if (!isNaN(newQuantity) && newQuantity >= 1) { 
                // Cập nhật số lượng sản phẩm trong giỏ hàng
                value.quantity = newQuantity;
                LocalCart.addItemToLocalCart(key, value);
                updateCartUI();
            }else{
                value.quantity = 1;
                LocalCart.addItemToLocalCart(key, value);
                updateCartUI();
            }
        });

        //Xóa sản phẩm
       cartItem.lastElementChild.addEventListener('click', ()=>{
           clickAddProducts()
           LocalCart.removeItemFromCart(key);
       })

        cartWrapper.append(cartItem);//Thêm sản phẩm vào giỏ hàng
    }


    //Cập nhật số lượng sản phẩmd
    if(count > 0){
        cartIcon.classList.add('non-empty');
        let root = document.querySelector(':root');
        root.style.setProperty('--after-content', `"${count}"`);
    }
    else
        cartIcon.classList.remove('non-empty');

}

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
//Cập nhật UI khi load trang
document.addEventListener('DOMContentLoaded', ()=>{
    updateCartUI();

    const removeButtons = document.querySelectorAll('fas.fa-trash.cart-remove');
    removeButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            LocalCart.removeItemFromCart(index);
            updateCartUI();
            clickAddProducts();
        });
    });
   
});
    
