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

  var contactForms = document.querySelectorAll(".quote-form");

  contactForms.forEach(function (form) {
    form.addEventListener("submit", function (event) {
      var host = window.location.hostname;
      var isCloudflare = host === "groundworkstx.com" || host.indexOf("pages.dev") !== -1 || host === "127.0.0.1" || host === "localhost";

      if (!isCloudflare) {
        return;
      }

      event.preventDefault();

      var formData = new FormData(form);

      if (formData.get("bot-field")) {
        return;
      }

      var labels = {
        name: "Name",
        email: "Email",
        phone: "Phone",
        service: "Service needed",
        location: "Property city or area",
        details: "Project description",
        "project-size": "Approximate project size",
        timeframe: "Desired timeframe",
        access: "Access limitations",
        hauling: "Hauling or disposal needed",
        "preferred-contact": "Preferred contact method"
      };

      var lines = ["New project details from groundworkstx.com", ""];

      Object.keys(labels).forEach(function (key) {
        var values = formData.getAll(key).filter(Boolean);

        if (values.length) {
          lines.push(labels[key] + ": " + values.join(", "));
        }
      });

      lines.push("");
      lines.push("Note: Photo uploads are not included in this email fallback. Please attach or text photos of the property, access points, slopes, drains, standing water, turf, beds, or cleanup area if available.");

      var subject = encodeURIComponent("Groundworks project details");
      var body = encodeURIComponent(lines.join("\n"));
      var status = form.querySelector(".form-status");

      if (!status) {
        status = document.createElement("p");
        status.className = "form-status";
        form.appendChild(status);
      }

      status.textContent = "Thank you. Your project details are ready to send. Your email app should open now; you can also call or text photos to (512) 745-4602.";
      window.location.href = "mailto:contact@groundworkstx.com?subject=" + subject + "&body=" + body;
    });
  });
}());
