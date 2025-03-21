const urlBase = "https://back-end-tf-web-mu.vercel.app";
const cursos = document.querySelector("#cursos");

async function getCursos() {
  try {
    const response = await fetch(`${urlBase}/cursos`);
    if (!response.ok) {
      throw new Error("Erro ao buscar imagens: " + response.status);
    }

    const data = await response.json();
    container.innerHTML = "";

    data.forEach(item => {
      const div = document.createElement("div");
      div.className = "curso";

      div.innerHTML = `
        <h1>${item.nomeCurso}</h1>
        <p>
            ${item.desc_curso}
        </p>
        <a href="${item.ppc}">Projeto Pedagógico do Curso</a>
        <a href="${item.mcc}">Matriz Curricular do Curso</a>
      `;

      cursos.appendChild(div);
    });
  } catch (error) {
    console.error("Erro ao carregar cursos:", error);
    cursos.innerHTML = "<p>Erro ao carregar cursos.</p>";
  }
}

document.addEventListener("DOMContentLoaded", getCursos);
