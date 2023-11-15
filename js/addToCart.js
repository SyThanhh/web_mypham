// Cart
let cartIcon = document.querySelector(".cart-icon");
let cart = document.querySelector(".cart-info");
let cartClose = document.querySelector("#close-cart");

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
        let cartMap = new Map();
        const cart = localStorage.getItem(LocalCart.key);
        if(cart===null || cart.length===0)  return cartMap
            return new Map(Object.entries(JSON.parse(cart)));
    }

    static addItemToLocalCart(id, item){
        let cart = LocalCart.getLocalCartItems();
        if(cart.has(id)){
            let mapItem = cart.get(id);
            mapItem.quantity +=1;
            cart.set(id, mapItem);
        }
        else{
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
                mapItem.quantity -=1;
                cart.set(id, mapItem);
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
wholeCartWindow.inWindow = 0;
const addToCartBtns = document.querySelectorAll('.tocart');

addToCartBtns.forEach( (btn)=>{
    btn.addEventListener('click', addItemFunction)
});

//Thêm sản phẩm vào giỏ hàng
function addItemFunction(e){
    const productContainer = e.target.closest('.row[data-id]');
    const id = productContainer.getAttribute("data-id");
    const img = productContainer.querySelector('.product-img').src;
    const name = productContainer.querySelector('.pro-name').textContent;
    let price = productContainer.querySelector('.price').textContent;
    price = price.replace("₫", '').trim(); // Adjust this according to your actual HTML structure
    const item = new CartItem(name, img, price);
    LocalCart.addItemToLocalCart(id, item);
    updateCartUI();
}


cartIconElement.addEventListener('mouseover', ()=>{
    if(wholeCartWindow.classList.contains('hide'))
    wholeCartWindow.classList.remove('hide')
})

//Ẩn giỏ hàng khi rời chuột
cartIconElement.addEventListener('mouseleave', ()=>{
    // if(wholeCartWindow.classList.contains('hide'))
    setTimeout( () =>{
        if(wholeCartWindow.inWindow===0){
            wholeCartWindow.classList.add('hide')
        }
    } ,500 )
    
    })

 wholeCartWindow.addEventListener('mouseover', ()=>{
     wholeCartWindow.inWindow=1
 })  
 
 wholeCartWindow.addEventListener('mouseleave', ()=>{
    wholeCartWindow.inWindow=0
    wholeCartWindow.classList.add('hide')
})  
 
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
                    <span class="cart-item-quantity" style="font-size: 17px; font-weight: 600;">SL: ${value.quantity}</span>
                </div>
                
            </div>
            <!--Remove item-->
            <i class="fas fa-trash cart-remove"></i>
        `;
        
       cartItem.lastElementChild.addEventListener('click', ()=>{
           LocalCart.removeItemFromCart(key);
       })
        cartWrapper.append(cartItem);
    }


    //Cập nhật số lượng sản phẩm
    if(count > 0){
        cartIcon.classList.add('non-empty');
        let root = document.querySelector(':root');
        root.style.setProperty('--after-content', `"${count}"`);
;;    }
    else
        cartIcon.classList.remove('non-empty');

}

//Cập nhật UI khi load trang
document.addEventListener('DOMContentLoaded', ()=>{updateCartUI()});
    
