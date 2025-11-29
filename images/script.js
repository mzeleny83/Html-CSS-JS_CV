document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".image");
  images.forEach((image) => {
    image.addEventListener("mouseover", () => {
      image.classList.add("rotate");
    });

    image.addEventListener("mouseout", () => {
      image.classList.remove("rotate");
    });
  });
});
