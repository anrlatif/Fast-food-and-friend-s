// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector(".navbar-nav");
// ketika hamburger menu di klik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// Toggle class active untuk search form
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

document.querySelector("#search-button").onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};

// Toggle class active untuk shopping cart
const shoppingCart = document.querySelector(".shopping-cart");
document.querySelector("#shopping-cart-button").onclick = (e) => {
  shoppingCart.classList.toggle("active");
  e.preventDefault();
};

// Klik di luar elemen
const hm = document.querySelector("#hamburger-menu");
const sb = document.querySelector("#search-button");
const sc = document.querySelector("#shopping-cart-button");

document.addEventListener("click", function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }

  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }

  if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove("active");
  }
});

document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Mencegah form dari pengiriman default

  // Ambil nilai dari input form
  const nama = document.getElementById('nama').value;
  const email = document.getElementById('mail').value;
  const phone = document.getElementById('nohp').value;


  // Format pesan untuk WhatsApp
  const whatsappMessage = `Halo, saya ${nama} dengan email ${email} dan no HP ${phone}. Saya ingin menghubungi Anda.`;

  //Buat URL WhatsApp
  const whatsappUrl = `https://wa.me/6281281943287?text=${encodeURIComponent(whatsappMessage)}`;

  // Arahkan pengguna ke WhatsApp
  window.open(whatsappUrl);
});

