const { calcularTotal } = require('./logic');

test('calcula total correctamente', () => {
    const data = [
        { tipo: 'ingreso', monto: 200 },
        { tipo: 'egreso', monto: 50 }
    ];

    expect(calcularTotal(data)).toBe(150);
});