function toggleCart() {
    renderCart()
    getCart()
    document.getElementById('cart-sidebar').classList.toggle('open');
}

function renderCart() {
    console.log('entrou')
    document.getElementById("cart-sidebar").innerHTML = `
        <div class="cart-hdr">
            <h2>Carrinho</h2>
            <button class="cart-close" onclick="toggleCart()">✕</button>
        </div>
        <div class="cart-items" id="cart-items">
            <p>Carregando...</p>
        </div>
    `;
}

function fmt(value) {
    return value.toFixed(2).replace('.', ',');
}

// Renderiza um único item do carrinho como HTML
function CartItem(item) {
    const { id, produtoId, nome, preco, img, tamanho, quantidade } = item;
    return `
        <div class="cart-item" data-id="${id}">
            <div class="ci-img"><img src="${img}" alt=""></div>
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
        </div>
    `;
}

function CartRodape(subtotal, frete, total) {
    return `
        <div class="cart-foot" id="cart-foot">
        
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
        </div>    
    `
}

// export {CartItem, CartRodape}