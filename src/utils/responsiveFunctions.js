export const OpenCloseMenu = () => {
  try {
    const burger = document.getElementById("burger-menu");
    const closeButton = document.getElementById("closeMenu");
    burger.onclick = function name(params) {
      const menu = document.getElementById("sidebar");
      menu.classList.remove("hidden");
      menu.classList.remove("hidden");
    };
    closeButton.onclick = function name(params) {
      const menu = document.getElementById("sidebar");
      menu.classList.add("hidden");
    };
  } catch (e) {
    console.log(e);
  }
};
export const goTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};
