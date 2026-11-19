
// BILEG US WEBSITE INTERACTIONS

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];


// ===================================
// 1. LIGHT / DARK MODE
// ===================================

const themeToggle = $("#themeToggle");
const themeIcon = $("#themeIcon");
const themeText = $("#themeText");

function setTheme(mode) {
  document.body.classList.toggle("dark-mode", mode === "dark");

  localStorage.setItem("bileg-theme", mode);

  themeIcon.textContent = mode === "dark" ? "☾" : "☀";
  themeText.textContent = mode === "dark" ? "Dark" : "Light";

  themeToggle.setAttribute(
    "aria-pressed",
    String(mode === "dark")
  );
}

setTheme(localStorage.getItem("bileg-theme") || "light");

themeToggle.addEventListener("click", () => {
  setTheme(
    document.body.classList.contains("dark-mode")
      ? "light"
      : "dark"
  );
});


// ===================================
// 2. DESKTOP / MOBILE PREVIEW
// ===================================

const previewLabel = $("#previewLabel");

let previewTimer;

function showPreviewMessage(message) {
  previewLabel.textContent = message;
  previewLabel.classList.add("show");

  clearTimeout(previewTimer);

  previewTimer = setTimeout(() => {
    previewLabel.classList.remove("show");
  }, 1700);
}


// Desktop preview
$("#desktopPreview").addEventListener("click", () => {
  document.body.classList.remove("preview-mobile");

  showPreviewMessage("Компьютерийн харагдац");
});


// Mobile preview
$("#mobilePreview").addEventListener("click", () => {
  document.body.classList.add("preview-mobile");

  showPreviewMessage("Утасны харагдац");
});


// ===================================
// 3. WIREFRAME MODE
// ===================================

$("#wireframeToggle").addEventListener("click", (event) => {

  const enabled =
    document.body.classList.toggle("wireframe-mode");

  event.currentTarget.classList.toggle("selected", enabled);

  showPreviewMessage(
    enabled
      ? "Wireframe харагдац асаалттай"
      : "Wireframe унтарлаа"
  );

});


// ===================================
// 4. MOBILE MENU
// ===================================

$("#menuToggle").addEventListener("click", () => {
  $("#mainNav").classList.toggle("open");
});


// ===================================
// 5. PRODUCT CATEGORY FILTER
// ===================================

$$(".category").forEach(button => {

  button.addEventListener("click", () => {

    $$(".category").forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    const selected = button.dataset.category;

    $$(".product-card").forEach(card => {

      card.classList.toggle(
        "hidden",
        selected !== "all" &&
        card.dataset.category !== selected
      );

    });

  });

});


// ===================================
// 6. SELECT PRODUCT FOR ORDER
// ===================================

$$(".product-link[data-product]").forEach(link => {

  link.addEventListener("click", () => {

    const product = link.dataset.product;

    $("#orderType").value = product;

  });

});


// ===================================
// 7. FILTER DATE CALCULATOR
// ===================================

const filterStages = [1, 2, 3];


// Add months to selected date
function addMonths(dateString, months) {

  const date = new Date(`${dateString}T12:00:00`);

  const day = date.getDate();

  date.setDate(1);

  date.setMonth(date.getMonth() + months);

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  date.setDate(Math.min(day, lastDay));

  return date;
}


