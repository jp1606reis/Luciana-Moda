async function getCart() {
    try {
        const container = document.getElementById('cart-items');
        const footer = document.getElementById('cart-footer-area');
        console.log(footer)
        const res = await fetch(`${API_BASE}/cart`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Cache-Control": "no-cache"
            }
        });

        const { itens, total } = await res.json();
        console.log(total)
        
        

        if (!itens.length) {
            container.innerHTML = `<p class="cart-empty">Seu carrinho está vazio.</p>`;
            footer.innerHTML = '';
            return;
        }

        // Usa as funções do ui-cart.js para renderizar
        container.innerHTML = itens.map(CartItem).join('');
        footer.innerHTML = CartRodape(total);

    } catch (error) {
        console.log(error);
    }
}


async function addToCart(productId, userId) {

    const token = localStorage.getItem("token");

    if (!token) {
        // Se não estiver logado, avisa e abre o login
        toast("Por favor, faça login para adicionar itens à sua sacola ✦");
        
        // Abre o modal de login (função que está no seu ui-modals.js)
        if (typeof openLogin === 'function') {
            openLogin();
        }
        return; // Interrompe a execução aqui
    }

    try {
        const response = await fetch(`${API_BASE}/cart/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`

            },
            body: JSON.stringify({ produtoId: productId }),
        });

        if (!response.ok) throw new Error("Erro ao adicionar item ao carrinho!");

        await getCart();

    } catch (error) {
        console.error("[addToCart]", error);
        alert("Não foi possível adicionar o produto. Tente novamente.");
    }
}

async function updateCartQty(itemId, delta) {
    try {
        const itemEl = document.querySelector(`.cart-item[data-id="${itemId}"]`);
        const qtySpan = itemEl?.querySelector('.qty-num');
        const current = parseInt(qtySpan?.textContent ?? '1', 10);
        const novaQty = current + delta;

        if (novaQty <= 0) {
            await removeCartItem(itemId);
            return;
        }
        console.log("API_BASE:", API_BASE);
        console.log("token:", localStorage.getItem("token"));
        const response = await fetch(`${API_BASE}/cart/updateQtdProduct/${itemId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ quantidade: novaQty }),
        });

        if (!response.ok) throw new Error("Erro ao atualizar quantidade!");

        await getCart();

    } catch (error) {
        console.error("[updateCartQty]", error);
        alert("Não foi possível atualizar a quantidade. Tente novamente.");
    }
}

// Remove um item do carrinho
async function removeCartItem(itemId) {
    try {
        const response = await fetch(`${API_BASE}/cart/${itemId}`, {
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
        const response = await fetch(`${API_BASE}/cart`, {
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
        const response = await fetch(`${API_BASE}/cart/checkout`, {
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

async function updateStateProduct(carrinhoItemId, state) {
    try {
        const response = await fetch(`${API_BASE}/cart/updateStateProduct/${carrinhoItemId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ state }),
        });

        if (!response.ok) {
            throw new Error('Falha ao atualizar estado do produto');
        }

        await getCart();

    } catch (error) {
        console.error('[updateStateProduct]', error);
        alert('Não foi possível atualizar o estado do item do carrinho. Tente novamente.');
    }
}

// Redireciona para a página de checkout
function goCheckout() {
    window.location.href = 'Checkout/checkout.html';
}
