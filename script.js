const cards = [...document.querySelectorAll(".poem-card")];
const filters = [...document.querySelectorAll(".filter")];
const searchInput = document.getElementById("searchInput");
const emptyMessage = document.getElementById("emptyMessage");
const toast = document.getElementById("toast");
let activeCategory = "all";
let toastTimer;

function updateCards() {
  const query = searchInput.value.trim();
  let visible = 0;
  cards.forEach(card => {
    const categoryMatch = activeCategory === "all" || card.dataset.category === activeCategory;
    const textMatch = card.innerText.includes(query);
    const show = categoryMatch && textMatch;
    card.hidden = !show;
    if (show) visible++;
  });
  emptyMessage.hidden = visible !== 0;
}

filters.forEach(button => {
  button.addEventListener("click", () => {
    filters.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    activeCategory = button.dataset.category;
    updateCards();
  });
});
searchInput.addEventListener("input", updateCards);

document.querySelectorAll(".copy-btn").forEach(button => {
  button.addEventListener("click", async () => {
    const verse = button.closest(".poem-card").querySelector(".verse").innerText;
    try {
      await navigator.clipboard.writeText(verse);
      toast.textContent = "شعر کاپی ہو گیا!";
    } catch {
      toast.textContent = "کاپی نہیں ہو سکا، شعر منتخب کر کے کاپی کریں۔";
    }
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
  });
});
document.getElementById("year").textContent = new Date().getFullYear();