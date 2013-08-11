/* coisas no jogo*/
game.PlayScreen = me.ScreenObject.extend({
    init: function() {
        //me.audio.stopTrack();
        this.music = "";
    },
    onResetEvent: function() {
        // coisas para resetar ao mudar de estado
        // carrega o nivel
        // me.levelDirector.loadLevel("area01"); // mapa

        // placar padrão
        me.game.addHUD(0, 40, 640, 60);

        // novo item no placar
        me.game.HUD.addItem("score", new game.ScoreObject(620, 0));



        this.startLevel("area01");

        // me.audio.playTrack("DST-InertExponent"); // musica
    },
    startLevel: function(level) {
        // this only gets called on start?
        me.levelDirector.loadLevel(level);
        me.game.sort();
        this.changeLevel();

        return true;
    },
    getNivel: function() {
        return this.converteNivel(me.levelDirector.getCurrentLevelId());
    },
    // função para pegar o nivel atual e retornar apenas o valor numerico
    // Ex: "area01 = nivelCompleto", após converter vai retornar apenas "01"

    converteNivel: function(nivelCompleto) {
        var re = /area(\d+)/;
        var results = re.exec(nivelCompleto);
        return results[1];
    },
    /** Atualiza a musica ao mudar de nivel */
    changeLevel: function() {
        // this.levelDisplay.reset("levelDisplay");
        // this.skillDisplay.reset('skillDisplay');
        var curLevel = this.getNivel();
        this.curlevel = this.getNivel();
        this.lastMusic = this.music;
        if (curLevel < 04) {
            this.music = "DST-Arch-Delerium_Ancient";
        } else if (curLevel > 03 && curLevel < 14) {
            this.music = "DST-InertExponent";
        } else {
            this.music = "tech";
        }
        if (this.lastMusic !== this.music) {
            if (this.lastMusic !== "") {
                me.audio.stopTrack();
            }
            me.audio.playTrack(this.music);
        }

    },
    getCurrentMusic: function() {
        return this.music;
    },
    /*
     * ---
     * 
     * action to perform when game is finished (state change)
     * 
     * ---
     */
    onDestroyEvent: function() {

        // remove the HUD
        // me.game.disableHUD();

        // stop the current audio track
        me.audio.stopTrack();

        // remove the HUD
        me.game.disableHUD();

    }

});

game.PlayScreen1 = me.ScreenObject.extend({
    onResetEvent: function() {
        // coisas para resetar ao mudar de estado
        // carrega o nivel
        // me.levelDirector.loadLevel("area01"); // mapa
        me.levelDirector.loadLevel("area11"); // mapa

        // placar padrão
        me.game.addHUD(0, 40, 640, 60);

        // novo item no placar

        me.game.HUD.addItem("score", new game.ScoreObject(620, 0));

        // make sure everything is in the right order
        me.game.sort();
    },
    /*
     * ---
     * 
     * action to perform when game is finished (state change)
     * 
     * ---
     */
    onDestroyEvent: function() {

        // remove the HUD
        // me.game.disableHUD();

        // stop the current audio track
        me.audio.stopTrack();

        // remove the HUD
        me.game.disableHUD();

    }

});