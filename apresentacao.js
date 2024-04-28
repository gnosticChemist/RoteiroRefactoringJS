
var formatarMoeda = require("./util.js");

module.exports = function(fatura, calc) {
    let faturaStr = `Fatura ${fatura.cliente}\n`;
    for (let apre of fatura.apresentacoes) {
        faturaStr += `  ${calc.repo.getPeca(apre).nome}: ${formatarMoeda(calc.calcularTotalApresentacao(apre))} (${apre.audiencia} assentos)\n`;
    }
    faturaStr += `Valor total: ${formatarMoeda(calc.calcularTotalFatura(fatura))}\n`;
    faturaStr += `Créditos acumulados: ${calc.calcularTotalCreditos(fatura)} \n`;
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
