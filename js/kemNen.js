function increment() {
    var counter = document.getElementById("counter");
    var currentValue = parseInt(counter.textContent, 10);
    currentValue += 1;
    counter.textContent = currentValue < 10 ? "0" + currentValue : currentValue;
    updateLocalStorage()
}

function decrement() {
    var counter = document.getElementById("counter");
    var currentValue = parseInt(counter.textContent, 10);
    if (currentValue > 1) {
        currentValue -= 1;
        counter.textContent = currentValue < 10 ? "0" + currentValue : currentValue;
    }
    updateLocalStorage()
}


const accordionItemHeaders = document.querySelectorAll(".accordion-item-header");

accordionItemHeaders.forEach(accordionItemHeader => {
    accordionItemHeader.addEventListener("click", event => {
      
      // Uncomment in case you only want to allow for the display of only one collapsed item at a time!
      
      // const currentlyActiveAccordionItemHeader = document.querySelector(".accordion-item-header.active");
      // if(currentlyActiveAccordionItemHeader && currentlyActiveAccordionItemHeader!==accordionItemHeader) {
      //   currentlyActiveAccordionItemHeader.classList.toggle("active");
      //   currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
      // }

      accordionItemHeader.classList.toggle("active");
      const accordionItemBody = accordionItemHeader.nextElementSibling;
      if(accordionItemHeader.classList.contains("active")) {
        accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
      }
      else {
        accordionItemBody.style.maxHeight = 0;
      }
      
    });
});

function updateLocalStorage() {
  const quantity = 'quantity';
  const info = getLocalStorage();
  const counterValue = parseInt(document.getElementById('counter').innerText,);
  info[quantity] = counterValue;
  // Cập nhật giá trị vào local storage
  return localStorage.setItem('infoProduct', JSON.stringify(info))

}