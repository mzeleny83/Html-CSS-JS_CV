document.addEventListener("DOMContentLoaded", () => {
  // Kód pro hlasování
  const button = document.getElementById("voteButton");
  const counterElement = document.getElementById("counterValue");

  fetch("https://miroslavzeleny.cz/counter.php")
    .then((response) => response.json())
    .then((data) => {
      counterElement.textContent = data.counter;
    })
    .catch((error) => {
      console.error("Chyba při získávání dat:", error);
    });

  let hasVoted = localStorage.getItem("hasVoted") === "true";
  if (hasVoted) {
    button.disabled = true;
    button.textContent = "Už jste hlasovali";
  }

  button.addEventListener("click", () => {
    fetch("https://miroslavzeleny.cz/counter.php", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        counterElement.textContent = data.counter;
        button.disabled = true;
        button.textContent = "Už jste hlasovali";
        localStorage.setItem("hasVoted", true);
      })
      .catch((error) => {
        console.error("Chyba při získávání dat:", error);
      });
  });

  // Kód pro přidání názoru
  const opinions = document.querySelector(".opinions");
  const opinionButton = document.querySelector(".opinionButton");

  // Funkce pro načtení názorů z localStorage
  const loadOpinions = () => {
    const storedOpinions = localStorage.getItem("opinions");
    if (storedOpinions) {
      JSON.parse(storedOpinions).forEach((opinion) => {
        const p = document.createElement("p");
        p.textContent = opinion;
        opinions.prepend(p);
      });
    }
  };

  // Načtení názorů při načtení stránky
  loadOpinions();

  opinionButton.addEventListener("click", () => {
    const opinion = prompt("Zde napište váš názor");

    if (opinion) {
      const p = document.createElement("p");
      p.textContent = opinion;
      opinions.prepend(p);

      // Uložení názoru do localStorage
      const storedOpinions = localStorage.getItem("opinions");
      const opinionsArray = storedOpinions ? JSON.parse(storedOpinions) : [];
      opinionsArray.push(opinion);
      localStorage.setItem("opinions", JSON.stringify(opinionsArray));
    }
  });
});
