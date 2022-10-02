$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    } 
})

/*Altera o titulo, a imagem e a descrição conforme o item selecionado*/
$('.box-filme').on('mouseover', function(event){
    var $this = event.currentTarget;
    var activeText = $this.alt.split("|");
    var activeImage = $this.src;

    var title = document.querySelector('.titulo');
    title.textContent = activeText[0];
    
    var description = document.querySelector('.descricao');
    description.textContent = activeText[1];

    var image = document.querySelector('.image');
    image.src = activeImage;
})

/*Exibe ou fecha o player do filme*/
function playMovie(){
    var modal = document.querySelector('.modalExibeTrailer');
    var movie = document.querySelector('.movie');
    var activated = modal.getAttribute('style','display');
    if (activated == "display: none"){
        modal.setAttribute('style','display: block');
    }
    else{
        modal.setAttribute('style','display: none');
        /*utiliza o JSON para enviar o stopvideo*/
        movie.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'stopVideo' }), '*');
    }
}
