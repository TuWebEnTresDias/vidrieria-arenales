const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
    siteNav.classList.toggle("open", !isOpen);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú");
    });
  });
}

const contactForm = document.getElementById("contactForm");
const submitButton = document.getElementById("submitConsultation");
const formNote = document.getElementById("formNote");

if (contactForm && submitButton && formNote) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const area = String(formData.get("area") || "").trim();
    const request = String(formData.get("message") || "").trim();
    const message = [
      "Hola, quiero consultar por vidriería o aberturas.",
      "Nombre: " + name,
      "Barrio o localidad: " + (area || "A confirmar"),
      "Consulta: " + request
    ].join("\n");
    const whatsappUrl = new URL("https://wa.me/5491167921496");
    whatsappUrl.searchParams.set("text", message);

    formNote.textContent = "Se abrirá WhatsApp con el mensaje listo. Confirmá allí si querés enviarlo.";
    window.location.assign(whatsappUrl.toString());
  });

  submitButton.disabled = false;
}