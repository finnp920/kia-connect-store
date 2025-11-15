document.addEventListener('DOMContentLoaded', function () {
  const pdpElement = document.querySelector('.youtubeArea_pdp');

  if (pdpElement) {
    const youtube_id =
      pdpElement.dataset.value || pdpElement.getAttribute('value');
    pdpElement.innerHTML = `<iframe src="https://www.youtube.com/embed/${youtube_id}?controls=1&rel=0&showsearch=0" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  }
});
