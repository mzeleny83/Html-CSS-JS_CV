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
        localStorage.setItem("hasVoted", "true");
      })
      .catch((error) => {
        console.error("Chyba při získávání dat:", error);
      });
  });

  // Kód pro přidání názoru
  const opinions = document.querySelector(".opinions");
  const opinionButton = document.querySelector(".opinionButton");

  // Funkce pro načtení názorů z serveru
  const loadOpinions = () => {
    fetch("https://miroslavzeleny.cz/opinions.php")
      .then((response) => response.json())
      .then((opinionsArray) => {
        opinionsArray.forEach((opinion) => {
          const p = document.createElement("p");
          p.textContent = opinion;
          opinions.prepend(p);
        });
      })
      .catch((error) => {
        console.error("Chyba při načítání názorů:", error);
      });
  };

  // Načtení názorů při načtení stránky
  loadOpinions();

  let hasSubmittedOpinion =
    localStorage.getItem("hasSubmittedOpinion") === "true";
  if (hasSubmittedOpinion) {
    opinionButton.disabled = true;
    opinionButton.textContent = "Názor již přidán";
  }

  opinionButton.addEventListener("click", () => {
    const opinion = prompt("Zde napište váš názor");

    if (opinion) {
      const p = document.createElement("p");
      p.textContent = opinion;
      opinions.prepend(p);

      // Odeslání názoru na server
      fetch("https://miroslavzeleny.cz/opinions.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: opinion }),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            opinionButton.disabled = true; // Deaktivace tlačítka
            opinionButton.textContent = "Názor již přidán";
            localStorage.setItem("hasSubmittedOpinion", "true");
          } else {
            console.error("Chyba při ukládání názoru:", result.message);
          }
        })
        .catch((error) => {
          console.error("Chyba při ukládání názoru:", error);
        });
    }
  });
});
