const form = document.getElementById('form');
const tablaBody = document.getElementById('tabla-body');

let chart;

async function cargarDatos() {
    const res = await fetch('/api/movimientos');
    const movimientos = await res.json();
    render(movimientos);
}

function render(movimientos) {

    tablaBody.innerHTML = '';

    let ingresos = movimientos.filter(m => m.tipo === 'ingreso');
    let egresos = movimientos.filter(m => m.tipo === 'egreso');

    let max = Math.max(ingresos.length, egresos.length);

    let totalIngresos = 0;
    let totalEgresos = 0;

    for (let i = 0; i < max; i++) {

        let ingreso = ingresos[i];
        let egreso = egresos[i];

        let fila = `
            <tr>
                <td>${ingreso ? ingreso.descripcion : ''}</td>
                <td>${ingreso ? ingreso.monto : ''}</td>
                <td>${egreso ? egreso.descripcion : ''}</td>
                <td>${egreso ? egreso.monto : ''}</td>
            </tr>
        `;

        tablaBody.innerHTML += fila;

        if (ingreso) totalIngresos += ingreso.monto;
        if (egreso) totalEgresos += egreso.monto;
    }

    document.getElementById('subtotal-ingresos').textContent = totalIngresos;
    document.getElementById('subtotal-egresos').textContent = totalEgresos;

    let total = totalIngresos - totalEgresos;
    document.getElementById('total').textContent = total;

    renderChart(totalIngresos, totalEgresos);
}

function renderChart(ingresos, egresos) {
    const ctx = document.getElementById('grafico');

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: 'bar',
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