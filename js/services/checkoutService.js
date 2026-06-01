const API_BASE = "http://localhost:3000";

async function loadCheckout() {
	try {
		const token = localStorage.getItem('token');
		const res = await fetch(`${API_BASE}/cart`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
				'Cache-Control': 'no-cache'
			}
		});

		if (!res.ok) {
			console.error('Erro ao buscar carrinho para checkout', res.status);
			return;
		}

		const { itens } = await res.json();
		const selecionados = itens.filter(i => i.selected || i.selected === 1 || i.selected === true);

		const container = document.getElementById('sum-items');
		const subEl = document.getElementById('s-sub');
		const totalEl = document.getElementById('s-total');

		if (!selecionados.length) {
			container.innerHTML = '<p>Nenhum item selecionado.</p>';
			if (subEl) subEl.textContent = 'R$ 0,00';
			if (totalEl) totalEl.textContent = 'R$ 0,00';
			return;
		}

		let subtotal = 0;
		container.innerHTML = selecionados.map(it => {
			const linha = it.preco * it.quantidade;
			subtotal += linha;
			return `<div class="sum-item">
				<div class="sum-img"><img src="../${it.img}" alt="${it.nome}" style="max-width:100%;max-height:100%;object-fit:cover"></div>
				<div class="sum-info">
					<div class="sum-name">${it.nome}</div>
					<div class="sum-det">Tamanho ${it.tamanho} · x${it.quantidade}</div>
				</div>
				<div class="sum-price">R$ ${fmt(linha)}</div>
			</div>`;
		}).join('');

		if (subEl) subEl.textContent = `R$ ${fmt(subtotal)}`;
		// aqui você pode calcular frete; por enquanto assumimos frete 0
		if (totalEl) totalEl.textContent = `R$ ${fmt(subtotal)}`;

	} catch (error) {
		console.error('[loadCheckout]', error);
	}
}

var pixCopiaECola = "";

async function gerarPix() {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/checkout/pix`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!res.ok) throw new Error();

        const { qrCode, qrCodeUrl, copiaECola } = await res.json();

        pixCopiaECola = copiaECola;

        document.getElementById("pix-qr").innerHTML = `<img src="${qrCodeUrl}" alt="QR Code PIX" style="width:180px;height:180px;">`;
        document.getElementById("pix-copia-cola").textContent = copiaECola;
        document.getElementById("pix-info").style.display = "block";

    } catch (error) {
        console.error("[gerarPix]", error);
        alert("Erro ao gerar PIX. Tente novamente.");
    }
}