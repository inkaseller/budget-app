function calcularTotal(movimientos) {
    let ingresos = 0;
    let egresos = 0;

    movimientos.forEach(m => {
        if (m.tipo === 'ingreso') ingresos += m.monto;
        else egresos += m.monto;
    });

    return ingresos - egresos;
}

module.exports = { calcularTotal };