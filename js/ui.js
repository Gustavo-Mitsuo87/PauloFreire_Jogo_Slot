let slideIndex = 0;
const slides = document.querySelectorAll('.slide');

function rodar_anuncios() {
    // Oculta todos os slides
    slides.forEach(slide => slide.style.display = "none");
    
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    
    // Mostra o slide atual
    slides[slideIndex - 1].style.display = "block";
    
    // Chama a função novamente após 3 segundos
    setTimeout(showSlides, 3000); 
}

rodar_anuncios();