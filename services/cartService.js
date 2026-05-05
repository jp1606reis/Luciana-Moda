var API_BASE = "http://localhost:3000";
async function getCart() {
    const el = document.getElementById('cart-items');
    try {
        const res = await fetch(`${API_BASE}/cart`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        const items = await res.json();

        console.log(items)
        if (items.length === 0) {
            el.innerHTML = `<p class="cart-empty">Seu carrinho está vazio.</p>`;
            return;
        }

        const subtotal = items.reduce((sum, i) => sum + (i.precoUnico * i.quantidade), 0);
        const frete = 0;

        el.innerHTML = items.map(CartItem).join('') + CartRodape(subtotal, frete, subtotal + frete);

        console.log(el.innerHTML)
    } catch (error) {
        console.log(error)
        el.innerHTML = `<p class="cart-empty">Erro ao carregar carrinho.</p>`;
    }
}


// Adiciona um produto ao carrinho
async function addToCart(productId, userId) {
    try {
        const response = await fetch(`${API_BASE}/cart/add`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`

             },
            body: JSON.stringify({ produtoId: productId}),
        });

        if (!response.ok) throw new Error("Erro ao adicionar item ao carrinho!");

        await getCart(); // Atualiza a exibição do carrinho

    } catch (error) {
        console.error("[addToCart]", error);
        alert("Não foi possível adicionar o produto. Tente novamente.");
    }
}

// Atualiza a quantidade de um item (+1 ou -1)
async function updateCartQty(itemId, delta) {
    try {
        // Lê a quantidade atual do DOM para evitar uma requisição extra
        const itemEl = document.querySelector(`.cart-item[data-id="${itemId}"]`);
        const qtySpan = itemEl?.querySelector('.qty-num');
        const current = parseInt(qtySpan?.textContent ?? '1', 10);
        const novaQty = current + delta;

        // Se chegar a 0, remove o item
        if (novaQty <= 0) {
            await removeCartItem(itemId);
            return;
        }

        const response = await fetch(`${API_BASE}/carrinho/${itemId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantidade: novaQty }),
        });

        if (!response.ok) throw new Error("Erro ao atualizar quantidade!");

        await getCart(); // Re-renderiza o carrinho atualizado

    } catch (error) {
        console.error("[updateCartQty]", error);
        alert("Não foi possível atualizar a quantidade. Tente novamente.");
    }
}

// Remove um item do carrinho
async function removeCartItem(itemId) {
    try {
        const response = await fetch(`${API_BASE}/carrinho/${itemId}`, {
            method: 'DELETE',
        });

        if (!response.ok) throw new Error("Erro ao remover item do carrinho!");

        await getCart(); // Atualiza a exibição após remoção

    } catch (error) {
        console.error("[removeCartItem]", error);
        alert("Não foi possível remover o produto. Tente novamente.");
    }
}

// Limpa todos os itens do carrinho
async function clearCart() {
    const confirmed = confirm("Deseja realmente limpar o carrinho?");
    if (!confirmed) return;

    try {
        const response = await fetch(`${API_BASE}/carrinho`, {
            method: 'DELETE',
        });

        if (!response.ok) throw new Error("Erro ao limpar o carrinho!");

        await getCart();

    } catch (error) {
        console.error("[clearCart]", error);
        alert("Não foi possível limpar o carrinho. Tente novamente.");
    }
}

// Finaliza a compra
async function checkout() {
    try {
        const response = await fetch(`${API_BASE}/carrinho/checkout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error("Erro ao finalizar compra!");

        const result = await response.json();

        alert(`Compra finalizada com sucesso! Pedido #${result.pedidoId}`);
        await getCart(); // Carrinho deve vir vazio após o checkout

    } catch (error) {
        console.error("[checkout]", error);
        alert("Não foi possível finalizar a compra. Tente novamente.");
    }
}