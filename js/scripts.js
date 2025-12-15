//so that it loads html first then the script(?)
document.addEventListener("DOMContentLoaded", function () {

  //cart calculation const
  const discountx = 0.2;
  const tax = 0.1;

  let cart = [];
  const addtocartbuttons = document.querySelectorAll(".add-to-cart");
  addtocartbuttons.forEach(button => {
    button.addEventListener("click", function () {
      additemtocart(this);
    });
  });

  function additemtocart(button) {
    const name = button.dataset.name;
    const price = Number(button.dataset.price);
    const image = button.dataset.image;
    const existing = cart.find(item => item.name === name);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        name: name,
        price: price,
        image: image,
        quantity: 1
      });
    }
  
console.log(cart);
updatecartoffcanvas();
updatecartcount(); //giu' 
    
    }

function updatecartoffcanvas() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const subtotalelement= document.getElementById("subtotal");
  const taxelement= document.getElementById("tax");
  const discountelement= document.getElementById("discount");

  cartItems.innerHTML = "";
  
  let subtotal = 0;
  let totalitems = 0;

  cart.forEach(item => {
    const itemtotal = item.price * item.quantity;
    subtotal += itemtotal;
    totalitems += item.quantity;

    //backticks for string and variables with the $ sign instead of ""+""
    cartItems.innerHTML += `
      <div class="d-flex align-items-center mb-3"> 
        <img src="${item.image}"
             alt="${item.name}"
             class="me-3"
             style="width: 60px; height: 60px; object-fit: cover;">
        <div>
          <p class="mb-0 fw-semibold">${item.name}</p>
          <small>€${item.price.toFixed(2)} x ${item.quantity}</small>
        </div>
      </div>
    `;
  });

  //discount and tax calc
  let discount =0;
  if (totalitems >= 3) {
    discount = subtotal * discountx;
  }
  const discounted = subtotal - discount;
  const taxed = discounted * tax;
  const total = discounted + taxed;

  subtotalelement.textContent = subtotal.toFixed(2);
  discountelement.textContent = discount.toFixed(2);
  taxelement.textContent = taxed.toFixed(2);
  cartTotal.textContent = total.toFixed(2);
}

//little cart counter badge
function updatecartcount() {
  const cartCount = document.getElementById("cart-count");
  let totalitems = 0;
  cart.forEach(item => {
    totalitems += item.quantity;
  });
  cartCount.textContent = totalitems;
}

//show checkout when checkoutbtn from cart clicked
const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutsection = document.getElementById("checkout-section");
const cartoffcanvas = document.getElementById("cartOffcanvas");

checkoutBtn.addEventListener("click", function (){
  checkoutsection.classList.remove("d-none");

  const offcanvas = bootstrap.Offcanvas.getInstance(cartoffcanvas);
  offcanvas.hide();

  checkoutsection.scrollIntoView({ behavior: "smooth" });
})


//hidden confir after checkout 
const checkoutform = document.getElementById("checkoutform");
const confirmationsection = document.getElementById("confirmationsection");

checkoutform.addEventListener("submit", function (event) {
  event.preventDefault(); //prevents it from submitting normally and reloading page 

  checkoutsection.classList.add("d-none");
  confirmationsection.classList.remove("d-none");

  updateconfirmationitems();

});
//after the checkout calvulation for confrimation page idk if i couldve reused the previous calculations 
function updateconfirmationitems() {
  const confirmationitems = document.getElementById("confirmationitems");
  confirmationitems.innerHTML = "";

  let subtotal = 0;
  let totalitems = 0;
  
  cart.forEach(item => {
    const itemtotal = item.price * item.quantity;
    subtotal += itemtotal;
    totalitems += item.quantity;

    confirmationitems.innerHTML += `
    <p>${item.name} x ${item.quantity}
    <span class="float-end">€${itemtotal.toFixed(2)}</span></p>
    `;
  });

  let discount =0;
  if (totalitems >= 3) {
    discount = subtotal * discountx;
  }
  const discounted = subtotal - discount;
  const taxed = discounted * tax;
  const total = discounted + taxed;

  document.getElementById("confirm-subtotal").textContent = subtotal.toFixed(2);
  document.getElementById("confirm-discount").textContent = discount.toFixed(2);
  document.getElementById("confirm-tax").textContent = taxed.toFixed(2);
  document.getElementById("confirm-total").textContent = total.toFixed(2);
}

});