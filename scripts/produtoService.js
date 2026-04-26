const API_BASE = "http://localhost:8080";


function prodCard(p, showSizes = true) {
  return `
  <div class="prod-card">
    <div class="prod-img" style="background:${BGS[p.id % BGS.length]}">
      ${p.badge ? `<div class="prod-badge badge-${p.badge}">${p.badge === 'new' ? 'Novo' : 'Promoção'}</div>` : ''}
      <span style="position:relative;z-index:1">${p.e}</span>
      <div class="prod-hover-layer">
        <button class="add-cart-btn" onclick="addToCart(${p.id},event)">Adicionar ao Carrinho</button>
      </div>
    </div>
    <div class="prod-info">
      <div class="prod-cat">${p.cat}</div>
      <div class="prod-name">${p.name}</div>
      <div class="prod-price-row">
        <span class="prod-price">R$ ${fmt(p.price)}</span>
        ${p.old ? `<span class="prod-old">R$ ${fmt(p.old)}</span>` : ''}
      </div>
      ${showSizes ? `<div class="prod-sizes">${p.sizes.map(s => `<div class="sz">${s}</div>`).join('')}</div>` : ''}
    </div>
  </div>`;
}


function filterProd(cat, el) {
  document.querySelectorAll('.ftag').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const list = cat === 'todos' ? PRODS : PRODS.filter(p => p.cat === cat);
  document.getElementById('shop-prods').innerHTML = list.map(p => prodCard(p)).join('');
}

async function getAll() {
    try {
        const response = await fetch(`${API_BASE}/produtos`);
        if (!response.ok) throw new Error("Erro ao buscar produtos!");

        const products = await response.json(); // await faltando no original

        const el = document.getElementById('home-prods');

        if (products.length === 0) {
            el.innerHTML = `<p class="empty-msg">Nenhum produto encontrado.</p>`;
            return;
        }

        el.innerHTML = products.map(p => prodCard(p)).join('');

    } catch (error) {
        console.error("[getAll]", error);
        document.getElementById('products-grid').innerHTML =
            `<p class="error-msg">Não foi possível carregar os produtos. Tente novamente.</p>`;
    }
}