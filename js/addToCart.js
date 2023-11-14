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

//Cart working
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)  
}else{
    ready()
}

//Making function ready
function ready(){
  //Remove item from cart
  var removeCartButtons = document.getElementsByClassName("cart-remove");
 // console.log(removeCartButtons);
  for(var i=0; i<removeCartButtons.length; i++){
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }
  //Quantity changes
  var quantityInputs = document.getElementsByClassName("cart-item-quantity");
  for(var i=0; i<quantityInputs.length; i++){
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  //Add to cart
    var addToCart = document.getElementsByClassName("tocart");
    for(var i=0; i<addToCart.length; i++){
      var button = addToCart[i];
      button.addEventListener("click", addToCartClicked);
      }
}


//Remove item from cart
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
}

//Quantity changes
function quantityChanged(event){
  var input = event.target;
  if(isNaN(input.value) || input.value <= 0){
    input.value = 1;
  }
}

//Add to cart clicked
function addToCartClicked(event){
   var button = event.target;
   var shopItem = button.parentElement;
   var title = shopItem.getElementsByClassName("product-name")[0].innerText;
   console.log(title);
   var price = shopItem.getElementsByClassName("price")[0].innerText;
   var imageSrc = shopItem.getElementsByClassName("product-img")[0].src;
   addItemToCart(title, price, imageSrc);
  
}

//Add item to cart
// function addItemToCart(title, price, imageSrc){
//   var cartRow = document.createElement("div");
//   cartRow.classList.add("cart-items"); //cart-
//   var cartItems = document.getElementsByClassName("cart-contents")[0];
//   var cartItemNames = cartItems.getElementsByClassName("cart-item-name");
//   for(var i=0; i<cartItemNames.length; i++){
//     if(cartItemNames[i].innerText == title){
//       alert("This item is already added to the cart");
//       return;
//     }
//   }
//   var cartRowContents = `
//                         <div class="cart-item-image">
//                             <a href="../html/kemnen_chitietsp.html">
//                                 <img class="cart-img" src="${imageSrc}" alt="">
//                             </a>
//                         </div>
//                         <div class="cart-item-info">
//                             <div class="cart-item-name">
//                                 <span>${title}</span>
//                             </div>
//                             <div class="cart-item-price">
//                                 <span>${price}</span>
//                             </div>

//                             <input type="number" class="cart-item-quantity" value="1" style="font-size: 15px;">
//                         </div>

//                         <!--Remove item-->
//                         <i class="fas fa-trash cart-remove"></i>
//                       </div>`;
//   cartRow.innerHTML = cartRowContents;
//   cartItems.append(cartRow);
//   cartRow.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
//   cartRow.getElementsByClassName("cart-item-quantity")[0].addEventListener("change", quantityChanged);
// }

//Update cart total price 





