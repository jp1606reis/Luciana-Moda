function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const isOpen = sidebar.classList.toggle('open');
    
    if (isOpen) {
        renderCart(); // Desenha o cabeçalho e estrutura
        getCart();    // Busca os dados (está no cartService.js)
    }
}

// 2. Desenha a estrutura interna do carrinho (a "casca")
function renderCart() {
    const sidebar = document.getElementById("cart-sidebar");
    sidebar.innerHTML = `
        <div class="cart-hdr">
            <h2>Carrinho</h2>
            <button class="cart-close" onclick="toggleCart()">✕</button>
        </div>
        <div class="cart-items" id="cart-items">
            <p class="loading-msg">Carregando seus mimos...</p>
        </div>
        <div id="cart-footer-area"></div>
    `;
}

function CartItem(item) {
    const { id, produtoId, nome, preco, img, tamanho, quantidade, state } = item;
    return `
        <div class="cart-item" data-id="${id}">
            <div class="ci-img"><img src="${img}" alt="${nome}"></div>
            <div class="ci-info">
                <div class="ci-name">${nome}</div>
                <div class="ci-size">${tamanho}</div>
                <div class="ci-qty">
                    <button class="qty-btn" onclick="updateCartQty(${id}, -1)">−</button>
                    <span class="qty-num">${quantidade}</span>
                    <button class="qty-btn" onclick="updateCartQty(${id}, 1)">+</button>
                </div>
                <button class="ci-remove" onclick="removeCartItem(${id})">Remover</button>
            </div>
            <div class="ci-price">R$ ${fmt(preco * quantidade)}</div>
            
            <div class="ci-select">
                <input type="checkbox" 
                       class="cart-item-check" 
                       value="${id}"
                       ${state ? "checked" : ""} 
                       onchange="updateStateProduct(${id}, this.checked)">
            </div>
        </div>
    `;
}

function CartRodape(subtotal) {
    return `
        <div class="cart-foot" id="cart-foot">
            <div class="cart-sub-row">
                <span>Subtotal</span>
                <span id="cart-total">R$ ${fmt(subtotal)}</span>
            </div>
            <div class="cart-sub-row">
                <span>Frete</span>
                <span id="cart-frete">Calculado no checkout</span>
            </div>
            <button class="btn-checkout" onclick="closeCheckout()">Fechar Pedido →</button>
        </div>
    `;
}