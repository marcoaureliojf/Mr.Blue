/*----------------------
 
 Pagina inicial do jogo
 
 ----------------------*/

game.TitleScreen = me.ScreenObject.extend({
    // constructor
    init: function() {
        this.parent(true);

        // title screen image
        this.title = null;

        this.font = null;
        this.scrollerfont = null;
        this.scrollertween1 = null;
        this.scrollertween2 = null;

        this.scroller1 = "SE VOCE CHEGOU ATE AQUI, ENTAO VOCE DESCOBRIU O SEGREDO DE BLUE FESTAS - JUIZ DE FORA";
        this.scroller1pos = 600;
        this.scroller2 = "MARCO AURELIO APRESENTA: SR. AZUL CONTRA MR. INSOSSO - UM OFERECIMENTO: BLUEFESTAS JF";
        this.scroller2pos = 600;
    },
    // reset function
    onResetEvent: function() {
        if (this.title == null) {
            // init stuff if not yet done
            this.title = me.loader.getImage("title_screen");
            // font to display the menu items
            this.font = new me.BitmapFont("32x32_font", 32);

            // set the scroller
            this.scrollerfont = new me.BitmapFont("32x32_font", 32);

        }
        this.scrollover();

        me.input.bindKey(me.input.KEY.ENTER, "enter", true);

        // play something
        me.audio.playTrack("DST-5thStreet_Title");

    },
    // some callback for the tween objects
    scrollover: function() {
        // reset to default value
        this.scroller1pos = 640;
        this.scroller2pos = 640;
        this.scrollertween1 = new me.Tween(this).to({
            scroller1pos: -2200
        }, 10000).onComplete(this.scrollover.bind(this)).start();
        this.scrollertween2 = new me.Tween(this).to({
            scroller2pos: -2200
        }, 10000).onComplete(this.scrollover.bind(this)).start();
    },
    // update function
    update: function() {
        // enter pressed ?
        if (me.input.isKeyPressed('enter')) {
            me.audio.stopTrack();
            me.state.change(me.state.PLAY); // Ao pressionar enter, chama o jogo
        }
        return true;
    },
    // draw function
    draw: function(context) {
        context.drawImage(this.title, 0, 0);

        //this.font.draw(context, "MARCO AURELIO APRESENTA!!!", 10, 50);
        //this.font.draw(context, "SR. AZUL CONTRA MR. INSOSSO", 10, 200);
        this.font.draw(context, "APERTE <ENTER>", 150, 340);
        this.scrollerfont.draw(context, this.scroller1, this.scroller1pos, 440);
        this.scrollerfont.draw(context, this.scroller2, this.scroller2pos, 50);

    },
    // destroy function
    onDestroyEvent: function() {
        me.audio.stopTrack("DST-5thStreet_Title");
        me.input.unbindKey(me.input.KEY.ENTER);

        //just in case
        this.scrollertween1.stop();
        this.scrollertween2.stop();

    }

});

game.TitleScreen1 = me.ScreenObject.extend({
    // constructor
    init: function() {
        this.parent(true);

        // title screen image
        this.title = null;

        this.font = null;
        this.scrollerfont = null;
        this.scrollertween1 = null;
        this.scrollertween2 = null;

        this.scroller1 = "SE VOCE CHEGOU ATE AQUI, ENTAO VOCE DESCOBRIU O SEGREDO DE BLUE FESTAS - JUIZ DE FORA";
        this.scroller1pos = 600;
        this.scroller2 = "MARCO AURELIO APRESENTA: SR. AZUL CONTRA MR. INSOSSO - UM OFERECIMENTO: BLUEFESTAS JF";
        this.scroller2pos = 600;
    },
    // reset function
    onResetEvent: function() {
        if (this.title == null) {
            // init stuff if not yet done
            this.title = me.loader.getImage("title_screen");
            // font to display the menu items
            this.font = new me.BitmapFont("32x32_font", 32);

            // set the scroller
            this.scrollerfont = new me.BitmapFont("32x32_font", 32);

        }

        // reset to default value
        this.scroller1pos = 640;
        this.scroller2pos = 640;

        // a tween to animate the arrow
        this.scrollertween1 = new me.Tween(this).to({
            scroller1pos: -2200
        }, 10000).onComplete(this.scrollover.bind(this)).start();

        this.scrollertween2 = new me.Tween(this).to({
            scroller2pos: -2200
        }, 10000).onComplete(this.scrollover.bind(this)).start();

        // enable the keyboard
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);

        // play something
        me.audio.play("DST-5thStreet_Title");

    },
    // some callback for the tween objects
    scrollover: function() {
        // reset to default value
        this.scroller1pos = 640;
        this.scroller2pos = 640;
        this.scrollertween1.to({
            scroller1pos: -2200
        }, 10000).onComplete(this.scrollover.bind(this)).start();
        this.scrollertween2.to({
            scroller2pos: -2200
        }, 10000).onComplete(this.scrollover.bind(this)).start();
    },
    // update function
    update: function() {
        // enter pressed ?
        if (me.input.isKeyPressed('enter')) {
            me.state.change(me.state.PLAY); // Ao pressionar enter, chama o jogo
        }
        return true;
    },
    // draw function
    draw: function(context) {
        context.drawImage(this.title, 0, 0);

        //this.font.draw(context, "MARCO AURELIO APRESENTA!!!", 10, 50);
        //this.font.draw(context, "SR. AZUL CONTRA MR. INSOSSO", 10, 200);
        this.font.draw(context, "APERTE ENTER!", 150, 340);
        this.scrollerfont.draw(context, this.scroller1, this.scroller1pos, 440);
        this.scrollerfont.draw(context, this.scroller2, this.scroller2pos, 50);

    },
    // destroy function
    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.ENTER);

        //just in case
        this.scrollertween1.stop();
        this.scrollertween2.stop();
        me.audio.stopTrack();
    }

});
