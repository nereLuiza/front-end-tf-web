const urlBase = "https://back-end-tf-web-mu.vercel.app";
const container = document.querySelector(".container");

async function carregarImagens() {
  try {
    const response = await fetch(`${urlBase}/imgs`);
    if (!response.ok) {
      throw new Error("Erro ao buscar imagens: " + response.status);
    }

    const data = await response.json();
    container.innerHTML = "";

    data.forEach(item => {
      const div = document.createElement("div");
      div.classList.add("item");

      div.innerHTML = `
        <img class="imagem" src="${item.atalho}" alt="Imagem ${item.code_img}">
      `;

      container.appendChild(div);
    });
  } catch (error) {
    console.error("Erro ao carregar imagens:", error);
    container.innerHTML = "<p>Erro ao carregar imagens.</p>";
  }
}

document.addEventListener("DOMContentLoaded", carregarImagens);
