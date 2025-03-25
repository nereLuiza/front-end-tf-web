const urlBase = "https://back-end-tf-web-mu.vercel.app";
const cursos = document.querySelector("#cursos");

async function getCursos() {
  try {
    const response = await fetch(`${urlBase}/cursos`);
    if (!response.ok) {
      throw new Error("Erro ao buscar cursos: " + response.status);
    }

    const data = await response.json();
    cursos.innerHTML = "";

    data.forEach(curso => {
      const div = document.createElement("div");
      div.className = "curso";

      div.innerHTML = `
        <h1>${curso.nome_curso}</h1>
        <p>${curso.desc_curso}</p>
        <a href="${curso.ppc}">Projeto Pedagógico do Curso</a>
        </br>
        <a href="${curso.mcc}">Matriz Curricular do Curso</a>
      `;

      cursos.appendChild(div);
    });
  } catch (error) {
    console.error("Erro ao carregar cursos:", error);
    cursos.innerHTML = "<p>Erro ao carregar cursos.</p>";
  }
}

document.addEventListener("DOMContentLoaded", getCursos);
