async function autenticar(e) {
    e.preventDefault();
    console.log("[DEBUG] Iniciando autenticação");
  
    try {
      const response = await fetch('https://back-end-tf-web-mu.vercel.app/login', {
        method: 'POST',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({
          email_admin: document.getElementById('email').value,
          senha_admin: document.getElementById('senha').value
        })
      });
  
      console.log("[DEBUG] Status:", response.status);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Erro na autenticação");
      }
  
      localStorage.setItem('auth_token', data.token);
      window.location.href = '/admin/indexA.html';
      
    } catch (error) {
      console.error("[ERRO COMPLETO]", error);
      document.getElementById('msg').textContent = 
        error.message.includes('Failed to fetch') 
          ? "Erro de conexão com o servidor" 
          : error.message;
    }
  }