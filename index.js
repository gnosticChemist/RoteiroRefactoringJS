const { readFileSync } = require('fs');

class ServicoCalculoFatura {
  calcularTotalApresentacao(apre, pecas){
    let total = 0;

    switch (getPeca(apre,pecas).tipo) {
    case "tragedia":
      total = 40000;
      if (apre.audiencia > 30) {
        total += 1000 * (apre.audiencia - 30);
      }
      break;
    case "comedia":
      total = 30000;
      if (apre.audiencia > 20) {
         total += 10000 + 500 * (apre.audiencia - 20);
      }
      total += 300 * apre.audiencia;
      break;
    default:
        throw new Error(`Peça desconhecia: ${getPeca(apre, pecas).tipo}`);
    }
    return total;
  }

  calcularCredito(apre, pecas){
    let creditos = Math.max(apre.audiencia - 30, 0);
    if (getPeca(apre, pecas).tipo === "comedia")
       creditos += Math.floor(apre.audiencia / 5);
    return creditos;
  }

  calcularTotalFatura(pecas, fatura){
    let totalFatura = 0;
    for (let apre of fatura.apresentacoes) {
      totalFatura += this.calcularTotalApresentacao(apre, pecas);
    }
    return totalFatura;
  }

  calcularTotalCreditos(pecas, fatura){
    let creditos = 0;
    for (let apre of fatura.apresentacoes)
      creditos += this.calcularCredito(apre, pecas);
    return creditos;
  }
}

function getPeca(apresentacao, pecas){
  return pecas[apresentacao.id];
}

function formatarMoeda(valor){
  return new Intl.NumberFormat("pt-BR",
    { style: "currency", currency: "BRL",
      minimumFractionDigits: 2 }).format(valor/100);
}

function gerarFaturaStr (fatura, pecas, calc) {
    let faturaStr = `Fatura ${fatura.cliente}\n`;
    for (let apre of fatura.apresentacoes) {
        faturaStr += `  ${getPeca(apre, pecas).nome}: ${formatarMoeda(calc.calcularTotalApresentacao(apre, pecas))} (${apre.audiencia} assentos)\n`;
    }
    faturaStr += `Valor total: ${formatarMoeda(calc.calcularTotalFatura(pecas, fatura))}\n`;
    faturaStr += `Créditos acumulados: ${calc.calcularTotalCreditos(pecas, fatura)} \n`;
    return faturaStr;
}
/*
function gerarFaturaHTML(fatura, pecas) {
  let faturaHTML = `<html>
  <p> ${fatura.cliente} </p>
  <ul>`;
  for (let apre of fatura.apresentacoes)
      faturaHTML += `\n   <li>${getPeca(apre, pecas).nome}: ${formatarMoeda(calcularTotalApresentacao(apre, pecas))} (${apre.audiencia} assentos)</li>`;
faturaHTML += `\n  </ul>
<p> Valor total: ${formatarMoeda(calcularTotalFatura(pecas, fatura))} </p>
<p> Créditos acumulados: ${calcularTotalCreditos(pecas, fatura)} </p>
</html>`;
  return faturaHTML;
}*/

const calc = new ServicoCalculoFatura();
const faturas = JSON.parse(readFileSync('./faturas.json'));
const pecas = JSON.parse(readFileSync('./pecas.json'));
const faturaStr = gerarFaturaStr(faturas, pecas, calc);
//const faturaHTML = gerarFaturaHTML(faturas, pecas);
console.log(faturaStr);
//console.log(faturaHTML);
