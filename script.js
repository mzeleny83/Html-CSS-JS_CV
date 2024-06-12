document.addEventListener("DOMContentLoaded", () => {
  // Najdi tlačítko a element pro počítadlo
  const button = document.querySelector("button");
  const counterElement = document.querySelector(".counter");

  // Nastav počáteční hodnotu počítadla
  let counter = 0;

  // Přidej posluchač událostí pro kliknutí na tlačítko
  button.addEventListener("click", () => {
    // Inkrementuj počítadlo
    counter++;

    // Aktualizuj text v elementu pro počítadlo
    counterElement.textContent = counter;
  });
});
localStorage.removeItem("hasVoted");
localStorage.setItem("hasVoted", false);
