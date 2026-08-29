function salvarCalculo() {
    const capacidade1 = parseFloat(document.getElementById('kmh1').value);
    const consumo1 = parseFloat(document.getElementById('consumo1').value);
    const capacidade2 = parseFloat(document.getElementById('kmh2').value);
    const consumo2 = parseFloat(document.getElementById('consumo2').value);
    const distancia = parseFloat(document.getElementById('distancia').value);
    const preco = parseFloat(document.getElementById('preco-energia').value);

    if (
        [capacidade1, consumo1, capacidade2, consumo2, distancia, preco].some(isNaN) ||
        capacidade1 <= 0 ||
        consumo1 <= 0 ||
        capacidade2 <= 0 ||
        consumo2 <= 0 ||
        distancia <= 0 ||
        preco < 0
    ) {
        alert('Preencha todos os campos com números válidos.');
        return;
    }

    const eficiencia1 = 100 / consumo1;
    const eficiencia2 = 100 / consumo2;

    const autonomia1 = (capacidade1 / consumo1) * 100;
    const autonomia2 = (capacidade2 / consumo2) * 100;

    const custoPorKm1 = (consumo1 / 100) * preco;
    const custoPorKm2 = (consumo2 / 100) * preco;

    const custoTotal1 = custoPorKm1 * distancia;
    const custoTotal2 = custoPorKm2 * distancia;

    const diferencaCusto = Math.abs(custoTotal1 - custoTotal2);
    const maiorCusto = Math.max(custoTotal1, custoTotal2);

    const diferencaPercentual =
        maiorCusto === 0 ? 0 : (diferencaCusto / maiorCusto) * 100;

}