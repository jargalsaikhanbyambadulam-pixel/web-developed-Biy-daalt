// Лаб 9.3: js/validators.js

function validateName(value) {
  if (typeof value !== "string") {
    return { valid: false, message: "Нэр текст байх ёстой." };
  }

  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return { valid: false, message: "Нэр хоосон байж болохгүй." };
  }

  if (trimmed.length < 2 || trimmed.length > 50) {
    return { valid: false, message: "Нэр 2–50 тэмдэгтийн хооронд байх ёстой." };
  }

  if (/[0-9]/.test(trimmed)) {
    return { valid: false, message: "Нэр тоо агуулж болохгүй." };
  }

  return { valid: true, value: trimmed, message: "" };
}

function validateEmail(value) {
  if (typeof value !== "string") {
    return { valid: false, message: "И-мэйл буруу байна." };
  }

  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return { valid: false, message: "И-мэйл хоосон байж болохгүй." };
  }

  if (/\s/.test(trimmed)) {
    return { valid: false, message: "И-мэйл зай агуулж болохгүй." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return { valid: false, message: "И-мэйл «нэр@домэйн.өргөтгөл» хэлбэртэй байх ёстой." };
  }

  return { valid: true, value: trimmed, message: "" };
}

function validatePassword(value) {
  if (typeof value !== "string") {
    return { valid: false, message: "Нууц үг буруу байна." };
  }

  if (value.length < 8) {
    return { valid: false, message: "Нууц үг дор хаяж 8 тэмдэгт байх ёстой." };
  }

  if (/\s/.test(value)) {
    return { valid: false, message: "Нууц үг хоосон зай агуулж болохгүй." };
  }

  const hasLetter = /[A-Za-zА-Яа-яЁёӨөҮү]/.test(value);
  const hasDigit = /[0-9]/.test(value);

  if (!hasLetter || !hasDigit) {
    return { valid: false, message: "Нууц үг үсэг болон тоо заавал агуулна." };
  }

  return { valid: true, value, message: "" };
}

function validateMessage(value) {
  if (typeof value !== "string") {
    return { valid: false, message: "Мессеж буруу байна." };
  }

  const trimmed = value.trim();
  if (trimmed.length < 10 || trimmed.length > 500) {
    return { valid: false, message: "Мессеж 10–500 тэмдэгтийн хооронд байх ёстой." };
  }

  return { valid: true, value: trimmed, message: "" };
}