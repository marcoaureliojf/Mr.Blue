/* Meu primeiro jogo */
var game = {
    // Executa ao carregar a página.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init("screen", 640, 480, true, 'auto')) {
            alert("Ops, melhor voce atualizar seu navegador. Este não suporta canvas HTML5");
            return;
        }
         
        // ativa o debug
        if (document.location.hash === "#debug") {
            window.onReady(function () {
                me.plugin.register.defer(debugPanel, "debug");
            });
        }
 


        // inicializa o audio
        me.audio.init("mp3,ogg");
 
        // retorno (callback) após carregar
        me.loader.onload = this.loaded.bind(this);
      
        // carregar os recursos do jogo
        me.loader.preload(game.resources);
 
        // Inicializa o framework melonJS 
        // me.state.change(me.state.LOADING);
        // me.state.change(me.state.LOADING, new game.CustomLoadingScreen());
        

        // debug de renderização: descomente para ativar
        // me.debug.renderHitBox = true;
    },
 
 
 
    // executa o jogo após carregar todos os recursos
    "loaded" : function () {
        
        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());

        // set a global fading transition for the screen
        //me.state.transition("fade", "#FFFFFF", 250);

            // adiciono meu jogador
       me.entityPool.add("player1", game.PlayerEntity);
       // adiciono minha moeda
       me.entityPool.add("CoinEntity", game.CoinEntity);
       // adiciono meu inimigo
       me.entityPool.add("EnemyEntity", game.EnemyEntity);
             
   // habilito o teclado
   me.input.bindKey(me.input.KEY.LEFT,  "left");
   me.input.bindKey(me.input.KEY.RIGHT, "right");
   me.input.bindKey(me.input.KEY.A,  "left");
   me.input.bindKey(me.input.KEY.D, "right");
   me.input.bindKey(me.input.KEY.SPACE, "jump", true);
 
        

   me.state.onPause = function ()
      {
         // get the current context
         var context = me.video.getScreenContext();
         //draw a black transparent square
         context.fillStyle = "rgba(0, 0, 0, 0.8)";
         context.fillRect(0, (me.video.getHeight()/2) - 30, me.video.getWidth(), 60);
         
         // create a font
         var font = new me.BitmapFont("32x32_font", 32);
         font.set("left");

         // a draw "pause" ! 
         var measure = font.measureText("P A U S E");
         font.draw (context, "P A U S E", (me.video.getWidth()/2) - (measure.width/2) , (me.video.getHeight()/2) - (measure.height/2));
         

      };



        // game start.
        // me.state.change(me.state.PLAY);

        // display the menu title
        me.state.change(me.state.MENU);
    },

};

/*
Isto é muito simples. Uma vez que a página é carregada, a função onload() é chamada, 
o display e o áudio é inicializado, e todos os recursos do jogo começam a carregar. 
Também definimos um callback para ser chamado quando tudo está pronto para ser usado. 
No retorno, nós definimos um novo estado, que será usado para o material de jogo, 
juntamente com um objeto PlayScreen que vamos usar para gerenciar os evento de jogo 
(reiniciar, etc ..).

A única mudança que vamos fazer no modelo de projeto padrão é a determinar resolução de vídeo 
com a função `me.video.init ()`, para o tutorial, vamos criar uma tela de 640x480. 
Você vai notar bem mais tarde que na versão final do tutorial, eu desativei a escala de vídeo 
através da remoção do parâmetro 'auto', como a minha intenção era ter que montar meu template html.
*/