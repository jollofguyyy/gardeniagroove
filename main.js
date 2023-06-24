// Cart
let cartIcon = document.querySelector(".cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector(".close-cart");

// Open Cart
cartIcon.onclick = () =>{
    cart.classList.add("active");
};

// Close Cart
closeCart.onclick = () =>{
    cart.classList.remove("active");
};


// Cart Working Js
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// Making Function
function ready() {
  var removeCartButtons = document.getElementsByClassName("cart-remove");
  console.log(removeCartButtons);
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }
}

// Quantity Changes
function ready() {
  var quantityInputs = document.getElementsByClassName("cart-quantity");

  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("input", quantityChanged);
  }

  // Add to Cart
  var addCart = document.getElementsByClassName("add-cart");

  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
}

function addCartClicked(event) {
  var button = event.target;
  var shopProduct = button.parentElement;
  var title = shopProduct.getElementsByClassName("product-title")[0].innerText;
  var price = shopProduct.getElementsByClassName("price")[0].innerText;
  var productImg = shopProduct.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, productImg);
  updatetotal();
}

function addProductToCart(title, price, productImg) {
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");

  var cartBoxContent = `
    <img src="${productImg}" alt="" class="cart-img" />
    <div class="detail-box">
      <div class="cart-product-title">${title}</div>
      <div class="cart-price">${price}</div>
      <input type="number" value="1" class="cart-quantity" />
    </div>
    <!-- Remove Cart -->
    <ion-icon name="trash-bin-outline" class="cart-remove"></ion-icon>
  `;

  cartShopBox.innerHTML = cartBoxContent;
  var cartItems = document.getElementsByClassName("cart-content")[0];
  cartItems.append(cartShopBox);

  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);

}

// Remove Items From Cart
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updatetotal();
}

// Quantity Change
function quantityChanged(event) {
  var input = event.target;
  var currentValue = parseInt(input.value);

  // Check if the input value is a valid number
  if (isNaN(currentValue) || currentValue <= 0) {
    input.value = 1;
  }

  updatetotal();
}

// Update Total
function updatetotal() {
  var cartBoxes = document.getElementsByClassName("cart-box");
  var total = 0;

  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = parseInt(quantityElement.value);
    total += price * quantity;
  }
    // if price Contain some Cents
    total = Math.round(total * 100) / 100;
  
  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}
