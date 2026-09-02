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

    const carro2VenceOsDois = eficiencia2 > eficiencia1 && autonomia2 > autonomia1;
    const carro1VenceOsDois = eficiencia1 > eficiencia2 && autonomia1 > autonomia2;

    let resultado1;
    let resultado2;
    let carroEconomico;

    if (carro2VenceOsDois) {
        resultado1 = 'Não Compensa';
        resultado2 = 'Econômico';
        carroEconomico = 'Carro 2';
    } else if (carro1VenceOsDois) {
        resultado1 = 'Econômico';
        resultado2 = 'Não Compensa';
        carroEconomico = 'Carro 1';
    } else if (custoTotal1 < custoTotal2) {
        resultado1 = 'Econômico';
        resultado2 = 'Não Econômico';
        carroEconomico = 'Carro 1';
    } else if (custoTotal2 < custoTotal1) {
        resultado1 = 'Não Econômico';
        resultado2 = 'Econômico';
        carroEconomico = 'Carro 2';
    } else {
        resultado1 = 'Empate';
        resultado2 = 'Empate';
        carroEconomico = 'Empate';
    }

    exibirResultado({
        eficiencia1,
        eficiencia2,
        autonomia1,
        autonomia2,
        custoTotal1,
        custoTotal2,
        diferencaCusto,
        diferencaPercentual,
        resultado1,
        resultado2,
        carroEconomico,
        distancia
    });
}

function exibirResultado(d) {
    const container = document.getElementById('resultados-cards');
    if (!container) return;

    const percentualDiferenca = (a, b) => {
        const dif = Math.abs(a - b);
        const maior = Math.max(a, b);
        return maior === 0 ? 0 : (dif / maior) * 100;
    };

    const difEficiencia = percentualDiferenca(d.eficiencia1, d.eficiencia2);
    const difAutonomia = percentualDiferenca(d.autonomia1, d.autonomia2);

    const selo = (resultado) => {
        if (resultado === 'Econômico') return 'selo-economico';
        if (resultado === 'Não Econômico') return 'selo-nao-economico';
        if (resultado === 'Empate') return 'selo-empate';
        return 'selo-nao-compensa';
    };

    let classeConclusao;
    let tituloConclusao;
    let textoConclusao;

    if (d.resultado1 === 'Não Compensa' || d.resultado2 === 'Não Compensa') {
        const carroFraco = d.resultado1 === 'Não Compensa' ? 'Carro 1' : 'Carro 2';

        const carroForte = carroFraco === 'Carro 1' ? 'Carro 2' : 'Carro 1';

        classeConclusao = 'selo-nao-compensa';

        tituloConclusao = `${carroFraco} não compensa`;

        textoConclusao = `${carroForte} tem mais eficiência e mais autonomia ao mesmo tempo — não vale a pena escolher o ${carroFraco}.`;

    } else if (d.carroEconomico === 'Empate') {
        classeConclusao = 'selo-empate';

        tituloConclusao = 'Empate técnico';

        textoConclusao = `Os dois carros custam praticamente o mesmo (R$ ${d.custoTotal1.toFixed(2)}) para rodar ${d.distancia} km.`;

    } else {
        classeConclusao = 'selo-economico';
        
        tituloConclusao = `${d.carroEconomico} é mais econômico`;
        
        textoConclusao = `Economia de ${d.diferencaPercentual.toFixed(1)}% (R$ ${d.diferencaCusto.toFixed(2)}) em relação ao outro carro, considerando ${d.distancia} km rodados.`;
    }
}
