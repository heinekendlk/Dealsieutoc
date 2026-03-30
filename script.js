// MOBILE MENU
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileNav = document.getElementById("mobileNav");

mobileMenuBtn.addEventListener("click", () => {
  mobileNav.classList.toggle("show");
});

// FILTER DEALS
const filterButtons = document.querySelectorAll(".filter-btn");
const dealCards = document.querySelectorAll(".deal-card");
const emptyState = document.getElementById("emptyState");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");
    let visibleCount = 0;

    dealCards.forEach((card) => {
      const categories = card.getAttribute("data-category");

      if (filter === "all" || categories.includes(filter)) {
        card.classList.remove("hidden");
        visibleCount++;
      } else {
        card.classList.add("hidden");
      }
    });

    if (visibleCount === 0) {
      emptyState.style.display = "block";
    } else {
      emptyState.style.display = "none";
    }
  });
});

// COPY CODE
const copyButtons = document.querySelectorAll(".copy-btn, .voucher-copy");
const toast = document.getElementById("toast");

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const code = button.getAttribute("data-code");

    try {
      await navigator.clipboard.writeText(code);
      showToast(`Đã copy mã: ${code}`);
    } catch (error) {
      fallbackCopy(code);
      showToast(`Đã copy mã: ${code}`);
    }
  });
});

function fallbackCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}
