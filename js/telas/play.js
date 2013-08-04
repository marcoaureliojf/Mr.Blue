/* coisas no jogo*/
game.PlayScreen = me.ScreenObject.extend({
 
    onResetEvent: function() {
        // coisas para resetar ao mudar de estado
        // carrega o nivel
        //me.levelDirector.loadLevel("area01"); // mapa
        me.levelDirector.loadLevel("area01"); // mapa

        // placar padrão
        me.game.addHUD(0, 40, 640, 60);
 
        // novo item no placar
        me.game.HUD.addItem("score", new game.ScoreObject(620, 0));
 
        // make sure everything is in the right order
        me.game.sort();


        me.audio.playTrack("DST-InertExponent"); // musica
    },
 
    /* ---
 
    action to perform when game is finished (state change)
 
    --- */
    onDestroyEvent: function() {

        // remove the HUD
    // me.game.disableHUD();
 
    // stop the current audio track
    me.audio.stopTrack();

    // remove the HUD
        me.game.disableHUD();

    }
 
});