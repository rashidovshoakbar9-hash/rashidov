
const products = [
    {
        id: 1,
        name: "Urban X 150",
        type: "city",
        typeLabel: "Shahar uchun",
        price: 18500000,
        description: "Kundalik qatnov uchun zamonaviy va qulay skuter.",
        image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        name: "Volt E-Ride",
        type: "electric",
        typeLabel: "Elektr",
        price: 12900000,
        description: "Shahar bo‘ylab harakatlanish uchun elektr model.",
        image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        name: "Street Pro 200",
        type: "sport",
        typeLabel: "Sport",
        price: 24700000,
        description: "Sport uslubidagi zamonaviy mototransport.",
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        name: "City Move 125",
        type: "city",
        typeLabel: "Shahar uchun",
        price: 15900000,
        description: "Shahar ichida yurish uchun ixcham model.",
        image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 5,
        name: "Eco Glide",
        type: "electric",
        typeLabel: "Elektr",
        price: 9900000,
        description: "Tejamkor va sodda elektr transport.",
        image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 6,
        name: "Racer GT 250",
        type: "sport",
        typeLabel: "Sport",
        price: 31900000,
        description: "Sport dizayni va dadil ko‘rinishga ega model.",
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80"
    }
];

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("search");
const modelSelect = document.getElementById("modelSelect");

let selectedType = "all";

// Narxni so‘m shaklida chiqarish
function formatPrice(price) {
    return new Intl.NumberFormat("uz-UZ").format(price) + " so‘m";
}

// Skuterlarni sahifaga chiqarish
function showProducts() {
    const query = searchInput.value.toLowerCase().trim();

    const filteredProducts = products.filter(product => {
        const matchesType =
            selectedType === "all" ||
            product.type === selectedType;

        const matchesSearch =
            product.name.toLowerCase().includes(query) ||
            product.typeLabel.toLowerCase().includes(query);

        return matchesType && matchesSearch;
    });

    if (filteredProducts.length === 0) {
        productGrid.innerHTML =
            '<p class="empty-message">Skuter topilmadi. Boshqa nom kiriting.</p>';
        return;
    }

    productGrid.innerHTML = filteredProducts.map(product => `
        <article class="product-card">
            <img
                src="${product.image}"
                alt="${product.name}"
                loading="lazy"
            >

            <div class="product-info">
                <span class="product-type">${product.typeLabel}</span>

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <div class="product-bottom">
                    <span class="price">${formatPrice(product.price)}</span>

                    <button
                        class="choose-btn"
                        data-id="${product.id}"
                    >
                        Tanlash ↗
                    </button>
                </div>
            </div>
        </article>
    `).join("");

    // Tanlangan modelni formaga kiritish
    document.querySelectorAll(".choose-btn").forEach(button => {
        button.addEventListener("click", () => {
            modelSelect.value = button.dataset.id;

            document.getElementById("contact")
                .scrollIntoView({ behavior: "smooth" });
        });
    });
}

// Formadagi modellar ro‘yxati
products.forEach(product => {
    const option = document.createElement("option");

    option.value = product.id;
    option.textContent =
        product.name + " — " + formatPrice(product.price);

    modelSelect.appendChild(option);
});

// Filtr tugmalari
document.querySelectorAll(".filter").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".filter").forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");
        selectedType = button.dataset.type;

        showProducts();
    });
});

// Qidiruv
searchInput.addEventListener("input", showProducts);

// Mobil menyu
function toggleMenu() {
    document.getElementById("navbar").classList.toggle("open");
}

// Menyudan havola tanlansa, menyu yopiladi
document.querySelectorAll("#navbar a").forEach(link => {
    link.addEventListener("click", () => {
        document.getElementById("navbar").classList.remove("open");
    });
});

// So‘rov formasini tekshirish
document.getElementById("contactForm").addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const selectedProduct = products.find(
        product => String(product.id) === modelSelect.value
    );

    if (!name || !phone || !selectedProduct) {
        document.getElementById("message").textContent =
            "Iltimos, barcha maydonlarni to‘ldiring.";
        return;
    }

    document.getElementById("message").textContent =
        `Rahmat, ${name}! ${selectedProduct.name} modeliga qiziqishingiz qayd etildi. Bu demo forma — so‘rov sotuvchiga yuborilmadi.`;
});

// Sahifa ochilganda modellarni chiqarish
showProducts();
