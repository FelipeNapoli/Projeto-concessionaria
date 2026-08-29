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
}