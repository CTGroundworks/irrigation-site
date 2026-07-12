(function () {
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.addEventListener("click", function (event) {
      if (event.target && event.target.tagName === "A") {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  var gallery = document.getElementById("gallery-grid");
  var data = window.CTG_SITE_DATA;

  if (gallery && data && Array.isArray(data.galleryImages)) {
    gallery.innerHTML = data.galleryImages.map(function (image) {
      return [
        '<figure class="gallery-item">',
        '<img src="' + image.src + '" alt="' + image.alt + '" loading="lazy">',
        '<figcaption><strong>' + image.title + '</strong><span>' + image.caption + '</span></figcaption>',
        '</figure>'
      ].join("");
    }).join("");
  }
}());
