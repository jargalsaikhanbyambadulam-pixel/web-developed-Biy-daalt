(() => {
  const THEME_KEY = "bileg_theme";

  const syncThemeUI = (isDark) => {
    document.body.classList.toggle("dark-mode", isDark);
    const toggleBtn = document.getElementById("themeToggle");
    if (toggleBtn) {
      toggleBtn.setAttribute("aria-pressed", String(isDark));
      const icon = toggleBtn.querySelector(".theme-icon");
      const label = toggleBtn.querySelector(".theme-label");
      if (icon) icon.textContent = isDark ? "☀️" : "🌙";
      if (label) label.textContent = isDark ? "Light Mode" : "Dark Mode";
    }
  };

  try {
    if (localStorage.getItem(THEME_KEY) === "dark") {
      syncThemeUI(true);
    }
  } catch (_) {}

  document.addEventListener("click", (event) => {
    // 1. Dark Mode товч (#themeToggle эсвэл .pill-toggle)
    const themeBtn = event.target.closest("#themeToggle, .pill-toggle");
    if (themeBtn) {
      event.preventDefault();
      const nextDark = !document.body.classList.contains("dark-mode");
      syncThemeUI(nextDark);
      try {
        localStorage.setItem(THEME_KEY, nextDark ? "dark" : "light");
      } catch (_) {}
      return;
    }

    // 2. Ангиллын шүүлтүүр (.filter-pill эсвэл .cat-pill)
    const filterBtn = event.target.closest(".filter-pill, .cat-pill");
    if (filterBtn) {
      const selectedCat = filterBtn.dataset.category || "all";
      const allFilterBtns = document.querySelectorAll(".filter-pill, .cat-pill");
      allFilterBtns.forEach((btn) => btn.classList.remove("is-active"));
      filterBtn.classList.add("is-active");

      const cards = document.querySelectorAll(".item-card, .product-card");
      cards.forEach((card) => {
        const cardCat = card.dataset.category || "";
        const isMatch = selectedCat === "all" || cardCat === selectedCat;
        card.classList.toggle("is-hidden", !isMatch);
      });
      return;
    }

    // 3. Зүрх / Хадгалах товч (.wish-btn)
    const wishBtn = event.target.closest(".wish-btn");
    if (wishBtn) {
      event.preventDefault();
      const liked = wishBtn.classList.toggle("is-liked");
      wishBtn.textContent = liked ? "♥" : "♡";
      wishBtn.style.color = liked ? "#ef4444" : "";
      return;
    }

    // 4. "Дэлгэрэнгүй →" дарахад захиалгын төрөл автоматаар сонгох
    const detailLink = event.target.closest(".select-product-link");
    if (detailLink) {
      const card = detailLink.closest(".item-card, .product-card");
      const orderTypeEl = document.getElementById("orderType");
      if (card && orderTypeEl && card.dataset.orderType) {
        orderTypeEl.value = card.dataset.orderType;
      }
    }
  });

  // 5. Хэрэв хуудсанд orderForm / contactForm байвал алдаагүй ажиллуулах
  document.addEventListener("DOMContentLoaded", () => {
    const orderForm = document.getElementById("orderForm");
    if (orderForm) {
      orderForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const fb = document.getElementById("orderFeedback");
        if (fb) {
          fb.textContent = "Таны захиалгын мэдээлэл хүлээн авагдлаа.";
          fb.className = "form-feedback success";
        }
      });
    }

    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const fb = document.getElementById("contactFeedback");
        if (fb) {
          fb.textContent = "Таны мессеж амжилттай илгээгдлээ.";
          fb.className = "form-feedback success";
        }
      });
    }
  });
})();