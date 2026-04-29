async function createUser(params) {
    try {
        const response = await fetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ produtoId: productId, quantidade }),
        });

        if (!response.ok) throw new Error("Erro ao adicionar item ao carrinho!");
    } catch (error) {
        
    }    
}

async function updateUser(params) {
    
}
