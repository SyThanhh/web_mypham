document.addEventListener("DOMContentLoaded", function() {
    // Lấy dữ liệu từ local storage
           let totalPrice = 0;
           const productData = getLocalStorage()
   
           const numericString = productData.priceCurrent.replace(/[^\d.]/g, '');
           const price = parseInt(numericString.replace(/\D+/g, '')); 
          
           let formattedPrice = productData.priceCurrent.toLocaleString();
   
   
           const total =  productData.quantity * price;
           
           totalPrice += total;
   
           // Cắt chuỗi name tại dấu /n và lưu vào biến mới
           const nameParts = productData.name.split('\n');
           const mainName = nameParts[0];
           const additionalName = nameParts[1] || ''; // Phần sau /n (nếu có)

           function displayProductList() {
               const productBody = document.getElementById('productBody');
           
           
   
               // // Duyệt qua danh sách sản phẩm và thêm vào bảng
               let index = 1;
               const row = document.createElement('tr');
               row.innerHTML = `
                   <td>${index}</td>
                   <td><img src="${productData.imageU}" alt="${mainName}" style="width:120px; height:120px;  object-fit: cover;"></td>
                   <td>${mainName}</td>
                   <td>${productData.capacity}</td>
                   <td>${productData.description}</td>
                   <td class="discount-label">${productData.quantity}</td>
                   <td>${formattedPrice}</td>
                   <td>${totalPrice.toLocaleString()} ₫</td>
               `;
               productBody.appendChild(row);
   
               // Tăng số thứ tự
               index++;
               
               
           }

           displayProductList()
   

            function luuHoaDon() {
                const hoaDonProduct = [];
                const sp = {
                        'stt' : 1,
                        'img' : productData.imageU,
                        'name' : mainName,
                        'dungtich' : productData.capacity,
                        'mota' : productData.description,
                        'quantity' : productData.quantity,
                        'Price' : formattedPrice,
                        'totalPrice' : totalPrice.toLocaleString() + "₫"
                }
                hoaDonProduct.push(sp);
                    
                
                localStorage.setItem('hoadonItem', JSON.stringify(hoaDonProduct));
            }
            document.getElementById('btn-xacNhanItem').addEventListener('click', function() {
                luuHoaDon()
            })

           function getLocalStorage() {
           return JSON.parse(localStorage.getItem('infoProduct')) ?? []
           }

   });