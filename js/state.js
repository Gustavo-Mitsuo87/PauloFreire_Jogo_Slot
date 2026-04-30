
let saldoInicio = 0;
let saldoAtual = 0;
let contaRodada = 0;
let name = "";

function getSaldoAtual() {
    return saldoAtual;
}

function getSaldoInicio() {
    return saldoInicio;
}

function getRodadas() {
    return contaRodada;
}

function getNome() {
    return name;
}

function salvarEstado() { // isso vai garantir que o usuario tente um f5 e perca os dados
    const estado = {
        saldoInicio,
        saldoAtual,
        contaRodada,
        name
    };/* 
       JSON.stringify transforma objeto em texto
       setItem salva no navegador
       localStorage ele salva no PC as variaveis dentro do {}
    */
    localStorage.setItem("estadoJogo", JSON.stringify(estado));
}

function defineNome(nome) {
    name = nome;
}

function saldoJogador(valor) { //aqui vai dizer qual o valor inicial do jogador.
    saldoInicio = valor;
    saldoAtual = valor;
}

function atualizacaoSaldo(result, valor, multiplicador) { //vai receber se houve ganho ou perda e o valor da aposta
    if (result == true) { //se for true é porque ganhou
        saldoAtual = saldoAtual + (valor * multiplicador);
        return saldoAtual;
    } else {
        return saldoAtual;
    }
}

function rodada(aposta) { // aposta digitada pelo usuario
    if (saldoAtual == 0) {
        return false; // nesse caso já era pro betinha
    } else {
        if (aposta <= saldoAtual) {
            saldoAtual -= aposta;
            contaRodada += 1;
            salvarEstado();
            return true;
        } else {
            return false;
        }
    }
}

function reset() { // quando não houver mais rodadas vai reiniciar os valores
    saldoInicio = 0;
    saldoAtual = 0;
    contaRodada = 0;
    name = "";
}

function carregarEstado() { // aqui reverte o que fizemos e caso um infeliz de f5 as infomações voltam ao normal
    const estadoSalvo = localStorage.getItem("estadoJogo");
    // lembar do get no mitsuo ele vai pegar as informções do JSON

    if (estadoSalvo) {
        const dados = JSON.parse(estadoSalvo);
        /**
         * JSON.parse transforma texto de volta em objeto
         */
        saldoInicio = dados.saldoInicio;
        saldoAtual = dados.saldoAtual;
        contaRodada = dados.contaRodada;
        name = dados.name;
    }
}

export default {
    saldoJogador,
    defineNome, 
    rodada, 
    atualizacaoSaldo, 
    reset, 
    getSaldoAtual,
    getSaldoInicio,
    getRodadas,
    getNome,
    carregarEstado,
    salvarEstado
};