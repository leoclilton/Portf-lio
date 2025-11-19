document.addEventListener("DOMContentLoaded", () => {
  // 1. Máquina de Escrever (Personalizado para o Leo)
  const cargoElement = document.getElementById("cargo");
  const cargos = [
    "Estudante de ADS",
    "Desenvolvedor Front-end",
    "Analista de Sistemas",
  ];
  let cargoIndex = 0,
    charIndex = 0;

  function typeWriter() {
    if (cargoElement && charIndex < cargos[cargoIndex].length) {
      cargoElement.textContent += cargos[cargoIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, 100);
    } else {
      setTimeout(eraseText, 2000);
    }
  }
  function eraseText() {
    if (charIndex > 0) {
      cargoElement.textContent = cargos[cargoIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(eraseText, 50);
    } else {
      cargoIndex = (cargoIndex + 1) % cargos.length;
      setTimeout(typeWriter, 500);
    }
  }
  if (cargoElement) typeWriter();

  // 2. Modal
  const cards = document.querySelectorAll(".project-item");
  const modal = document.getElementById("modal-projeto");
  const btnFechar = document.getElementById("modal-close-btn");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      document.getElementById("modal-titulo").textContent =
        card.getAttribute("data-titulo");
      document.getElementById("modal-imagem").src =
        card.getAttribute("data-imagem");
      document.getElementById("modal-descricao").textContent =
        card.getAttribute("data-descricao");
      document.getElementById("modal-tecnologias").textContent =
        card.getAttribute("data-tecnologias");
      document.getElementById("modal-link-projeto").href =
        card.getAttribute("data-link-projeto");
      document.getElementById("modal-link-github").href =
        card.getAttribute("data-link-github");
      modal.classList.add("visivel");
    });
  });

  if (btnFechar)
    btnFechar.addEventListener("click", () =>
      modal.classList.remove("visivel")
    );
  if (modal)
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("visivel");
    });

  // 3. Menu Mobile
  const btnMobile = document.getElementById("btn-mobile");
  const navLinks = document.getElementById("nav-links");
  if (btnMobile)
    btnMobile.addEventListener("click", () =>
      navLinks.classList.toggle("nav-ativa")
    );
  navLinks
    .querySelectorAll("a")
    .forEach((link) =>
      link.addEventListener("click", () =>
        navLinks.classList.remove("nav-ativa")
      )
    );

  // 4. Dark Mode
  const themeButton = document.getElementById("theme-toggle");
  const body = document.body;
  if (localStorage.getItem("theme_leo") === "dark")
    body.classList.add("dark-mode");

  if (themeButton) {
    themeButton.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      localStorage.setItem(
        "theme_leo",
        body.classList.contains("dark-mode") ? "dark" : "light"
      );
    });
  }

  // 5. Formulário AJAX
  const form = document.getElementById("form-contato");
  const formStatus = document.getElementById("form-status");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      formStatus.innerHTML = "Enviando...";
      formStatus.style.color = body.classList.contains("dark-mode")
        ? "#eee"
        : "#333";
      fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { Accept: "application/json" },
      })
        .then((r) => {
          if (r.ok) {
            formStatus.innerHTML = "Sucesso!";
            formStatus.style.color = "green";
            form.reset();
          } else {
            formStatus.innerHTML = "Erro.";
            formStatus.style.color = "red";
          }
        })
        .catch(() => {
          formStatus.innerHTML = "Erro de rede.";
          formStatus.style.color = "red";
        });
    });
  }
});
