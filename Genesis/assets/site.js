"use strict";
const menu = document.querySelector(".menu");
const nav = document.getElementById("site-nav");
function setMenu(open) {
  menu.setAttribute("aria-expanded", String(open));
  nav.dataset.open = String(open);
}
menu.addEventListener("click", () => setMenu(menu.getAttribute("aria-expanded") !== "true"));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    menu.focus();
  }
});

const scenarios = {
  capacity: {
    summary: "Pit 64019 capacity drops to 60,000 CY across the 10-segment corridor.",
    before: 11853424.37,
    after: 11918670.65,
    delta: 65246.28,
    change: "6 segment assignments changed."
  },
  price: {
    summary: "Pit 64019 base FOB price increases from $37.25 to $37.26 per CY.",
    before: 11513388.78,
    after: 11515515.32,
    delta: 2126.54,
    change: "No assignments changed. Costs changed across 10 segments."
  },
  zero: {
    summary: "The price of an unused source changes while supply remains non-binding.",
    before: 11513388.78,
    after: 11513388.78,
    delta: 0,
    change: "Assignments and modeled costs stayed the same."
  }
};
const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const choices = document.querySelectorAll("[data-scenario]");
for (const button of choices) {
  button.addEventListener("click", () => {
    const data = scenarios[button.dataset.scenario];
    for (const choice of choices) choice.setAttribute("aria-pressed", String(choice === button));
    document.getElementById("scenario-summary").textContent = data.summary;
    document.getElementById("before").textContent = currency.format(data.before);
    document.getElementById("after").textContent = currency.format(data.after);
    document.getElementById("delta").textContent = (data.delta > 0 ? "+" : "") + currency.format(data.delta);
    document.getElementById("change").textContent = data.change;
  });
}
