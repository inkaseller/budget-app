const form = document.getElementById('form');
const lista = document.getElementById('lista');
const balanceEl = document.getElementById('balance');

let movimientos = [];
let chart;

async function cargarDatos() {
    const res = await fetch('/api/movimientos');
    movimientos = await res.json();
    render();
}

function render() {
    lista.innerHTML = '';
    let ingresos = 0;
    let egresos = 0;

    movimientos.forEach(m => {
        const li = document.createElement('li');
        li.textContent = `${m.tipo} - S/ ${m.monto} - ${m.descripcion}`;
        lista.appendChild(li);

        if (m.tipo === 'ingreso') ingresos += m.monto;
        else egresos += m.monto;
    });

    const balance = ingresos - egresos;
    balanceEl.textContent = balance;

    renderChart(ingresos, egresos);
}

function renderChart(ingresos, egresos) {
    const ctx = document.getElementById('grafico');

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Ingresos', 'Egresos'],
            datasets: [{
                data: [ingresos, egresos]
            }]
        }
    });
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const tipo = document.getElementById('tipo').value;
    const monto = parseFloat(document.getElementById('monto').value);
    const descripcion = document.getElementById('descripcion').value;

    await fetch('/api/movimientos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipo, monto, descripcion })
    });

    form.reset();
    cargarDatos();
});

cargarDatos();