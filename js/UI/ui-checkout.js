function selPay(method) {
	const methods = ['pix', 'credito', 'debito', 'boleto'];
	methods.forEach(name => {
		const btn = document.getElementById(`pm-${name}`);
		const panel = document.getElementById(`pan-${name}`);
		if (btn) btn.classList.toggle('sel', name === method);
		if (panel) panel.style.display = name === method ? 'block' : 'none';
	});
}

function initCheckoutPage() {
	const defaultMethod = 'pix';
	const selectedBtn = document.querySelector('.pay-methods .pm.sel');
	const method = selectedBtn ? selectedBtn.id.replace('pm-', '') : defaultMethod;
	selPay(method);
	if (typeof loadCheckout === 'function') {
		loadCheckout();
	}
}

document.addEventListener('DOMContentLoaded', initCheckoutPage);
