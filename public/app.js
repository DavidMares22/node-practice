document.querySelectorAll(".price").forEach((node) => {
  node.textContent = new Intl.NumberFormat("de-DE", {
    currency: "EUR",
    style: "currency",
  }).format(node.textContent);
});
