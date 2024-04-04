const inputQnty = document.querySelectorAll(".choose_quantity");
const setPrices = document.querySelectorAll(".set_price");
const countedPrices = document.querySelectorAll(".counted_price");

inputQnty.forEach(function (input, index) {
  input.addEventListener("change", function () {
    let price = parseFloat(this.value);
    let totalPrice = 0;
    let cardPrice = parseFloat(setPrices[index].innerHTML);
    let totalPriceForCard = price * cardPrice;
    countedPrices[index].innerHTML = "$" + totalPriceForCard.toFixed(2);
  });
});

const shopListBtn = document.querySelector(".shop_list_btn");
const basketBtn = document.querySelector(".basket_btn");
const basket = document.querySelector(".basket");
const shopList = document.querySelector(".shopping_cart");

shopListBtn.addEventListener("click", function () {
  basket.style.display = "none";
  shopList.style.display = "block";
  basketBtn.classList.remove("chosen_nav_btn");
  shopListBtn.classList.add("chosen_nav_btn");
  inputQnty.forEach(function (input) {
    input.value = 0;
  });
});

basketBtn.addEventListener("click", function () {
  basketBtn.classList.add("chosen_nav_btn");
  shopListBtn.classList.remove("chosen_nav_btn");
  shopList.style.display = "none";
  basket.style.display = "block";
});

const basketNumOfItems = document.querySelector(".basket .num_items");
const basketLength = document.querySelectorAll(
  ".basket .list_container .product",
).length;
basketBtn.innerHTML += ` (${basketLength})`;

function updateBasketCount() {
  const basketLength = document.querySelectorAll(
    ".basket .list_container .product",
  ).length;
  basketBtn.innerHTML = `Basket (${basketLength})`;
  if (basketLength == 1) {
    basketNumOfItems.innerHTML = `${basketLength} item`;
  } else basketNumOfItems.innerHTML = `${basketLength} items`;
}

const basketList = document.querySelector(".basket .list_container .left");

function addToBasket() {
  const product = this.closest(".product").cloneNode(true);
  const countedPriceElement = product.querySelector(".counted_price");
  const countedPrice = parseFloat(
    countedPriceElement.textContent.replace("$", ""),
  );

  if (countedPrice > 0) {
    basketList.appendChild(product);
    product.style.width = "95%";
    updateBasketCount();
  }
  const removeBtn = product.querySelector(".add_btn");
  removeBtn.innerHTML = "Remove";
  removeBtn.style.backgroundColor = "#ff0100";
  removeBtn.style.border = "none";
  removeBtn.style.width = "100px";
  const qnty = product.querySelector(".choose_quantity");
  const weight = product.querySelector(".in_kgs");
  qnty.style.visibility = "hidden";
  weight.style.visibility = "hidden";
  updateSubtotalPlus();
  calcShippingSum();
  calcTaxSum();
  calcTotalSum();
  removeBtn.addEventListener("click", function () {
    product.remove();
    updateSubtotalMinus();
    updateBasketCount();
    calcShippingSum();
    calcTaxSum();
    calcTotalSum();
  });
}

const cucBtn = document.querySelector(".cuc_btn");
cucBtn.addEventListener("click", addToBasket);
const mushBtn = document.querySelector(".mush_btn");
mushBtn.addEventListener("click", addToBasket);
const pepBtn = document.querySelector(".pep_btn");
pepBtn.addEventListener("click", addToBasket);
const carrotBtn = document.querySelector(".carrot_btn");
carrotBtn.addEventListener("click", addToBasket);
const onionBtn = document.querySelector(".onion_btn");
onionBtn.addEventListener("click", addToBasket);
const tomBtn = document.querySelector(".tom_btn");
tomBtn.addEventListener("click", addToBasket);
const chilBtn = document.querySelector(".chil_btn");
chilBtn.addEventListener("click", addToBasket);
const eggplBtn = document.querySelector(".eggpl_btn");
eggplBtn.addEventListener("click", addToBasket);
const cornBtn = document.querySelector(".corn_btn");
cornBtn.addEventListener("click", addToBasket);
const cherryBtn = document.querySelector(".cherry_btn");
cherryBtn.addEventListener("click", addToBasket);

function updateSubtotalPlus() {
  const priceInBasket = document.querySelectorAll(".basket .counted_price");
  const subtotal = document.querySelector(".basket .subtotal_sum");
  let total = 0.0;

  priceInBasket.forEach(function (priceElement) {
    const price = parseFloat(priceElement.innerHTML.replace("$", ""));
    total += price;
  });

  subtotal.innerHTML = "$" + total.toFixed(2);
}
function updateSubtotalMinus() {
  const priceInBasket = document.querySelectorAll(".basket .counted_price");
  const subtotal = document.querySelector(".basket .subtotal_sum");
  let total = 0.0;

  priceInBasket.forEach(function (priceElement) {
    const price = parseFloat(priceElement.innerHTML.replace("$", ""));
    total -= price;
  });

  subtotal.innerHTML = "$" + Math.abs(total.toFixed(2));
}

function calcShippingSum() {
  const subtotal = document.querySelector(".basket .subtotal_sum");
  const shippingSum = document.querySelector(".shipping_sum");
  let sub = parseFloat(subtotal.innerHTML.replace("$", ""));
  let shipping = sub * 0.3;
  shippingSum.innerHTML = "$" + shipping.toFixed(2);
  return shipping.toFixed(2);
}

function calcTaxSum() {
  const subtotal = document.querySelector(".basket .subtotal_sum");
  const taxSum = document.querySelector(".tax_sum");
  let sub = parseFloat(subtotal.innerHTML.replace("$", ""));
  let tax = sub * 0.2;
  taxSum.innerHTML = "$" + tax.toFixed(2);
  return tax.toFixed(2);
}

function calcTotalSum() {
  const subtotal = document.querySelector(".basket .subtotal_sum");
  const shippingSum = parseFloat(calcShippingSum());
  const total = document.querySelector(".total_sum");
  const taxSum = parseFloat(calcTaxSum());
  let sub = parseFloat(subtotal.innerHTML.replace("$", ""));
  let totalSum = shippingSum + taxSum + sub;
  total.innerHTML = "$" + totalSum.toFixed(2);
}
