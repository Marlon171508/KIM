const cartIcon = document.getElementById("cart-icon");
const cartDropdown = document.getElementById("cart-dropdown");
const cartCountEl = document.getElementById("cart-count");
const cartItemsEl = document.getElementById("cart-items");
const buyButtons = document.querySelectorAll(".buy-btn");
const checkoutBtn = document.getElementById("checkout");

let cart = [];

// zeigt/verbirgt den Warenkorb
cartIcon.addEventListener("click", () => {
  cartDropdown.style.display =
    cartDropdown.style.display === "block" ? "none" : "block";
});

// Produkt zum Warenkorb hinzufügen
buyButtons.forEach(btn => {
  btn.addEventListener("click", function () {
    const card = this.closest(".product");
    const name = card.dataset.name;
    const price = parseFloat(card.dataset.price);

    cart.push({ name, price });
    updateCartDisplay();
  });
});

// Warenkorb anzeigen aktualisieren
function updateCartDisplay() {
  cartCountEl.textContent = cart.length;
  cartItemsEl.innerHTML = "";

  cart.forEach((item, i) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} — ${item.price.toFixed(2)} €`;
    cartItemsEl.appendChild(li);
  });
}

// Checkout — Scherzmeldung
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Dein Warenkorb ist leer. So wie dieser Shop Sinn ergibt 😄");
  } else {
    alert("Haha! Du dachtest echt, du könntest hier wirklich etwas kaufen? 😆");
  }
});
