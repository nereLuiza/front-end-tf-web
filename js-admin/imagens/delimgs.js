const btDelete = document.getElementById('bt-excluir');
btDelete.addEventListener('click', deleteImg);
const code_img = document.getElementById('code_img').parseInt();

const url = `https://back-end-tf-web-mu.vercel.app/img/${code_img}`
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
    window.location.href = '/admin/delimgs.html';
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
      
      alert("Imagem excluída com sucesso!");
      window.location.href = '/admin/altcurso.html';
  
    } catch (error) {
      console.error("Erro:", error);
      alert("Imagem não deletada!");
    }
  }