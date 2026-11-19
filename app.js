// Лаб 9.4 + Интерактив функцүүд + Dark Mode
document.addEventListener("DOMContentLoaded", () => {
  // 1. Dark Mode
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle?.querySelector(".theme-icon");
  const themeLabel = themeToggle?.querySelector(".theme-label");
  const THEME_KEY = "bileg_theme";

  const setDarkMode = (enabled) => {
    document.body.classList.toggle("dark-mode", enabled);
    themeToggle?.setAttribute("aria-pressed", String(enabled));
    if (themeIcon) themeIcon.textContent = enabled ? "☀️" : "🌙";
    if (themeLabel) themeLabel.textContent = enabled ? "Light Mode" : "Dark Mode";
  };

  if (localStorage.getItem(THEME_KEY) === "dark") {
    setDarkMode(true);
  }

  themeToggle?.addEventListener("click", () => {
    const next = !document.body.classList.contains("dark-mode");
    setDarkMode(next);
    localStorage.setItem(THEME_KEY, next ? "dark" : "light");
  });

  // 2. Бүтээгдэхүүний ангилал шүүлтүүр
  const categoryButtons = document.querySelectorAll(".cat-pill");
  const productCards = document.querySelectorAll(".product-card");

  categoryButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const selectedCat = btn.dataset.category;
      categoryButtons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      productCards.forEach((card) => {
        const match = selectedCat === "all" || card.dataset.category === selectedCat;
        card.classList.toggle("is-hidden", !match);
      });
    });
  });

  // 3. Картын "Дэлгэрэнгүй ->" дарахад захиалгын төрлийг автоматаар сонгох
  const orderTypeSelect = document.getElementById("orderType");
  document.querySelectorAll(".select-product-link").forEach((link) => {
    link.addEventListener("click", () => {
      const card = link.closest(".product-card");
      const orderTypeVal = card?.dataset.orderType;
      if (orderTypeSelect && orderTypeVal) {
        orderTypeSelect.value = orderTypeVal;
      }
    });
  });

  // 4. Helper: талбарын алдаа харуулах / арилгах
  const showFieldError = (inputEl, message) => {
    if (!inputEl) return;
    inputEl.classList.add("input-error");
    let errNode = inputEl.parentElement?.querySelector(".field-error-text");
    if (!errNode) {
      errNode = document.createElement("small");
      errNode.className = "field-error-text";
      inputEl.parentElement?.appendChild(errNode);
    }
    errNode.textContent = message;
  };

  const clearFieldError = (inputEl) => {
    if (!inputEl) return;
    inputEl.classList.remove("input-error");
    const errNode = inputEl.parentElement?.querySelector(".field-error-text");
    if (errNode) {
      errNode.textContent = "";
    }
  };

  // 5. Холбоо барих / Санал хүсэлтийн форм (validators.js ашиглана)
  const contactForm = document.getElementById("contactForm");
  const contactFeedback = document.getElementById("contactFeedback");
  const contactName = document.getElementById("contactName");
  const contactPhone = document.getElementById("contactPhone");
  const contactEmail = document.getElementById("contactEmail");
  const contactMessage = document.getElementById("contactMessage");

  const validateContactField = (field) => {
    if (field === contactName) {
      const res = validateName(contactName.value);
      res.valid ? clearFieldError(contactName) : showFieldError(contactName, res.message);
      return res;
    }
    if (field === contactPhone) {
      const cleaned = contactPhone.value.trim();
      const valid = /^[0-9]{8}$/.test(cleaned);
      valid
        ? clearFieldError(contactPhone)
        : showFieldError(contactPhone, "Утасны дугаар 8 оронтой тоо байх ёстой.");
      return { valid, value: cleaned };
    }
    if (field === contactEmail) {
      const res = validateEmail(contactEmail.value);
      res.valid ? clearFieldError(contactEmail) : showFieldError(contactEmail, res.message);
      return res;
    }
    if (field === contactMessage) {
      const res = validateMessage(contactMessage.value);
      res.valid ? clearFieldError(contactMessage) : showFieldError(contactMessage, res.message);
      return res;
    }
    return { valid: true };
  };

  [contactName, contactPhone, contactEmail, contactMessage].forEach((input) => {
    input?.addEventListener("input", () => validateContactField(input));
    input?.addEventListener("blur", () => validateContactField(input));
  });

  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const rName = validateContactField(contactName);
    const rPhone = validateContactField(contactPhone);
    const rEmail = validateContactField(contactEmail);
    const rMsg = validateContactField(contactMessage);

    if (!rName.valid || !rPhone.valid || !rEmail.valid || !rMsg.valid) {
      if (contactFeedback) {
        contactFeedback.textContent = "Талбаруудын мэдээллийг шалгаад зөв бөглөнө үү.";
        contactFeedback.className = "form-feedback error";
      }
      return;
    }

    if (contactFeedback) {
      contactFeedback.textContent = `Баярлалаа, ${rName.value}! Таны мессеж амжилттай илгээгдлээ.`;
      contactFeedback.className = "form-feedback success";
    }

    contactForm.reset();
    [contactName, contactPhone, contactEmail, contactMessage].forEach(clearFieldError);
  });

  // 6. Захиалгын форм (validateName ашиглана)
  const orderForm = document.getElementById("orderForm");
  const orderFeedback = document.getElementById("orderFeedback");
  const orderName = document.getElementById("orderName");
  const orderPhone = document.getElementById("orderPhone");

  orderForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const nameCheck = validateName(orderName?.value || "");
    const phoneVal = (orderPhone?.value || "").trim();
    const typeVal = orderTypeSelect?.value || "";

    if (!nameCheck.valid) {
      showFieldError(orderName, nameCheck.message);
    } else {
      clearFieldError(orderName);
    }

    if (!/^[0-9]{8}$/.test(phoneVal)) {
      showFieldError(orderPhone, "Утасны дугаар 8 оронтой тоо байх ёстой.");
    } else {
      clearFieldError(orderPhone);
    }

    if (!typeVal) {
      showFieldError(orderTypeSelect, "Захиалгын төрлөө сонгоно уу.");
    } else {
      clearFieldError(orderTypeSelect);
    }

    if (!nameCheck.valid || !/^[0-9]{8}$/.test(phoneVal) || !typeVal) {
      if (orderFeedback) {
        orderFeedback.textContent = "Захиалгын мэдээллээ бүрэн зөв бөглөнө үү.";
        orderFeedback.className = "form-feedback error";
      }
      return;
    }

    if (orderFeedback) {
      orderFeedback.textContent = `Захиалга бүртгэгдлээ, ${nameCheck.value}! Бид ${phoneVal} дугаарт удахгүй холбогдоно.`;
      orderFeedback.className = "form-feedback success";
    }

    orderForm.reset();
    [orderName, orderPhone, orderTypeSelect].forEach(clearFieldError);
  });
});