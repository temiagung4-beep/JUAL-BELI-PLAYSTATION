
const products = [
    {
        id: 1,
        name: "PlayStation 2",
        category: "PS2",
        price: 500000,
        badge: "BEST SELLER",
        desc: "PS2 FAT Digital Edition",
        image: "FAT.JPEG"
    },
    {
        id: 2,
        name: "PlayStation 2 SLIM",
        category: "PS2",
        price: 400000,
        badge: "POPULER",
        desc: "PS2 SLIM 160GB Fullset",
        image: "SLIM.JPEG"
    },
    {
        id: 3,
        name: "PlayStation 3 Slim",
        category: "PS3",
        price: 1800000,
        badge: "PROMO",
        desc: "PS3 Slim 250GB",
        image: "PS3.JPEG"
    },
    {
        id: 4,
        name: "Controller PS 2",
        category: "Controller",
        price: 50000,
        badge: "ORIGINAL",
        desc: "Wireless Controller PS2",
        image: "STIK.JPEG"
    },
    {
        id: 5,
        name: "PlayStation 1",
        category: "PS1",
        price: 400000,
        badge: "FAVORIT",
        desc: "PlayStation",
        image: "PS1.JPEG"
    },
    {
        id: 6,
        name: "Headset Gaming",
        category: "Aksesoris",
        price: 350000,
        badge: "NEW",
        desc: "Gaming Headset Stereo",
        image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=600"
    },
    {
        id: 7,
        name: "SEVISE PS2",
        category: "PS2",
        price: 1000000,
        badge: "TERLARIS",
        desc: "JASA SEVISE",
        image: "SERVISE.JPEG"
    },
    {
        id: 8,
        name: "Stik Controller PS4",
        category: "Controller",
        price: 100000,
        badge: "PROMO",
        desc: "Wireless Controller PS4",
        image: "STIK4.JPG"
    }
];

let cart = [];
let selectedCategory = "Semua";

// FORMAT RUPIAH
function formatRupiah(number) {
    return "Rp " + number.toLocaleString("id-ID");
}

// MENAMPILKAN PRODUK
function displayProducts(data) {
    const productList = document.getElementById("productList");
    const emptyMessage = document.getElementById("emptyMessage");

    productList.innerHTML = "";

    if (data.length === 0) {
        emptyMessage.innerText = "Produk tidak ditemukan.";
        return;
    }

    emptyMessage.innerText = "";

    data.forEach(product => {
        productList.innerHTML += `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}"
                         alt="${product.name}"
                         onerror="this.src='https://placehold.co/600x400/101426/00b7ff?text=Gaming+Product'">
                    <span class="product-badge">
                        ${product.badge}
                    </span>
                </div>

                <div class="product-info">
                    <span class="product-category">
                        ${product.category}
                    </span>

                    <h3>${product.name}</h3>

                    <p class="product-desc">
                        ${product.desc}
                    </p>

                    <div class="product-bottom">
                        <span class="price">
                            ${formatRupiah(product.price)}
                        </span>

                        <button class="add-btn"
                            onclick="addToCart(${product.id})">
                            + Keranjang
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

// FILTER KATEGORI
function filterCategory(category, button) {
    selectedCategory = category;

    document.querySelectorAll(".category").forEach(item => {
        item.classList.remove("active");
    });

    button.classList.add("active");

    searchProducts();
}

// PENCARIAN PRODUK
function searchProducts() {
    const keyword = document
        .getElementById("searchInput")
        .value.toLowerCase();

    const filtered = products.filter(product => {
        const matchCategory =
            selectedCategory === "Semua" ||
            product.category === selectedCategory;

        const matchSearch =
            product.name.toLowerCase().includes(keyword) ||
            product.category.toLowerCase().includes(keyword);

        return matchCategory && matchSearch;
    });

    displayProducts(filtered);
}

// TAMBAH KERANJANG
function addToCart(id) {
    const product = products.find(item => item.id === id);

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();

    alert(product.name + " berhasil ditambahkan!");
}

// HAPUS PRODUK
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// UPDATE KERANJANG
function updateCart() {
    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    let totalQuantity = 0;
    let totalPrice = 0;

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <p style="text-align:center;padding:30px;color:#888">
                Keranjang kamu masih kosong 🛒
            </p>
        `;
    }

    cart.forEach(item => {
        totalQuantity += item.quantity;
        totalPrice += item.price * item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">
                <div>
                    <h4>${item.name}</h4>
                    <p>${formatRupiah(item.price)}</p>
                    <small>Jumlah: ${item.quantity}</small>
                </div>

                <button onclick="removeFromCart(${item.id})">
                    Hapus
                </button>
            </div>
        `;
    });

    cartCount.innerText = totalQuantity;
    cartTotal.innerText = formatRupiah(totalPrice);
}

// BUKA / TUTUP KERANJANG
function toggleCart() {
    document.getElementById("cartPanel")
        .classList.toggle("show");

    document.getElementById("overlay")
        .classList.toggle("show");
}

// CHECKOUT
function checkout() {
    if (cart.length === 0) {
        alert("Keranjang masih kosong!");
        return;
    }

    let message = "Halo PLAYZONE, saya ingin memesan:\n\n";

    cart.forEach(item => {
        message +=
            item.name +
            " x" + item.quantity +
            " = " +
            formatRupiah(item.price * item.quantity) +
            "\n";
    });

    const total = cart.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);

    message += "\nTotal: " + formatRupiah(total);

    // GANTI NOMOR INI DENGAN NOMOR WHATSAPP TOKO
    const nomorWhatsApp = "6281234567890";

    const url =
        "https://wa.me/" +
        nomorWhatsApp +
        "?text=" +
        encodeURIComponent(message);

    window.open(url, "_blank");
}

// JALANKAN WEBSITE
displayProducts(products);
updateCart();
