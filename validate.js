document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");
  if (!form) return console.warn("Форма не найдена на странице (class .contact-form).");

  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  const messageInput = document.getElementById("message");

  if (!nameInput || !phoneInput || !messageInput) {
    console.error("Одно из полей (name/phone/message) не найдено. Проверь id полей.");
    return;
  }

  // --- МАСКА ТЕЛЕФОНА ---
  phoneInput.addEventListener("input", handlePhoneInput);
  phoneInput.addEventListener("focus", handlePhoneInput);
  phoneInput.addEventListener("blur", handlePhoneBlur);

  function handlePhoneInput(e) {
    let x = e.target.value.replace(/\D/g, "");
    // Если пользователь удалил всё — не навязываем +7
    if (x.length === 0) {
      e.target.value = "";
      return;
    }
    if (!x.startsWith("7")) x = "7" + x;
    const part1 = x.substring(1, 4);
    const part2 = x.substring(4, 7);
    const part3 = x.substring(7, 9);
    const part4 = x.substring(9, 11);

    let formatted = "+7 (";
    formatted += part1;
    if (x.length > 4) formatted += ") " + part2;
    if (x.length > 7) formatted += "-" + part3;
    if (x.length > 9) formatted += "-" + part4;

    e.target.value = formatted;
  }

  function handlePhoneBlur(e) {
    // Ожидаем полный формат: "+7 (XXX) XXX-XX-XX" => длина 18 символов
    if (e.target.value && e.target.value.length < 18) {
      e.target.value = "";
    }
  }

  // --- ВАЛИДАЦИЯ И ОТОБРАЖЕНИЕ ОШИБОК ---
  form.addEventListener("submit", function (evt) {
    clearErrors();
    let valid = true;

    const nameVal = nameInput.value.trim();
    const phoneVal = phoneInput.value.trim();
    const msgVal = messageInput.value.trim();

    if (!/^[А-Яа-яA-Za-z\s]{3,30}$/.test(nameVal)) {
      showError(nameInput, "Введите корректное имя (3–30 букв).");
      valid = false;
    }

    // Проверяем, что телефон заполнен в полном формате (18 символов)
    if (phoneVal.length < 18) {
      showError(phoneInput, "Введите корректный номер телефона.");
      valid = false;
    }

    if (msgVal.length < 5) {
      showError(messageInput, "Сообщение должно быть минимум 5 символов.");
      valid = false;
    }

    if (!valid) {
      evt.preventDefault();
      // можно сфокусировать первое неверное поле:
      const firstErr = document.querySelector(".error-field");
      if (firstErr) firstErr.focus();
    }
  });

  function showError(input, text) {
    const errorDiv = input.parentElement.nextElementSibling;
    // защита на случай, если структура другая
    const targetError = (errorDiv && errorDiv.classList && errorDiv.classList.contains("error")) ? errorDiv : input.nextElementSibling;
    if (targetError && targetError.classList && targetError.classList.contains("error")) {
      targetError.textContent = text;
    } else {
      // fallback: alert (на случай, если забыли вставить .error)
      console.warn("Контейнер .error не найден рядом с полем.", input);
      alert(text);
    }
    input.classList.add("error-field");
  }

  function clearErrors() {
    document.querySelectorAll(".error").forEach(el => el.textContent = "");
    document.querySelectorAll(".error-field").forEach(el => el.classList.remove("error-field"));
  }
});