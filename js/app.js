// DARK / LIGHT MODE
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    themeToggle.querySelector(".theme-icon").textContent =
        isDark ? "☀️" : "🌙";

    themeToggle.querySelector(".theme-label").textContent =
        isDark ? "Light Mode" : "Dark Mode";
});

// PRODUCT CATEGORY FILTER
const categoryButtons = document.querySelectorAll(".cat-pill");
const productCards = document.querySelectorAll(".product-card");

categoryButtons.forEach(button => {
    button.addEventListener("click", function () {

        categoryButtons.forEach(btn => {
            btn.classList.remove("is-active");
        });

        this.classList.add("is-active");

        const category = this.dataset.category;

        productCards.forEach(card => {
            if (category === "all" || card.dataset.category === category) {
                card.classList.remove("is-hidden");
            } else {
                card.classList.add("is-hidden");
            }
        });
    });
});

// PRODUCT SELECT
const productLinks = document.querySelectorAll(".select-product-link");
const orderType = document.getElementById("orderType");

productLinks.forEach(link => {
    link.addEventListener("click", function () {
        const card = this.closest(".product-card");
        const category = card.dataset.category;

        const options = {
            purifier: "Ус цэвэршүүлэгч төхөөрөмж",
            filter: "Шүүлтүүр солих / суурилуулах",
            bidet: "Автомат бидэ суултуур",
            air: "Агаар цэвэршүүлэгч"
        };

        orderType.value = options[category] || "";
    });
});

// ORDER FORM
const orderForm = document.getElementById("orderForm");

orderForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("orderName").value.trim();
    const phone = document.getElementById("orderPhone").value.trim();
    const type = document.getElementById("orderType").value;
    const feedback = document.getElementById("orderFeedback");

    if (!name || !phone || !type) {
        feedback.textContent = "Бүх шаардлагатай мэдээллийг бөглөнө үү!";
        feedback.className = "form-feedback error";
        return;
    }

    feedback.textContent = "Захиалгын мэдээлэл амжилттай шалгагдлаа!";
    feedback.className = "form-feedback success";

    orderForm.reset();
});

// CONTACT FORM
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const phone = document.getElementById("contactPhone").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    const feedback = document.getElementById("contactFeedback");

    if (!name || !phone || !email || !message) {
        feedback.textContent = "Мэдээллээ бүрэн бөглөнө үү!";
        feedback.className = "form-feedback error";
        return;
    }

    feedback.textContent = "Мессеж амжилттай шалгагдлаа!";
    feedback.className = "form-feedback success";

    contactForm.reset();
});