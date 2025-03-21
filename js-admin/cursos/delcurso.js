const btDelete = document.getElementById('bt-excluir');
btDelete.addEventListener('click', deleteCurso);
const code_curso = document.getElementById('code_curso').toLowerCase().trim();

const url = "https://back-end-tf-web-mu.vercel.app/curso/${code_curso}"
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

  } catch (error) {
    console.error("Erro:", error);
    alert("Curso não encontrado!");
    window.location.href = '/admin/delcurso.html';
  }
  
  async function deleteCurso(e) {
    e.preventDefault();
    try {  
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'x-access-token': token
        },
      });
  
      if (!response.ok) {
        throw new Error("Erro na requisição: " + response.status);
      }
      
      alert("Usuário alterado com sucesso!");
      window.location.href = '/admin/altcurso.html';
  
    } catch (error) {
      console.error("Erro:", error);
      alert("Usuário não deletado!");
    }
  }