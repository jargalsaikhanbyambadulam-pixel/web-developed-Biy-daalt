(() => {
  const THEME_KEY = "bileg_theme";
  const toggleBtn = document.getElementById("themeToggle");

  const setDark = (dark) => {
    document.body.classList.toggle("dark-mode", dark);
    if (toggleBtn) {
      toggleBtn.setAttribute("aria-pressed", String(dark));
      const label = toggleBtn.querySelector(".dark-label");
      if (label) label.textContent = dark ? "Light" : "Dark";
    }
    try {
      localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
    } catch (_) {}
  };

  try {
    if (localStorage.getItem(THEME_KEY) === "dark") {
      setDark(true);
    }
  } catch (_) {}

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      setDark(!document.body.classList.contains("dark-mode"));
    });
  }

  // Ангиллын шүүлтүүр
  const tabs = document.querySelectorAll(".cat-tab");
  const cards = document.querySelectorAll(".prod-card");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const cat = tab.dataset.category || "all";
      tabs.forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");

      cards.forEach((card) => {
        const match = cat === "all" || card.dataset.category === cat;
        card.classList.toggle("is-hidden", !match);
      });
    });
  });

  // Хадгалах товч (♡ / ♥)
  document.querySelectorAll(".fav-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const liked = btn.classList.toggle("is-liked");
      btn.textContent = liked ? "♥" : "♡";
    });
  });

  // Дэлгэрэнгүй modal
  const modal = document.getElementById("infoModal");
  const closeModal = document.getElementById("closeInfoModal");
  const orderLink = document.getElementById("mOrderLink");
  const orderTypeSelect = document.getElementById("orderType");
  let selectedType = "";

  document.querySelectorAll(".prod-more").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".prod-card");
      if (!card || !modal) return;
      document.getElementById("mCat").textContent = card.querySelector(".prod-cat").textContent;
      document.getElementById("mTitle").textContent = card.dataset.title || "";
      document.getElementById("mPrice").textContent = card.dataset.price || "";
      document.getElementById("mDesc").textContent = card.dataset.desc || "";
      selectedType = card.dataset.orderType || "";
      modal.hidden = false;
    });
  });

  if (closeModal && modal) {
    closeModal.addEventListener("click", () => {
      modal.hidden = true;
    });
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.hidden = true;
    });
  }

  if (orderLink && modal) {
    orderLink.addEventListener("click", () => {
      if (orderTypeSelect && selectedType) {
        orderTypeSelect.value = selectedType;
      }
      modal.hidden = true;
    });
  }

  // Захиалгын форм
  const orderForm = document.getElementById("orderForm");
  if (orderForm) {
    orderForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = (document.getElementById("orderName").value || "").trim();
      const phone = (document.getElementById("orderPhone").value || "").trim();
      const type = document.getElementById("orderType").value;
      const fb = document.getElementById("orderFeedback");

      if (name.length < 2 || !/^[0-9]{8}$/.test(phone) || !type) {
        fb.textContent = "Нэр, 8 оронтой утас болон захиалгын төрлөө зөв бөглөнө үү.";
        fb.className = "form-note err";
        return;
      }
      fb.textContent = `Захиалга бүртгэгдлээ, ${name}! Бид ${phone} дугаарт холбогдоно.`;
      fb.className = "form-note ok";
      orderForm.reset();
    });
  }

  // Холбоо барих форм
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = (document.getElementById("contactName").value || "").trim();
      const phone = (document.getElementById("contactPhone").value || "").trim();
      const email = (document.getElementById("contactEmail").value || "").trim();
      const msg = (document.getElementById("contactMessage").value || "").trim();
      const fb = document.getElementById("contactFeedback");

      if (name.length < 2 || !/^[0-9]{8}$/.test(phone) || !email.includes("@") || msg.length < 5) {
        fb.textContent = "Талбаруудын мэдээллийг бүрэн зөв бөглөнө үү.";
        fb.className = "form-note err";
        return;
      }
      fb.textContent = `Баярлалаа, ${name}! Таны мессеж илгээгдлээ.`;
      fb.className = "form-note ok";
      contactForm.reset();
    });
  }
})();