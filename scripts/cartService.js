var API_BASE = "http://localhost:3000";

// Formata valor monetário para pt-BR
function fmt(value) {
    return value.toFixed(2).replace('.', ',');
}

// Renderiza um único item do carrinho como HTML
function renderCartItem(item) {
    const { id, nomeProduto, categoria, imagem, quantidade, precoUnico } = item;
    return `
        <div class="cart-item" data-id="${id}">
            <div class="ci-img">${imagem}</div>
            <div class="ci-info">
                <div class="ci-name">${nomeProduto}</div>
                <div class="ci-cat">${categoria}</div>
                <div class="ci-qty">
                    <button class="qty-btn" onclick="updateCartQty(${id}, -1)">−</button>
                    <span class="qty-num">${quantidade}</span>
                    <button class="qty-btn" onclick="updateCartQty(${id}, 1)">+</button>
                </div>
                <button class="ci-remove" onclick="removeCartItem(${id})">Remover</button>
            </div>
            <div class="ci-price">R$ ${fmt(precoUnico * quantidade)}</div>
        </div>
    `;
}

// Busca e exibe todos os itens do carrinho
async function getCart() {
    const el = document.getElementById('cart-items');
    const ft = document.getElementById('cart-foot');
    const badge = document.getElementById('cart-badge');


    try {
        const response = await fetch(`${API_BASE}/carrinho`);
        if (!response.ok) throw new Error("Erro ao buscar dados do carrinho!");

        const cartData = await response.json();

        // A API pode retornar um único objeto ou um array de itens
        const items = Array.isArray(cartData) ? cartData : [cartData];

        if (items.length === 0) {
            el.innerHTML = `<p class="cart-empty">Seu carrinho está vazio.</p>`;
            ft.innerHTML = '';
            badge.textContent = '0';
            return;
        }

        // Renderiza os itens
        el.innerHTML = items.map(renderCartItem).join('');

        // Calcula totais
        const totalQtd = items.reduce((sum, i) => sum + i.quantidade, 0);
        const subtotal = items.reduce((sum, i) => sum + (i.precoUnico * i.quantidade), 0);
        const frete = items[0]?.frete ?? 0;
        const total = subtotal + frete;

        // Atualiza rodapé e badge
        ft.innerHTML = `
            <div class="cart-summary">
                <div class="summary-row">
                    <span>Subtotal</span>
                    <span>R$ ${fmt(subtotal)}</span>
                </div>
                <div class="summary-row">
                    <span>Frete</span>
                    <span>${frete > 0 ? 'R$ ' + fmt(frete) : 'Grátis'}</span>
                </div>
                <div class="summary-row summary-total">
                    <span>Total</span>
                    <span>R$ ${fmt(total)}</span>
                </div>
                <button class="btn-checkout" onclick="checkout()">Finalizar Compra</button>
            </div>
        `;

        badge.textContent = totalQtd;
        
    } catch (error) {
        console.error("[getCart]", error);
        el.innerHTML = `<div class="cart-empty"><div class="cart-empty-icon">🛍</div><p style="font-size:.82rem;letter-spacing:.06em">Seu carrinho está vazio</p></div>`;
        // ft.style.display = 'none';
    }
}

// Adiciona um produto ao carrinho
async function addToCart(productId, quantidade = 1) {
    try {
        const response = await fetch(`${API_BASE}/carrinho`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ produtoId: productId, quantidade }),
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