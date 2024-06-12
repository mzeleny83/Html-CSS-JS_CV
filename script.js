document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("voteButton");
  const counterElement = document.querySelector(".counter");

  button.addEventListener("click", () => {
    // Increment the counter on the server
    fetch("https://miroslavzeleny.cz/counter.php", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        counterElement.textContent = data.counter;
        if (data.hasVoted) {
          button.disabled = true;
          button.textContent = "Už jste hlasovali";
        }
      })
      .catch((error) => {
        console.error("Chyba při zpracování požadavku:", error);
      });
  });

  // Fetch the initial counter value and vote status from the server
  fetch("https://miroslavzeleny.cz/counter.php")
    .then((response) => response.json())
    .then((data) => {
      counterElement.textContent = data.counter;
      if (data.hasVoted) {
        button.disabled = true;
        button.textContent = "Už jste hlasovali";
      }
    })
    .catch((error) => {
      console.error("Chyba při načítání počítadla:", error);
    });
});
