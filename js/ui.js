
/*Define o index ) para aparecer sempre a primeira imagem */
let index = 0;
let index2 = 0;

    /* Guarda o  slide do carrossel com as imagens*/
  const slides = document.querySelector('.anuncio');
  const slides2 = document.querySelector('.anuncio2');
  
  /*guarda todos os slides como se fosse uma lista*/
  todosOsSlides = document.querySelectorAll('.slide')
  todosOsSlides2 = document.querySelectorAll('.slide2')
 
  /*cria um clone e adiciona o clone nos slides do carrossel*/
  const primeiroClone = todosOsSlides[0].cloneNode(true);
  const segundoClone = todosOsSlides2[0].cloneNode(true);
   /*cloneNode(true) serve para copiar o elemento, atributos e children se tiver
    se fosse cloneNode(false) ele apenas copiario o elemento e mais nada.
  */
  slides.appendChild(primeiroClone)
  slides2.appendChild(segundoClone)

  /* Guarda cada slide do anuncio incluindo o clone. O lenght retona o total*/
  const totalSlides = document.querySelectorAll('.slide').length;

  const totalSlides2 = document.querySelectorAll('.slide2').length;

  /*função para funcionar o carrossel*/
function trocarAnuncio() {


  /*Adiciona +1 no index do carrossel*/
  index++;
  index2++;

  /* usa o translateX para mudar a posição horizontalmente, aparecendo a proxima imagem, muda sempre de 100% em 100% praticamente de imagem em imagem*/
  slides.style.transform = `translateX(-${index * 100}%)`;
  slides2.style.transform = `translateX(-${index2 * 100}%)`;

  /* Se o index for exatamente igual ao total -1*/
  if (index === totalSlides - 1 || index2 === totalSlides2 -1) {
    
    /*é usado setTimout pois depois de 500ms ele executa a ação* que seria o tempo da animação do slide*/
    setTimeout(() => {

        /*aqui a animação é removida*/
        slides.style.transition = "none";
        slides2.style.transition = "none";

        /*o index retorna para 0 voltando para a primeira imagem.*/
        index = 0
        index2 = 0

        /*volta o translate para 0*/
        slides.style.transform = `translateX(0)`;
        slides2.style.transform = `translateX(0)`;

        setTimeout(() => {
            slides.style.transition = "transform 0.5s ease-in-out"
            slides2.style.transition = "transform 0.5s ease-in-out"
        }, 50)
    }, 500)
  }

  
}

/* a cada 3 segundos ele usa a função e assim o carrossel fica automatico */
setInterval(trocarAnuncio, 5000);

