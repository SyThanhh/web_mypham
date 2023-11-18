let $ = document.querySelector.bind(document)
let $$ = document.querySelectorAll.bind(document)


const card = $('.card')
const image = $$('.image')
const iconCart = $$('.btn-cart-product')
function handelDetailsProducts() {
    image.forEach(element => {
        element.querySelector('img').addEventListener('click', function(item) {
            queryInfoProduct(element)
        })
    });
}
handelDetailsProducts()

// Lấy tất cả các nút mua hàng
const buttons = $$(".btn-cart-product");
buttons.forEach((button, index) => {
   
    button.addEventListener("click", function() {
        // Lấy phần tử cha của nút, sau đó tìm phần tử img bên trong nó
        queryInfoProduct(button, index)
    });
});


function saveLocalStorage() {
    return localStorage.setItem('infoProduct', JSON.stringify(info))
}

function queryInfoProduct(element, index) {
    const cardElement = element.closest(".card");
        const imgElement = cardElement.querySelector(".img-fluid");
        const productName = cardElement.querySelector('.product-name').textContent.trim();
        const capacityProduct = cardElement.querySelector('.capacity_product').textContent;
        const productNameDetails = cardElement.querySelector('.product-name-detail').textContent.trim();
        const discountLabel = cardElement.querySelector('.discount-label').textContent;
        // const productNameNote = cardElement.querySelector('product-name-note.d-none').textContent;
        const priceOld = cardElement.querySelector('.price-old').textContent;
        const priceCurrent = cardElement.querySelector('.price-current').textContent;
       
        if (imgElement) {
            const imageUrl = imgElement.getAttribute("src");
            info = {
                'imageU' : imageUrl,
                'name' : productName,
                'capacity':capacityProduct,
                'description' : productNameDetails,
                // 'note' : productNameNote,
                'discount' : discountLabel,
                'priceOld' : priceOld,
                'priceCurrent' : priceCurrent ,
                'index' : index
            };
            saveLocalStorage();
        }
}

function getInfoProductPutIntoPage() {
    const info = getLocalStorage();
    const carouselInner = document.querySelector('#chiTiet-id');
    const carouselItemActive = carouselInner.querySelector('.carousel-item.active');
    const imageU = carouselItemActive.querySelector('img');
    const listItems = document.querySelectorAll(".carousel-indicators li");
    const detailsProducts = document.querySelector('.details-products');
    const elementH4 = document.querySelector('h4'); 
    const elementH5 = document.querySelector('h5'); 
    // const detailProductNote = detailsProducts.querySelector('.product-name-note'); 
    const discount = document.querySelector('.discount');
    const priceOld = document.querySelector('.price_old');
    const priceCurrent = document.querySelector('.price_current');
    const capacityDetails = document.querySelector('.text-secondary.capacity_product');
    
    const newImage = `url('${info.imageU}')`;
    listItems.forEach(item => {
        if (item.classList.contains("active")) {
            // Thay đổi background-image sử dụng lớp CSS
            item.style.backgroundImage = newImage;
        }
    });
    imageU.src = info.imageU;
    elementH4.textContent = info.name;
    elementH5.textContent = info.description;
    // detailProductNote.textContent = info.note;
    discount.textContent = info.discount;
    priceOld.textContent = info.priceOld;
    priceCurrent.textContent = info.priceCurrent;
    capacityDetails.textContent = info.capacity;


    const addToCartBtns = document.querySelectorAll('.tocart');
    addToCartBtns.forEach( (btn)=>{
        btn.addEventListener('click', function(e) {
            const productContainer = e.target.closest('.row[data-id]');
            if (productContainer) {
                // Đặt giá trị cho thuộc tính data-id
                productContainer.setAttribute('data-id', info.index); 
            }
        })
    }); 

}

getInfoProductPutIntoPage()


function getLocalStorage() {
    return JSON.parse(localStorage.getItem('infoProduct')) ?? []
}