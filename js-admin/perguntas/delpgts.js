const btDelete = document.getElementById('submit');
btDelete.addEventListener('click', deletePgt);
const num_pgt = document.getElementById('num_pgt').parseInt();
const url = `https://back-end-tf-web-mu.vercel.app/pgt/${num_pgt}`
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
    alert("Pergunta não encontrada!");
    window.location.href = '/admin/delpgts.html';
  }
  
  async function deletePgt(e) {
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
      
      alert("Pergunta deletada com sucesso!");
      window.location.href = '/admin/altcurso.html';
  
    } catch (error) {
      console.error("Erro:", error);
      alert("Pergunta não deletada!");
    }
  }