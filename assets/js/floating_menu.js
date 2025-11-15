document.addEventListener('DOMContentLoaded', function () {
  const floatingTopButton = document.querySelector('.floating_top');

  if (floatingTopButton) {
    floatingTopButton.addEventListener('click', function (event) {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  const floatingMenu = document.querySelector('.floating_menu');

  if (floatingMenu) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 200) {
        floatingMenu.classList.add('is-visible');
      } else {
        floatingMenu.classList.remove('is-visible');
      }
    });
  }
});
