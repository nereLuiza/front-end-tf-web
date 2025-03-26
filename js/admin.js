async function autenticar(e) {
    e.preventDefault();
    console.log("Iniciando autenticação...");
  
    const API_URL = 'https://back-end-tf-web-mu.vercel.app/login';
    const currentOrigin = window.location.origin;
  
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Origin': currentOrigin // Adiciona o header Origin manualmente
        },
        body: JSON.stringify({
          email_admin: document.getElementById('email').value,
          senha_admin: document.getElementById('senha').value
        })
      });
  
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      localStorage.setItem('jwt', data.token);
      window.location.href = '/admin/indexA.html';
  
    } catch (error) {
      console.error("Erro completo:", error);
      document.getElementById('msg').innerText = 
        "Erro durante o login. Verifique o console (F12) para detalhes.";
    }
  }