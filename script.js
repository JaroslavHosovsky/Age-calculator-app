const form = document.querySelector("form");
const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const iconArrow = document.getElementById("icon-arrow");
const daySpan = document.querySelector(".day-span");
const monthSpan = document.querySelector(".month-span");
const yearSpan = document.querySelector(".year-span");

const getBirthDate = () => {
  return yearInput.value + "-" + monthInput.value + "-" + dayInput.value;
};

function calculateAge() {
  // Field required error messages
  const required1 = document.getElementById("required1");
  const required2 = document.getElementById("required2");
  const required3 = document.getElementById("required3");

  if (dayInput.value === "") {
    required1.style.display = "block";
  } else {
    required1.style.display = "none";
  }

  if (monthInput.value === "") {
    required2.style.display = "block";
  } else {
    required2.style.display = "none";
  }

  if (yearInput.value === "") {
    required3.style.display = "block";
  } else {
    required3.style.display = "none";
  }

  // Invalid value error message
  const dayInvalid = document.querySelector(".error-messages1 p:nth-child(2)");
  const monthInvalid = document.querySelector(
    ".error-messages2 p:nth-child(2)"
  );
  const yearInvalid = document.querySelector(".error-messages3 p:nth-child(2)");

  if (dayInput.value === "") {
    dayInvalid.style.display = "none";
  } else if (dayInput.value <= 0) {
    dayInvalid.style.display = "block";
  } else {
    dayInvalid.style.display = "none";
  }

  if (monthInput.value === "") {
    monthInvalid.style.display = "none";
  } else if (monthInput.value > 12 || monthInput.value <= 0) {
    monthInvalid.style.display = "block";
  } else if (["2"].includes(monthInput.value) && dayInput.value > 28) {
    dayInvalid.style.display = "block";
    monthInvalid.style.display = "none";
  } else if (
    ["4", "6", "9", "11"].includes(monthInput.value) &&
    dayInput.value > 30
  ) {
    dayInvalid.style.display = "block";
    monthInvalid.style.display = "none";
  } else if (
    ["1", "3", "5", "7", "8", "10", "12"].includes(monthInput.value) &&
    dayInput.value > 31
  ) {
    dayInvalid.style.display = "block";
    monthInvalid.style.display = "none";
  } else {
    monthInvalid.style.display = "none";
  }

  if (yearInput.value === "") {
    yearInvalid.style.display = "none";
  } else if (yearInput.value > 2024) {
    yearInvalid.style.display = "block";
  } else if (yearInput.value <= 1900) {
    yearInvalid.style.display = "block";
    yearInvalid.textContent = "I hope you're not that old";
  } else {
    yearInvalid.style.display = "none";
  }

  const currentDate = new Date();
  const birthDate = new Date(getBirthDate());

  let userYear = currentDate.getFullYear() - birthDate.getFullYear();
  let userMonth = currentDate.getMonth() - birthDate.getMonth();
  let userDay = currentDate.getDate() - birthDate.getDate();

  // Kontrola, zda je aktuální den menší než den narození
  if (userDay < 0) {
    // Pokud je aktuální den menší než den narození,
    // odečteme jeden měsíc
    userMonth--;

    // Získání počtu dnů v aktuálním měsíci
    const lastMonthDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );
    const daysInLastMonth = lastMonthDate.getDate();

    // Přičtení počtu dnů v aktuálním měsíci k aktuálnímu dni
    userDay += daysInLastMonth;
  }

  // Kontrola, zda je aktuální měsíc menší než měsíc narození
  if (userMonth < 0) {
    // Pokud je aktuální měsíc menší než měsíc narození,
    // odečteme jeden rok a přičteme 12 měsíců
    userYear--;
    userMonth += 12;
  }

  daySpan.textContent = userDay;
  monthSpan.textContent = userMonth;
  yearSpan.textContent = userYear;
}

// Call the function after pressing Enter
const enterHandler = (event) => {
  if (event.keyCode === 13) {
    calculateAge();
  }
};
document.addEventListener("keyup", enterHandler);

// Call the function after pressing the arrow icon
iconArrow.addEventListener("click", () => {
  calculateAge();
});

/* 















*/
// Preventing the possibility to write more characters
dayInput.addEventListener("input", () => {
  if (dayInput.value.length > 2) {
    dayInput.value = dayInput.value.slice(0, 2);
  }
});

monthInput.addEventListener("input", () => {
  if (monthInput.value.length > 2) {
    monthInput.value = monthInput.value.slice(0, 2);
  }
});

yearInput.addEventListener("input", () => {
  if (yearInput.value.length > 4) {
    yearInput.value = yearInput.value.slice(0, 4);
  }
});
