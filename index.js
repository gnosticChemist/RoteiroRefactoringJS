const { readFileSync } = require('fs');
var Repositorio = require("./repositorio.js");
var ServicoCalculoFatura = require("./servico.js");
var gerarFaturaStr = require("./apresentacao.js");

const faturas = JSON.parse(readFileSync('./faturas.json'));
const calc = new ServicoCalculoFatura(new Repositorio());
const faturaStr = gerarFaturaStr(faturas, calc);
//const faturaHTML = gerarFaturaHTML(faturas, pecas);
console.log(faturaStr);
//console.log(faturaHTML);
// IDEA:
