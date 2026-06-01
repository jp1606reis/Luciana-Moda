async function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const isOpen = sidebar.classList.toggle('open');

    if (isOpen) {
        renderCart();

        // Verifica se o usuário tem o token
        const token = localStorage.getItem("token");

        if (!token) {
            renderEmptyCartWithoutLogin();
            return;
        }

        await getCart();
    }
}

function renderCart() {
    const sidebar = document.getElementById("cart-sidebar");
    sidebar.innerHTML = `
        <div class="cart-container">
            <div class="cart-hdr">
                <h2>Carrinho</h2>
                <button class="cart-close" onclick="toggleCart()">✕</button>
            </div>
            
            <div class="cart-body" id="cart-items">
                <p class="loading-msg">Carregando seus mimos...</p>
            </div>
            
            <div class="cart-footer-fixed" id="cart-footer-area"></div>
        </div>
    `;
}

function CartItem(item) {
    const { id, produtoId, nome, preco, img, tamanho, quantidade, selected } = item;
    return `
        <div class="cart-item" data-id="${id}">
            <!-- 1. Checkbox agora vem primeiro -->
            <div class="ci-select">
                <input type="checkbox" 
                       class="cart-item-check" 
                       ${selected ? "checked" : ""} 
                       onchange="updateStateProduct(${id}, this.checked)">
            </div>

            <!-- 2. Imagem -->
            <div class="ci-img"><img src="${img}" alt="${nome}"></div>

            <!-- 3. Informações -->
            <div class="ci-info">
                <div class="ci-name">${nome}</div>
                <div class="ci-size">${tamanho}</div>
                <div class="ci-qty">
                    <button class="qty-btn" onclick="updateCartQty(${id}, -1)">−</button>
                    <span class="qty-num">${quantidade}</span>
                    <button class="qty-btn" onclick="updateCartQty(${id}, 1)">+</button>
                </div>
            </div>

            <!-- 4. Preço -->
            <div class="ci-price">R$ ${fmt(preco * quantidade)}</div>
        </div>
    `;
}

function CartRodape(total) {
    return `
        <div class="cart-total-row">
            <span class="cart-total-label">Total da Compra</span>
            <span class="cart-total-value" id="cart-total">R$ ${fmt(total)}</span>
        </div>
        
        <button class="btn-checkout" onclick="goCheckout()">
            FECHAR PEDIDO →
        </button>
        
        <p class="cart-footer-note">
            Taxas e frete calculados no próximo passo.
        </p>
    `;
}


function renderEmptyCartWithoutLogin() {
    const container = document.getElementById('cart-items');
    const footer = document.getElementById('cart-footer-area');

    // Remove o "Carregando..." e coloca a mensagem de indução
    container.innerHTML = `
        <div class="cart-empty">
            <div class="cart-empty-icon">🛍</div>
            <p>
                Para visualizar seus itens e finalizar o pedido, acesse sua conta em nossa plataforma.
            </p>
            <button class="btn-checkout" onclick="toggleCart(); openLogin();" style="background: var(--gold); border-color: var(--gold);">
            FAZER LOGIN AGORA
        </button>
        </div>
    `;


}

function recalcularTotal() {
    const itens = document.querySelectorAll('.cart-item');
    let total = 0;

    itens.forEach(item => {
        const checkbox = item.querySelector('.cart-item-check');
        if (checkbox.checked) {
            const preco = parseFloat(item.querySelector('.ci-price').textContent.replace('R$ ', '').replace(',', '.'));
            total += preco;
        }
    });

    const totalEl = document.getElementById('cart-total') || document.querySelector('.cart-total-value');
    if (totalEl) {
        totalEl.textContent = `R$ ${fmt(total)}`;
    }
}