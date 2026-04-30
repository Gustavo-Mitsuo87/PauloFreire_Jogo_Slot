import state from "./state.js";

// Isso aqui é para entrar no slot
const btnEntrar = document.getElementById("btnEntrar");

if (btnEntrar) {
    btnEntrar.addEventListener("click", (e) => {
        const nome = document.querySelector('input[name="nome"]').value;
        const saldo = Number(document.querySelector('input[name="saldo"]').value);

        if (!nome || saldo < 10) {
            alert("Preencha corretamente!");
            return;
        }

        state.defineNome(nome); 
        state.saldoJogador(saldo);
        state.salvarEstado();

        // document.querySelector("form").submit(); // banco de dados
        window.location.href = "slot.html";
    });
}

state.carregarEstado();

const saldo = document.getElementById("saldo");

if (saldo) {
    saldo.textContent = state.getSaldoAtual();
}

// temporizador
const timer = document.getElementById("timer");

if (timer) {
    let tempo = 10;

    function atualizarTimer() {
        const minutos = Math.floor(tempo / 60);
        const segundos = tempo % 60;

        timer.textContent =
            `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
    }

    atualizarTimer();

    const intervalo = setInterval(() => {
        tempo--;
        atualizarTimer();

        if (tempo <= 0) {
            clearInterval(intervalo);
            fimDeJogo();
        }
    }, 1000);
}

function fimDeJogo() {
    const modal = document.getElementById("modalFim");

    if (modal) {
        modal.style.display = "flex";
    }

    // bloquear cliques
    document.body.style.pointerEvents = "none";
    modal.style.pointerEvents = "all";
}

const btnVoltar = document.getElementById("btnVoltar");

if (btnVoltar) {
    btnVoltar.addEventListener("click", () => {
        window.location.href = "index.html";
        state.reset();
    });
}

const btnMenos = document.getElementById("btnMenos");
const btnMais = document.getElementById("btnMais");

if (btnMenos) {
    btnMenos.addEventListener("click", () => {
        if (aposta > 0) {
            const aposta = 0; // aqui tem que ser o valor da aposta
            aposta -= 10; // aqui tem que ser o valor que o usuario quer aumentar a aposta
            state.rodada(aposta);
            document.getElementById("aposta").textContent = aposta; // aqui tem que ser o valor da aposta
        }
    });
}

if (btnMais) {
    btnMais.addEventListener("click", () => {
        const aposta = 0; // aqui tem que ser o valor da aposta
        aposta += 10; // aqui tem que ser o valor que o usuario quer aumentar a aposta

        if (aposta <= state.getSaldoAtual()) {
            state.rodada(aposta);
            document.getElementById("aposta").textContent = aposta; // aqui tem que ser o valor da aposta
        }
    });
}