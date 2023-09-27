
document.addEventListener('DOMContentLoaded', function () {
  const addToCartButtons = document.querySelectorAll('.addToCartButton');
  const cartItemsElement = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');
  const clearCartButton = document.getElementById('clear-cart-button');


  function addToCart(name, price, imageSrc) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name, price, imageSrc });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
  }

  function removeCartItem(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
  }


  function clearCart() {
    localStorage.removeItem('cart');
    updateCartDisplay();
  }


  function resetCart() {
    localStorage.removeItem('cart');
    updateCartDisplay();
  }

  function updateCartDisplay() {
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartQuantityElement = document.getElementById('cart-quantity');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartHTML = '';
    let total = 0;
    let quantity = 0;
    cart.forEach((item, index) => {
      cartHTML += `
        <div class="cart-item">
          <img style ="height: 150px; width: 250px; object-fit: contain" class="cart-item-image" src="${item.imageSrc}" alt="">
          <p class="cart-item-name">${item.name}</p>
          <p class="cart-item-price">R$ ${item.price.toFixed(2)}</p>
          <span class="remove-item-button" data-index="${index}">Remover</span>
        </div>`;
      total += item.price;
      quantity += 1;
    });

    if (cartItemsElement) { 
      cartItemsElement.innerHTML = cartHTML;
    }
  

    if (cartTotalElement) { 
      cartTotalElement.textContent = `R$ ${total.toFixed(2)}`;
    }

    if (cartQuantityElement) { 
      cartQuantityElement.textContent = quantity;
    }

    const removeItemButtons = document.querySelectorAll('.remove-item-button');
    removeItemButtons.forEach(button => {
      button.addEventListener('click', function () {
        const index = parseInt(this.getAttribute('data-index'));
        removeCartItem(index);
      });
    });
  }

 
  if (clearCartButton) {
  
    clearCartButton.addEventListener('click', function () {
      clearCart();
    });
  }


  addToCartButtons.forEach(button => {
    button.addEventListener('click', function () {
      const productName = this.getAttribute('data-product-name');
      const productPrice = parseFloat(this.getAttribute('data-product-price'));
      const productImageSrc = this.getAttribute('data-product-image');
      addToCart(productName, productPrice, productImageSrc);
    });
  });

  updateCartDisplay();

 
  const confirmationForm = document.getElementById('confirmation-form');
  if (confirmationForm) {
    confirmationForm.addEventListener('submit', function (e) {
      e.preventDefault();

   
      resetCart();
  
    });
  }
});
