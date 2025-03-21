const qual = document.forms;
const code_curso = document.getElementById('code_curso');
code_curso = code_curso.toLowerCase().trim();

const botaoAlt = document.getElementById('submit');
botaoAlt.addEventListener('click', alterarCurso);

const url = `https://back-end-tf-web-mu.vercel.app/curso/${code_curso}`
const token = localStorage.getItem('jwt');

try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    });
  
    if (!response.ok) {
      throw new Error("Erro na requisição: " + response.status);
    }
    const data = await response.json();
  
    console.log(data[0].nome_curso);
  
    document.getElementById('alt-desc').value = data[0].desc_curso;
    document.getElementById('alt-mcc').value = data[0].mcc;
    document.getElementById('alt-ppc').value = data[0].ppc;
  
  } catch (error) {
    console.error("Erro:", error);
    alert("Curso não encontrado!");
    window.location.href = '/admin/altcurso.html';
  }
  
  async function alterarCurso(e) {
    e.preventDefault();
    try {
      const dados = {
        desc_curso: document.getElementById('alt-desc').value,
        mcc: document.getElementById('mcc').value,
        ppc: document.getElementById('ppc').value
      };
  
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify(dados)
      });
  
      if (!response.ok) {
        throw new Error("Erro na requisição: " + response.status);
      }
  
      const data = await response.json();
  
      console.log(data);
  
      alert("Usuário alterado com sucesso!");
      window.location.href = '/admin/altcurso.html';
  
    } catch (error) {
      console.error("Erro:", error);
      alert("Usuário não alterado!");
    }
  }