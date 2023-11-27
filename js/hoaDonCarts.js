 // Lấy dữ liệu từ local storage

const cartData = JSON.parse(localStorage.getItem('cartItems'));
const totalPriceCart = document.querySelector('.total-price');
// Tính tổng tiền
let totalPrice = 0;
let rowNumber = 1;
const tbody = document.querySelector('#cartTable tbody');
for (const key in cartData) {
    if (cartData.hasOwnProperty(key)) {
        const product = cartData[key];

        // Chuyển đổi giá từ chuỗi sang số nguyên
        // Loại bỏ ký tự không phải số
        
        const price = parseInt(product.price.replace(/\D+/g, '')); 
        let formattedPrice = product.price.toLocaleString();


        const total = price * product.quantity;
        totalPrice += total;

        // Cắt chuỗi name tại dấu /n và lưu vào biến mới
        const nameParts = product.name.split('\n');
        const mainName = nameParts[0];
        const additionalName = nameParts[1] || ''; // Phần sau /n (nếu có)


        // Thêm dòng sản phẩm vào bảng
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${rowNumber}</td>
            <td>${mainName}</td>
            <td>${additionalName}</td>
            <td><img src="${product.img}" alt="${product.name}" style="max-width: 100px;"></td>
            <td>${formattedPrice} ₫</td>
            <td>${product.quantity}</td>
            <td>${total.toLocaleString()} ₫</td>
        `;
        tbody.appendChild(row);
        rowNumber++;
    }
}

// Hiển thị tổng tiền
document.querySelector('#totalPrice').textContent = totalPrice.toLocaleString() + " ₫";
totalPriceCart.textContent = totalPrice.toLocaleString() + " ₫";

function luuHoaDon() {
for (const key in cartData) {
    if (cartData.hasOwnProperty(key)) {
        const product = cartData[key];

        // Chuyển đổi giá từ chuỗi sang số nguyên
        // Loại bỏ ký tự không phải số
        
        const price = parseInt(product.price.replace(/\D+/g, '')); 
        let formattedPrice = product.price.toLocaleString();


        const total = price * product.quantity;
        totalPrice += total;

        // Cắt chuỗi name tại dấu /n và lưu vào biến mới
        const nameParts = product.name.split('\n');
        const mainName = nameParts[0];
        const additionalName = nameParts[1] || ''; // Phần sau /n (nếu có)


        // Thêm dòng sản phẩm vào bảng
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${rowNumber}</td>
            <td>${mainName}</td>
            <td>${additionalName}</td>
            <td><img src="${product.img}" alt="${product.name}" style="max-width: 100px;"></td>
            <td>${formattedPrice} ₫</td>
            <td>${product.quantity}</td>
            <td>${total.toLocaleString()} ₫</td>
        `;
        tbody.appendChild(row);
        const hoaDon = [];
        for(let i = 1; i < rowNumber; i++) {
            const sp = {
                'stt' : i,
                'name' : mainName,
                'dungtich' : additionalName,
                'img' : product.img,
                'Price' : formattedPrice,
                'quantity' : product.quantity,
                'totalPrice' : totalPrice.toLocaleString()
            }
            hoaDon.push(sp);
            }
        let totalAllPrice = totalPrice.toLocaleString() + " ₫";
        hoaDon.push(totalAllPrice);
        localStorage.setItem('hoadon', JSON.stringify(hoaDon));
     }
    }
}
