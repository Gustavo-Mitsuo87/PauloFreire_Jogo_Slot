// ==== PARTE DO TUTORIAL ==== //

const tutorialSteps = [ // Cria uma lista de objetos para pegar cada elemento necessário para o tutorial.
    {
        elemento: ".card-saldo",
        texto: "Aqui fica seu saldo atual."
    },
     {
        elemento: ".card-mult",
        texto: "Aqui mostra o multiplicador da sua aposta."
    },

    {
        elemento: ".card-aposta",
        texto: "Aqui você controla sua aposta."
    },
      {
        elemento: ".botao-mais",
        texto: "Clique aqui para aumentar sua aposta (+10)."
    },

    {
        elemento: ".botao-menos",
        texto: "Clique aqui para diminuir sua aposta (-10)."
    },

    {
        elemento: ".botao-girar",
        texto: "Clique aqui para girar o slot."
    }
];

const overlay = document.getElementById("tutorialOverlay"); //Overlay da tela 
const elementoBox = document.getElementById("tutorialElementoBox"); //Box mostrando o elemento que será exibido o tutorial.
const tutorialBox = document.getElementById("tutorialBox"); // Box onde terá a exolicação
const tutorialTexto = document.getElementById("tutorialTexto"); // Texto da explicação

let tutorialAtual = 0; // Variavel que guardará qual tutorial será exibido


function mostrarTutorial() {

    const passo = tutorialSteps[tutorialAtual]; // Variavel que guarda qual tutorial será exibido por ordem de indice.

    const elemento = document.querySelector(passo.elemento); // seleciona o elemento e guarda ele em qual passo ele aparecerá

    const rect = elemento.getBoundingClientRect(); //Localiza onde o elemento está e posiciona o tutorialBox e o elementoBox

    elementoBox.style.left = rect.left - 15 + "px"; 
    elementoBox.style.top = rect.top - 10 + "px";

    elementoBox.style.width = rect.width + 20 + "px";
    elementoBox.style.height = rect.height + 20 + "px";

    tutorialBox.style.left = rect.left + "px";
    tutorialBox.style.top = rect.bottom + 20 + "px";

    tutorialTexto.textContent = passo.texto;
};

function iniciarTutorial() { //função que iniciará o tutorial e bloqueará o display

    overlay.style.display = "block";

    mostrarTutorial();

    
};

overlay.addEventListener("click", () => { //cada click que o usuario der na tela o tutorial passa para a proxima etapa

    tutorialAtual++;

    if (tutorialAtual >= tutorialSteps.length) {

        overlay.style.display = "none";

        return;
    }

    mostrarTutorial();
});

iniciarTutorial();