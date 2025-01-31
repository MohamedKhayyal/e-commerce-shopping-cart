let data = [];
let section = document.querySelector("section");
let cart = document.querySelector(".cart");
let span = document.querySelector(".num");
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(data));
}
function showData() {
  section.innerHTML = "";
  products.forEach((e, i) => {
    section.innerHTML += `
          <div class="card" style="width: 18rem ">
            <img src="${e.image}" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">${e.title}</h5>
              <p>${e.price} $</p>
              <p class="card-text">
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </p>
             <a
            href="#ff"
            class="btn btn-primary chText" onclick="addToCart(${i})"
            style="width: 100%"
            >Add To Cart</a
          >
            </div>
          </div>
      `;
  });
  saveCart();
}

function showProduct() {
  cart.innerHTML = "";
  if (data.length === 0) {
    cart.innerHTML =
      "<p class='text-center text-white'>Your cart is empty.</p>";
  }
  data.forEach((e, i) => {
    cart.innerHTML += `
          <div class="col-12 bg-white text-dark d-flex gap-3 trans">
            <img src="${e.image}" height="50"width="50"/>
            <div class="d-flex flex-wrap">
              <span class="col-12">${e.category}</span>
              <span class="col-12"> price: ${e.price} $</span>
              <div class="d-flex col-12 justify-content-center aline-items-center gap-2">
                <button class ="btn btn-danger"onclick="decrement(${i})">-</button>
                <p class="mb-0">${e.qty}</p>
                <button class="btn btn-success"onclick="increment(${i})">+</button>
              </div>
              <span class="col-12">Total: ${
                e.price * e.qty
              } $</span>              
            </div>
          </div>
    `;
  });
  cart.innerHTML += `
  <button class="btn btn-danger w-100 mt-2" onclick="closeCart()">Close</button>
`;
}

function showCart() {
  cart.classList.toggle("active");
}

function increment(i) {
  data[i].qty++;
  span.innerHTML++;
  showProduct();
  saveCart();
}
function decrement(i) {
  data[i].qty--;
  span.innerHTML--;
  if (data[i].qty < 1) {
    data.splice(i, 1);
  }
  showProduct();
  saveCart();
}
function addToCart(i) {
  let newData = products[i];
  let findResult = data.findIndex((e) => {
    return e.id == newData.id;
  });
  if (findResult === -1) {
    newData.qty = 1;
    data.push(newData);
  } else {
    data[findResult].qty++;
  }
  showProduct();
  span.innerHTML++;
  cart.classList.add("active");
  saveCart();
}

function updateCartCount() {
  let totalQty = data.reduce((sum, item) => sum + item.qty, 0);
  span.innerHTML = totalQty;
  loadCart();
}
function loadCart() {
  let storedCart = localStorage.getItem("cart");
  if (storedCart) {
    data = JSON.parse(storedCart);
  }
}
function closeCart() {
  cart.classList.toggle("active");
}
function searchProduct() {
  let searchInput = document.getElementById("searchBox").value.toLowerCase();
  let filteredData = data.filter(
    (item) =>
      item.category.toLowerCase().includes(searchInput) ||
      item.price.toString().includes(searchInput)
  );

  showFilteredProducts(filteredData);
}

function showFilteredProducts(filteredData) {
  cart.innerHTML = "";

  if (filteredData.length === 0) {
    cart.innerHTML =
      "<p class='text-center text-white'>No matching products found.</p>";
    return;
  }

  filteredData.forEach((e, i) => {
    cart.innerHTML += `
      <div class="col-12 bg-white text-dark d-flex gap-3 trans p-2">
        <img src="${e.image}" height="50" width="50"/>
        <div class="d-flex flex-wrap">
          <span class="col-12">${e.category}</span>
          <span class="col-12">Price: ${e.price} $</span>
          <div class="d-flex col-12 justify-content-center align-items-center gap-2">
            <button class="btn btn-danger" onclick="decrement(${i})">-</button>
            <p class="mb-0">${e.qty}</p>
            <button class="btn btn-success" onclick="increment(${i})">+</button>
          </div>
          <span class="col-12">Total: ${e.price * e.qty} $</span>              
        </div>
      </div>
    `;
  });

  cart.innerHTML += `
    <button class="btn btn-danger close w-100 mt-2" onclick="closeCart()">Close</button>
  `;
}
loadCart();
updateCartCount();
showData();
showProduct();
