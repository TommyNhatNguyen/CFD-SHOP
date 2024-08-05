export const scrollTop = (e) => {
  e?.preventDefault();
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};
