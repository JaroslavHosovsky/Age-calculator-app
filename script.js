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
