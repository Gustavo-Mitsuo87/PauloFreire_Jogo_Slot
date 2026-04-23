
let saldoInicio = 0;
let saldoAtual = 0;
let contaRodada = 0;
let name = "";

let lista = [];

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
        name,
        lista
    };/* 
       JSON.stringify transforma objeto em texto
       setItem salva no navegador
       localStorage ele salva no PC as variaveis dentro do {}
    */
    localStorage.setItem("estadoJogo", JSON.stringify(estado));
}

function defineNome(nome) {
    name = nome;
    salvarEstado();
}

function saldoJogador(valor) { //aqui vai dizer qual o valor inicial do jogador.
    saldoInicio = valor;
    saldoAtual = valor;
    salvarEstado();
}

function atualizacaoSaldo(result, valor, multiplicador) { //vai receber se houve ganho ou perda e o valor da aposta
    if (result == true) { //se for true é porque ganhou
        saldoAtual = saldoAtual + (valor * multiplicador);
        salvarEstado();
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
    salvarEstado();
}

function txt(inicio, fim) {
    lista.push({ nome: name, inicio, fim });
    salvarEstado();
}


function gerarTXT() { // aqui é onde o filho chora e a mãe não vê
    let conteudo = lista
        .map(item => `${item.nome} - ${item.inicio} - ${item.fim}`)
        .join("\n");    // transforma a lista em texto

    const blob = new Blob([conteudo], { type: "text/plain" }); // criar "arquivo" em memória
    const link = document.createElement("a"); // criar link temporário

    /**
     * .map() Transforma cada item da lista em linha de texto
     * .join("\n") Junta tudo com quebra de linha
     *  esse Blob ele cria um "arquivo virtual"
     */

    link.href = URL.createObjectURL(blob);  // aqui gerar URL do arquivo

    link.download = "resultado.txt"; // defini o nome do arquivo

    link.click(); // simular clique (baixar) -> ele força o download do arquivo

    URL.revokeObjectURL(link.href); // limpar memória
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
        lista = dados.lista || [];
    }
}

export default {
    saldoJogador, 
    rodada, 
    atualizacaoSaldo, 
    reset, 
    txt, 
    gerarTXT, 
    salvarEstado, 
    carregarEstado, 
    getSaldoAtual,
    getSaldoInicio,
    getRodadas,
    getNome
};