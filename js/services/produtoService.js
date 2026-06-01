
const BGS = [
    'radial-gradient(ellipse at 40% 60%,#2a1e1e,#1c1412)',
    'radial-gradient(ellipse at 60% 40%,#1a1e2a,#12141c)',
    'radial-gradient(ellipse at 50% 50%,#1e2a1e,#121c14)',
    'radial-gradient(ellipse at 30% 70%,#2a261a,#1c1a12)',
    'radial-gradient(ellipse at 70% 30%,#2a1e26,#1c1220)',
    'radial-gradient(ellipse at 45% 55%,#1e2a26,#121c1a)',
];

function prodCard(p, showSizes = true) {
    return `
    <div class="prod-card">
        <div class="prod-img" style="background:${BGS[p.id % BGS.length]}">
            ${p.img ? `<img src="imgs/image.png" alt="${p.nome}" style="width:100%;height:100%;object-fit:cover;position:absolute;top:0;left:0;">` : ''}
            ${p.badge ? `<div class="prod-badge badge-${p.badge}">${p.badge === 'new' ? 'Novo' : 'Promoção'}</div>` : ''}
            <div class="prod-hover-layer">
                <button class="add-cart-btn" onclick="addToCart(${p.id}, event)">Adicionar ao Carrinho</button>
            </div>
        </div>
        <div class="prod-info">
            <div class="prod-cat">${p.categoria}</div>
            <div class="prod-name">${p.nome}</div>
            <div class="prod-price-row">
                <span class="prod-price">R$ ${fmt(p.preco)}</span>
                ${p.preco_antigo ? `<span class="prod-old">R$ ${fmt(p.preco_antigo)}</span>` : ''}
            </div>
            ${showSizes && p.tamanho ? `<div class="prod-sizes"><div class="sz">${p.tamanho}</div></div>` : ''}
        </div>
    </div>`;
}


function filterProd(cat, el) {
    document.querySelectorAll('.ftag').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    const list = cat === 'todos' ? PRODS : PRODS.filter(p => p.cat === cat);
    document.getElementById('shop-prods').innerHTML = list.map(p => prodCard(p)).join('');
}

var PRODS = [];

async function getAllProducts() {
    try {
        const response = await fetch(`${API_BASE}/products`);
        if (!response.ok) throw new Error();

        PRODS = await response.json();

        console.log(PRODS)

        const el = document.getElementById('home-prods');

        if (!PRODS.length) {
            el.innerHTML = `<p class="empty-msg">Nenhum produto encontrado.</p>`;
            return;
        }

        el.innerHTML = PRODS.map(p => prodCard(p)).join('');

    } catch (error) {
        console.error("[getAllProducts]", error);
        document.getElementById('home-prods').innerHTML =
            `<p class="error-msg">Não foi possível carregar os produtos.</p>`;
    }
}

async function getProductsByCategoria(categoria, btn) {
    const el = document.getElementById('shop-prods');
    document.querySelectorAll('.ftag').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    try {
        const response = await fetch(`${API_BASE}/products/categoria/${categoria}`);
        if (!response.ok) throw new Error(`Erro ao buscar categoria: ${categoria}`);

        const products = await response.json();

        if (products.length === 0) {
            el.innerHTML = `<p class="empty-msg">Nenhum produto encontrado em "${categoria}".</p>`;
            return;
        }

        el.innerHTML = products.map(p => prodCard(p)).join('');

    } catch (error) {
        console.error("[getProductsByCategoria]", error);
        el.innerHTML = `<p class="error-msg">Não foi possível carregar a categoria. Tente novamente.</p>`;
    }
}

async function getProductById(id) {
    const el = document.getElementById('produto-detalhe');

    try {
        const response = await fetch(`${API_BASE}/products/${id}`);
        if (!response.ok) throw new Error(`Produto ${id} não encontrado!`);

        const p = await response.json();

        // Renderiza o card com tamanhos visíveis (showSizes = true por padrão)
        el.innerHTML = prodCard(p);

    } catch (error) {
        console.error("[getProductById]", error);
        el.innerHTML = `<p class="error-msg">Produto não encontrado. Tente novamente.</p>`;
    }
}