function start() { // Inicio da função start()

	$("#inicio").hide();
	
	$("#fundoGame").append("<div id='jogador' class='anima1'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
	$("#fundoGame").append("<div id='amigo' class='anima3'></div>");
	$("#fundoGame").append("<div id='placar'></div>");
	$("#fundoGame").append("<div id='energia'></div>");

	//Principais variáveis do jogo
	var jogo = {}
	var TECLA = {
		W: 87,
		S: 83,
		D: 68
	}
	var velocidade=5;
	var podeAtirar=true;
	var fimdejogo=false;
	var pontos=0;
	var salvos=0;
	var perdidos=0;
	var energiaAtual=3

	//retorna um valor entre 0 e 334
	var posicaoY = parseInt(Math.random() * 334);

	jogo.pressionou = [];

	var somDisparo=document.getElementById("somDisparo");
	var somExplosao=document.getElementById("somExplosao");
	var somGameover=document.getElementById("somGameover");
	var somPerdido=document.getElementById("somPerdido");
	var somResgate=document.getElementById("somResgate");

	//Música em loop
	var musica=document.getElementById("musica");
	musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);
	musica.play();

	//Verifica se o usuário pressionou alguma tecla	
	$(document).keydown(function(e){
		jogo.pressionou[e.which] = true;
	});
	
	$(document).keyup(function(e){
		jogo.pressionou[e.which] = false;
	});

	//Game Loop
 	//Executa a função loop a cada 30ms
	jogo.timer = setInterval(loop,30);

	function loop(){
		//movimenta o fundo da div fundoGame
		movefundo();
		
		//movimenta a div jogador
		movejogador();

		//movimenta a div inimigo1
		moveinimigo1();

		//movimenta a div inimigo2
		moveinimigo2();

		//movimenta a div amigo
		moveamigo();

		//trata as colisões do jogo utilizando o framework jquery-collision
		colisao();

		//atualiza a div placar
		placar();

		//atualiza a div energia
		energia();
	}

	function movefundo(){
		//armazena a posição atual do fundo da div fundoGame
		esquerda = parseInt($("#fundoGame").css("background-position"));
		//move a div fundoGame 1 pixel para a esquerda
		$("#fundoGame").css("background-position", esquerda-1);
	}

	function movejogador() {
		if (jogo.pressionou[TECLA.W]){
			//armazena a posição topo da div jogador
			var topo = parseInt($("#jogador").css("top"));
			//move a div jogador 10 pixels para cima até atingir o topo
			if (topo > 0){
				$("#jogador").css("top",topo-10);
			}
			/* logica proposta aula
			if (topo<=0) {
				$("#jogador").css("top",topo+10);
			}
			*/
		}
		if (jogo.pressionou[TECLA.S]){
			//armazena a posição topo da div jogador
			var topo = parseInt($("#jogador").css("top"));
			//move a div jogador 10 pixels para baixo, até atingir o nivel do personagem
			if (topo < 434){
				$("#jogador").css("top",topo+10);
			}
			/* logica proposta na aula
			if (topo>=434) {
				$("#jogador").css("top",topo-10);
			}
			*/
		}
		if (jogo.pressionou[TECLA.D]) {
			disparo();
		}
	}
	
	function moveinimigo1(){
		//armazena a posição left da div inimigo1
		posicaoX = parseInt($("#inimigo1").css("left"));
		//move a div inimigo1 para a esquerda conforme valor definido pela variavel velocidade
		$("#inimigo1").css("left",posicaoX-velocidade);
		//move a div inimigo1 para cima conforme valor randomico retornado pela variavel posicaoY
		$("#inimigo1").css("top",posicaoY);

		//reposiciona a div inimigo1 quando atingir o limite da div fundoGame
		if (posicaoX<=0) {
			posicaoY = parseInt(Math.random() * 334);
			$("#inimigo1").css("left",694);
			$("#inimigo1").css("top",posicaoY);
				
		}
	}

	function moveinimigo2(){
		//armazena a posição left da div inimigo2
		posicaoX = parseInt($("#inimigo2").css("left"));
		//move a div inimigo2 para a esquerda
		$("#inimigo2").css("left",posicaoX-3);

		//reposiciona a div inimigo2 quando atingir o limite da div fundoGame
		if (posicaoX<=0) {
			$("#inimigo2").css("left",775);
		}
	}

	function moveamigo(){
		//armazena a posição left da div amigo
		posicaoX = parseInt($("#amigo").css("left"));
		//move a div amigo para a direita
		$("#amigo").css("left",posicaoX+1);

		//reposiciona a div amigo quando atingir o limite da div fundoGame
		if (posicaoX>906) {
			$("#amigo").css("left",0);
		}
	}

	function disparo() {
	
		if (podeAtirar==true) {
			
			somDisparo.play()

			podeAtirar=false;
		
			//armazena a posição topo da div jogador1
			topo = parseInt($("#jogador").css("top"))
			//armazena a posição left da div jogador1
			posicaoX= parseInt($("#jogador").css("left"))
			//calculo para posicionar o inicio da div disparo
			tiroX = posicaoX + 190;
			topoTiro=topo+37;
			//cria a div disparo dentro da div fundo game
			$("#fundoGame").append("<div id='disparo'></div");
			//posiciona a div disparo
			$("#disparo").css("top",topoTiro);
			$("#disparo").css("left",tiroX);
			
			var tempoDisparo=window.setInterval(executaDisparo, 30);
		
		}
	 
		function executaDisparo() {
			//armazena a posição left da div disparo
			posicaoX = parseInt($("#disparo").css("left"));
			//move a div disparo
			$("#disparo").css("left",posicaoX+15); 
	
			//remove a div disparo ao atingir o limite da div fundoGame
			if (posicaoX>900) {
				//limpa a variavel tempoDisparo
				window.clearInterval(tempoDisparo);
				//em alguns browsers é necessário indicar que a variável é null
				tempoDisparo=null;
				//remove a div disparo
				$("#disparo").remove();
				podeAtirar=true;
			}
		}
	}
	
	function colisao() {
		//armazena as informações quando a div jogador colide com a div inimigo1
		var colisao1 = ($("#jogador").collision($("#inimigo1")));
		var colisao2 = ($("#jogador").collision($("#inimigo2")));
		var colisao3 = ($("#disparo").collision($("#inimigo1")));
		var colisao4 = ($("#disparo").collision($("#inimigo2")));
		var colisao5 = ($("#jogador").collision($("#amigo")));
		var colisao6 = ($("#inimigo2").collision($("#amigo")));

			
		if (colisao1.length>0) {
			
			energiaAtual--
			//armazena a posição left e top da div inimigo1
			inimigo1X = parseInt($("#inimigo1").css("left"));
			inimigo1Y = parseInt($("#inimigo1").css("top"));
			//executa a função explosao1 com a posição da div inimigo1
			explosao1(inimigo1X,inimigo1Y);
			
			//armazena um valor randomico entre 0 e 334
			posicaoY = parseInt(Math.random() * 334);
			//reposiciona a div inimigo1
			$("#inimigo1").css("left",694);
			$("#inimigo1").css("top",posicaoY);
		}
		// jogador com o inimigo2 
		if (colisao2.length>0) {
			
			energiaAtual--
			inimigo2X = parseInt($("#inimigo2").css("left"));
			inimigo2Y = parseInt($("#inimigo2").css("top"));
			explosao1(inimigo2X,inimigo2Y);
					
			$("#inimigo2").remove();
				
			reposicionaInimigo2();
			// alguns browsers não reconhecem se o códgio for colocado diretamente	
		}

		// Disparo com o inimigo1
		if (colisao3.length>0) {
			
			//almenta a velocidade de movimento da div inimigo1
			velocidade=velocidade+0.3

			pontos=pontos+100
			inimigo1X = parseInt($("#inimigo1").css("left"));
			inimigo1Y = parseInt($("#inimigo1").css("top"));
				
			explosao1(inimigo1X,inimigo1Y);
			
			//Finaliza a função disparo, que irá tratar a remoção do elemento
			$("#disparo").css("left",950);
				
			posicaoY = parseInt(Math.random() * 334);
			$("#inimigo1").css("left",694);
			$("#inimigo1").css("top",posicaoY);
				
		}

		// Disparo com o inimigo2
		if (colisao4.length>0) {
			
			pontos=pontos+50
			inimigo2X = parseInt($("#inimigo2").css("left"));
			inimigo2Y = parseInt($("#inimigo2").css("top"));
			$("#inimigo2").remove();
		
			explosao1(inimigo2X,inimigo2Y);
			$("#disparo").css("left",950);
			
			reposicionaInimigo2();
				
		}

		// jogador com o amigo
		if (colisao5.length>0) {
			salvos++
			somResgate.play()
			reposicionaAmigo();
			$("#amigo").remove();
		}

		//Inimigo2 com o amigo
		if (colisao6.length>0) {
			perdidos++
			amigoX = parseInt($("#amigo").css("left"));
			amigoY = parseInt($("#amigo").css("top"));
			explosao3(amigoX,amigoY);
			$("#amigo").remove();
					
			reposicionaAmigo();
		}
	}
	//Explosão 1
	function explosao1(inimigo1X,inimigo1Y) {
		//aciona audio somExplosao
		somExplosao.play()
		//cria a div explosao1
		$("#fundoGame").append("<div id='explosao1'></div");
		//define a imagem de fundo da div. Atribuido aqui para funcionar em todos os browsers
		$("#explosao1").css("background-image", "url(imgs/explosao.png)");
		//cria uma variável para a div explosao1
		var div=$("#explosao1");
		//posiciona a div explosao1
		div.css("top", inimigo1Y);
		div.css("left", inimigo1X);
		//fução jquery para criar animação da explosao - Almenta o tamanho da div até 200, e reduz a opacidade até 0
		div.animate({width:200, opacity:0}, "slow");
		
		//remove a div explosao1 após 1s
		var tempoExplosao=window.setInterval(removeExplosao, 1000);
		
		function removeExplosao() {
			div.remove();
			window.clearInterval(tempoExplosao);
			tempoExplosao=null;
		}
	} // Fim da função explosao1()

	//Explosão3
	function explosao3(amigoX,amigoY) {
		//aciona audio somPerdido
		somPerdido.play()
		$("#fundoGame").append("<div id='explosao3' class='anima4'></div");
		$("#explosao3").css("top",amigoY);
		$("#explosao3").css("left",amigoX);
		var tempoExplosao3=window.setInterval(resetaExplosao3, 1000);
		function resetaExplosao3() {
			$("#explosao3").remove();
			window.clearInterval(tempoExplosao3);
			tempoExplosao3=null;
		}
	} // Fim da função explosao3

	//Reposiciona Inimigo2
	function reposicionaInimigo2() {
		var tempoColisao4=window.setInterval(reposiciona4, 5000);
		function reposiciona4() {
			window.clearInterval(tempoColisao4);
			tempoColisao4=null;
			if (fimdejogo==false) {
				$("#fundoGame").append("<div id=inimigo2></div");
			}
		}	
	}	

	//Reposiciona Amigo
	function reposicionaAmigo() {
		var tempoAmigo=window.setInterval(reposiciona6, 6000);
		function reposiciona6() {
			window.clearInterval(tempoAmigo);
			tempoAmigo=null;
			if (fimdejogo==false) {
				$("#fundoGame").append("<div id='amigo' class='anima3'></div>");
			}
		}
	} // Fim da função reposicionaAmigo()

	function placar() {
	
		$("#placar").html("<h2> Pontos: " + pontos + " Salvos: " + salvos + " Perdidos: " + perdidos + "</h2>");
		
	} //fim da função placar()

	//Barra de energia
	function energia() {
	
		if (energiaAtual==3) {
			
			$("#energia").css("background-image", "url(imgs/energia3.png)");
		}

		if (energiaAtual==2) {
			
			$("#energia").css("background-image", "url(imgs/energia2.png)");
		}

		if (energiaAtual==1) {
			
			$("#energia").css("background-image", "url(imgs/energia1.png)");
		}

		if (energiaAtual==0) {
			
			$("#energia").css("background-image", "url(imgs/energia0.png)");
			
			gameOver();
		}

	} // Fim da função energia()

	//Função GAME OVER
	function gameOver() {
		fimdejogo=true;
		musica.pause();
		somGameover.play();
		
		//para a função loop
		window.clearInterval(jogo.timer);
		jogo.timer=null;
		
		$("#jogador").remove();
		$("#inimigo1").remove();
		$("#inimigo2").remove();
		$("#amigo").remove();
		
		$("#fundoGame").append("<div id='fim'></div>");
		
		$("#fim").html("<h1> Game Over </h1><p>Sua pontuação foi: " + pontos + "</p>" + "<div id='reinicia' onClick=reiniciaJogo()><h3>Jogar Novamente</h3></div>");
	} // Fim da função gameOver();
	
}

//Reinicia o Jogo
function reiniciaJogo() {
	somGameover.pause();
	$("#fim").remove();
	start();
	
} //Fim da função reiniciaJogo