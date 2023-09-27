document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");

    searchInput.addEventListener("input", function () {
      const searchTerm = searchInput.value.toLowerCase();
      const cards = document.querySelectorAll(".card");

      cards.forEach(function (card) {
        const cardTitle = card.querySelector(".card-title").textContent.toLowerCase();
        const cardText = card.querySelector(".card-text").textContent.toLowerCase();

        if (cardTitle.includes(searchTerm) || cardText.includes(searchTerm)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