// Format date
function displayDate(date) {

  return date.toLocaleDateString("mn-MN", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

}


// Calculate next replacement date
function updateStage(id) {

  const date = $(`#filterDate${id}`).value;

  const months = Number(
    $(`#filterMonth${id}`).value
  );

  const output = $(`#nextDate${id}`);

  output.classList.remove("overdue");


  if (
    !date ||
    !Number.isInteger(months) ||
    months < 1 ||
    months > 60
  ) {

    output.textContent =
      "Огноо болон 1–60 сарын давтамж оруулна уу.";

    return;
  }


  const next = addMonths(date, months);

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const due = new Date(next);

  due.setHours(0, 0, 0, 0);

  const days = Math.ceil(
    (due - today) / 86400000
  );


  if (days < 0) {

    output.textContent =
      `⚠ Солих хугацаа ${Math.abs(days)} хоногоор хэтэрсэн · ${displayDate(next)}`;

    output.classList.add("overdue");

  }

  else if (days === 0) {

    output.textContent =
      `● Өнөөдөр солих өдөр · ${displayDate(next)}`;

  }

  else {

    output.textContent =
      `Дараагийн солих огноо: ${displayDate(next)} · ${days} хоног үлдсэн`;

  }

}


// Listen to date and month inputs
filterStages.forEach(id => {

  [
    `#filterDate${id}`,
    `#filterMonth${id}`

  ].forEach(selector => {

    $(selector).addEventListener("input", () => {
      updateStage(id);
    });

  });

});


// ===================================
// 8. RESTORE SAVED FILTER DATA
// ===================================

const savedFilterData = JSON.parse(
  localStorage.getItem("bileg-filter-data") || "[]"
);

savedFilterData.forEach(item => {

  if (filterStages.includes(item.id)) {

    $(`#filterDate${item.id}`).value =
      item.date || "";

    $(`#filterMonth${item.id}`).value =
      item.months || 1;

    updateStage(item.id);

  }

});


// ===================================
// 9. SAVE FILTER INFORMATION
// ===================================

$("#saveFilterData").addEventListener("click", () => {

  const data = [];

  for (const id of filterStages) {

    const date = $(`#filterDate${id}`).value;

    const months = Number(
      $(`#filterMonth${id}`).value
    );


    if (
      !date ||
      !Number.isInteger(months) ||
      months < 1 ||
      months > 60
    ) {

      $("#filterMessage").textContent =
        `${id}-р шатны огноо болон давтамжийг зөв бөглөнө үү.`;

      return;
    }


    data.push({
      id,
      date,
      months
    });

  }


  localStorage.setItem(
    "bileg-filter-data",
    JSON.stringify(data)
  );


  $("#filterMessage").textContent =
    "✓ Шүүлтүүрийн мэдээлэл энэ төхөөрөмжийн браузерт хадгалагдлаа.";

  checkFilterNotifications();

});


// ===================================
// 10. FILTER REPLACEMENT NOTIFICATION
// ===================================

function checkFilterNotifications() {

  const data = JSON.parse(
    localStorage.getItem("bileg-filter-data") || "[]"
  );

  const today = new Date();

  today.setHours(0, 0, 0, 0);


  data.forEach(item => {

    const next = addMonths(
      item.date,
      item.months
    );

    const days = Math.ceil(
      (next - today) / 86400000
    );


    if (
      days <= 7 &&
      days >= 0 &&
      "Notification" in window &&
      Notification.permission === "granted"
    ) {

      const key =
        `bileg-notice-${item.id}-${next.toISOString().slice(0, 10)}`;


      if (!localStorage.getItem(key)) {

        new Notification(
          "Билэг ус · Шүүлтүүрийн сануулга",
          {
            body:
              `${item.id}-р шатны шүүлтүүр солиход ${days} хоног үлдлээ.`
          }
        );

        localStorage.setItem(key, "sent");

      }

    }

  });

}


// Enable notifications button
$("#enableNotifications").addEventListener("click", async () => {

  if (!("Notification" in window)) {

    $("#filterMessage").textContent =
      "Таны браузер мэдэгдэл дэмжихгүй байна.";

    return;
  }


  const permission =
    await Notification.requestPermission();


  $("#filterMessage").textContent =
    permission === "granted"
      ? "✓ Браузерын сануулга идэвхжлээ. Хугацаа ойртоход мэдэгдэл харуулна."
      : "Мэдэгдлийн зөвшөөрөл олгогдоогүй байна.";


  if (permission === "granted") {
    checkFilterNotifications();
  }

});

checkFilterNotifications();


// ===================================
// 11. ORDER FORM
// ===================================

$("#orderForm").addEventListener("submit", event => {

  event.preventDefault();


  const name = $("#orderName").value.trim();

  const phone = $("#orderPhone").value.trim();

  const product = $("#orderType").value;


  if (!name || !phone || !product) {

    $("#orderFeedback").textContent =
      "Нэр, утас, бүтээгдэхүүнээ заавал бөглөнө үү.";

    return;
  }


  const message = [

    "Сайн байна уу. Билэг усны вебээс захиалга өгөх хүсэлтэй байна.",

    `Нэр: ${name}`,

    `Утас: ${phone}`,

    `Бүтээгдэхүүн: ${product}`,

    `Хаяг: ${$("#orderAddress").value.trim() || "Оруулаагүй"}`,

    `Нэмэлт: ${$("#orderNote").value.trim() || "Байхгүй"}`

  ].join("\n");


  $("#orderFeedback").textContent =
    "WhatsApp руу захиалгын мэдээллийг бэлтгэлээ. Илгээхээс өмнө мэдээллээ шалгана уу.";


  window.open(
    `https://wa.me/97699186600?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener"
  );

});


// ===================================
// 12. ACTIVE NAVIGATION
// ===================================

const sections = $$("main section[id]");

const navLinks = $$(".nav-link");


if ("IntersectionObserver" in window) {

  const observer = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          navLinks.forEach(link => {

            link.classList.toggle(
              "active",
              link.getAttribute("href") ===
              `#${entry.target.id}`
            );

          });

        }

      });

    },
    {
      rootMargin: "-35% 0px -55% 0px"
    }
  );


  sections.forEach(section => {
    observer.observe(section);
  });

}
