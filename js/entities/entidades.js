var parcial = 0;
var habilidades = new Array();

game.MudarNivel = me.LevelEntity.extend({
    init: function(x, y, settings) {
        // construtor
        this.parent(x, y, settings);

    },
    // executar após o fade de mudança de fase
    onFadeComplete: function() {
        this.parent();
        me.state.current().changeLevel( ); // me.state.current() retorna estado da tela atual
    }


});

/*------------------- 
 Entidade PLAYER
 -------------------------------- */
game.PlayerEntity = me.ObjectEntity.extend({
    /*
     * -----
     * 
     * construtor
     * 
     * ------
     */

    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings);

        this.renderable.addAnimation("caminhar", [4, 5, 6, 7], 2);
        this.renderable.addAnimation("mortal", [0, 1, 2, 3], 2);

        this.renderable.setCurrentAnimation("caminhar");

        parcial = 0;

        // player pode sair fora do viewport (cair num buraco, saltar fora da
        // tela)
        this.alwaysUpdate = true;

        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(3, 15);

        // permite salto multiplo
        this.mutipleJump = 1;

        // corrige o espaço ocupado pela entidade
        this.updateColRect(10, // deslocamento horizontal
                48, // espaço horizontal
                -1, -0);

        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

    },
    /*
     * -----
     * 
     * atualiza posição do player
     * 
     * ------
     */

    update: function() {



        if (me.input.isKeyPressed('left') || joystick.left()) {
            // flip the sprite on horizontal axis
            this.flipX(true);

            // this.renderable.setCurrentAnimation('caminhar');
            // update the entity velocity
            this.vel.x -= this.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed('right') || joystick.right()) {
            // unflip the sprite
            this.flipX(false);

            // this.renderable.setCurrentAnimation('caminhar');
            // update the entity velocity
            this.vel.x += this.accel.x * me.timer.tick;
        } else {
            this.vel.x = 0;
        }

        if (me.input.isKeyPressed('jump') || joystick.up()) {
            if (habilidades[0] === "salto duplo") {
                this.jumping = true;

                // reset the dblJump flag if off the ground
                this.mutipleJump = (this.vel.y === 0) ? 1 : this.mutipleJump;
                this.renderable.image = me.loader.getImage("justin_mortal");
                this.renderable.setCurrentAnimation('mortal');
                if (this.mutipleJump <= 2) {
                    // easy 'math' for double jump
                    this.vel.y -= (this.maxVel.y * this.mutipleJump++)
                            * me.timer.tick;

                    me.audio.play("jump", false);
                }
            } else {
                if (!this.jumping && !this.falling) {
                    // set current vel to the maximum defined value
                    // gravity will then do the rest
                    this.vel.y = -this.maxVel.y * me.timer.tick;
                    // set the jumping flag
                    this.jumping = true;
                    this.renderable.image = me.loader.getImage("justin_mortal");
                    this.renderable.setCurrentAnimation('mortal');
                    me.audio.play("jump", false);
                }
            }
        }

        if (!this.jumping) {
            this.renderable.image = me.loader.getImage("justin_direita");
            this.renderable.setCurrentAnimation('caminhar');
        }

        // verifica se caiu em buraco
        if (!this.inViewport && (this.pos.y > me.video.getHeight())) {
            // se caiu, reinicia a nivel
            me.game.remove(this);
            me.game.viewport.fadeIn('#fff', 150, function() {
                // me.audio.play("die", false);
                me.levelDirector.reloadLevel();
                me.game.viewport.fadeOut('#fff', 150);
            });
            // faz piscar
            this.renderable.flicker(45);
            // atualiza o placar
            if (me.game.HUD.getItemValue("score") > 10) {
                // parcial = parcial - 10;
                me.game.HUD.updateItemValue("score", -parcial);
                parcial = 0;
            } else {
                me.game.HUD.setItemValue("score", 0);
            }
            return true;
        }

        // verifica e atualiza o movimento
        this.updateMovement();

        // verifica colisão com inimigo ou coletavel
        var res = me.game.collide(this);

        if (res) {
            // se inimigo
            if (res.obj.type == me.game.ENEMY_OBJECT) {
                // verifica se estou pulando nele
                if ((res.y > 0) && !this.jumping) {
                    // bounce (force jump)
                    this.falling = false;
                    this.vel.y = -this.maxVel.y * me.timer.tick;
                    // set the jumping flag
                    this.jumping = true;

                    // play some audio
                    me.audio.play("stomp", false);
                } else {

                    // me.game.remove(this);

                    // let's flicker in case we touched an enemy
                    me.game.viewport.fadeIn('#fff', 150, function() {
                        me.levelDirector.reloadLevel();
                        me.game.viewport.fadeOut('#fff', 150);
                    });
                    // faz piscar
                    this.renderable.flicker(45);
                    // atualiza o placar
                    if (me.game.HUD.getItemValue("score") > 10) {
                        // parcial = parcial - 10;
                        me.game.HUD.updateItemValue("score", -parcial);
                        parcial = 0;
                    } else {
                        me.game.HUD.setItemValue("score", 0);
                    }

                }
            }
        }

        // atualiza a animação se necessário
        if (this.vel.x != 0 || this.vel.y != 0) {
            // update object animation
            this.parent();

            return true;
        }

        // else inform the engine we did not perform
        // any update (e.g. position, animation)
        return false;
    }

});


game.CoinEntity = me.CollectableEntity.extend({
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);

    },
    // this function is called by the engine, when
    // an object is touched by something (here collected)
    onCollision: function() {
        // do something when collected

        // make sure it cannot be collected "again"

        this.collidable = false;
        // remove it
        me.game.remove(this);

        // ganha 250 pontos por moeda
        parcial = parcial + 250;
        me.game.HUD.updateItemValue("score", 250);

        // som quando pega moeda
        me.audio.play("cling", false);
    }

});

game.Habilidade = me.CollectableEntity.extend({
    // extending the init function is not mandatory
    // unless you need to add some extra initialization

    init: function(x, y, settings) {
        // call the parent constructor
        if (habilidades[0] !== "salto duplo") {
            this.parent(x, y, settings);

            this.renderable.addAnimation("idle", [0, 1, 2, 3, 4, 5], 10);

            this.renderable.setCurrentAnimation("idle");
        }
    },
    // this function is called by the engine, when
    // an object is touched by something (here collected)
    onCollision: function() {
        // do something when collected

        habilidades[0] = "salto duplo";
        // make sure it cannot be collected "again"
        this.collidable = false;
        // remove it

        me.game.remove(this);

        me.game.HUD.addItem("mensagem", new game.LevelDisplay(50, 0));
        me.game.HUD.setItemValue("mensagem", "NOVA HABILIDADE: \n" + habilidades[0]);
        me.audio.play("cling", false);


        window.setTimeout(// tempo da mensagem na tela
                function() {
                    me.game.HUD.removeItem("mensagem");
                }, 5000 // 5000ms = 5 segundos
                );
    }

});



/*
 * -------------------------- Entidade Inimigo ------------------------
 */
game.EnemyEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        // define this here instead of tiled
        settings.image = "wheelie_right";
        settings.spritewidth = 64;

        // call the parent constructor
        this.parent(x, y, settings);

        /*
         * //Animação reservada para o Boss this.renderable.addAnimation("Boss",
         * [0, 1, 2, 3,4,5,6,7,8,9], 3); this.renderable.image =
         * me.loader.getImage("AnimeMarioBoss");
         */

        // corrige o espaço ocupado pela entidade
        this.updateColRect(6, 48, -1, 0);

        this.startX = x;
        this.endX = x + settings.width - settings.spritewidth;
        // size of sprite

        // make him start from the right
        this.pos.x = x + settings.width - settings.spritewidth;
        this.walkLeft = true;

        // walking & jumping speed
        this.setVelocity(4, 6);

        // make it collidable
        this.collidable = true;

        // make it a enemy object
        this.type = me.game.ENEMY_OBJECT;

    },
    // call by the engine when colliding with another object
    // obj parameter corresponds to the other object (typically the player)
    // touching this one
    onCollision: function(res, obj) {

        // res.y >0 verifica se foi tocado por cima
        // which mean at top position for this one
        if (this.alive && (res.y > 0) && obj.falling) {

            try {
                this.renderable.flicker(45);
            } finally {
                // ganha 300 pontos por pular no inimigo
                parcial = parcial + 300;
                me.game.HUD.updateItemValue("score", 300);
                me.game.remove(this);
            }

        }

    },
    // manage the enemy movement
    update: function() {
        // do nothing if not in viewport
        if (!this.inViewport)
            return false;

        if (this.alive) {
            if (this.walkLeft && this.pos.x <= this.startX) {
                this.walkLeft = false;
            } else if (!this.walkLeft && this.pos.x >= this.endX) {
                this.walkLeft = true;
            }
            // make it walk
            this.flipX(this.walkLeft);
            this.vel.x += (this.walkLeft) ? -this.accel.x * me.timer.tick
                    : this.accel.x * me.timer.tick;

        } else {
            this.vel.x = 0;
        }

        // check and update movement
        this.updateMovement();

        // update animation if necessary
        if (this.vel.x != 0 || this.vel.y != 0) {
            // update object animation
            this.parent();
            return true;
        }
        return false;
    }
});

/*
 * Entidade inimiga, agora o macaco
 * 
 */

game.EnemyMonkey = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        // define this here instead of tiled
        settings.image = "monkey_right";
        settings.spritewidth = 64;

        // call the parent constructor
        this.parent(x, y, settings);

        // Animação reservada para o Boss
        this.renderable.addAnimation("monkie", [0, 1, 2, 3, 4], 1);
        this.renderable.setCurrentAnimation("monkie");

        // corrige o espaço ocupado pela entidade
        this.updateColRect(6, 48, -1, 0);

        this.startX = x;
        this.endX = x + settings.width - settings.spritewidth;
        // size of sprite

        // make him start from the right
        this.pos.x = x + settings.width - settings.spritewidth;
        this.walkLeft = true;

        // walking & jumping speed
        this.setVelocity(4, 6);

        // make it collidable
        this.collidable = true;

        // make it a enemy object
        this.type = me.game.ENEMY_OBJECT;

    },
    // call by the engine when colliding with another object
    // obj parameter corresponds to the other object (typically the player)
    // touching this one
    onCollision: function(res, obj) {

        // res.y >0 verifica se foi tocado no eixo y, ou seja, por cima
        // which mean at top position for this one
        if (this.alive && (res.y > 0) && obj.falling) {

            try {
                this.renderable.flicker(45);
            } finally {
                // ganha 300 pontos por pular no inimigo
                parcial = parcial + 300;
                me.game.HUD.updateItemValue("score", 300);
                me.game.remove(this);
            }

        }

    },
    // manage the enemy movement
    update: function() {
        // do nothing if not in viewport
        if (!this.inViewport)
            return false;

        if (this.alive) {
            if (this.walkLeft && this.pos.x <= this.startX) {
                this.walkLeft = false;
            } else if (!this.walkLeft && this.pos.x >= this.endX) {
                this.walkLeft = true;
            }
            // make it walk
            this.flipX(this.walkLeft);
            this.vel.x += (this.walkLeft) ? -this.accel.x * me.timer.tick
                    : this.accel.x * me.timer.tick;

        } else {
            this.vel.x = 0;
        }

        // check and update movement
        this.updateMovement();

        // update animation if necessary
        if (this.vel.x != 0 || this.vel.y != 0) {
            // update object animation
            this.parent();
            return true;
        }
        return false;
    }
});

/*-------------- 
 Placar mostrando os pontos
 --------------------- */

game.ScoreObject = me.HUD_Item.extend({
    init: function(x, y) {
        // call the parent constructor
        this.parent(x, y);
        // create a font
        this.font = new me.BitmapFont("32x32_font", 32);
        this.font.set("right");
    },
    /*
     * -----
     * 
     * draw our score
     * 
     * ------
     */
    draw: function(context, x, y) {
        this.font.draw(context, this.value, this.pos.x + x, this.pos.y + y);
    }
});

/*
 * mostrar o nivel atual
 */

game.LevelDisplay = me.HUD_Item.extend({
    init: function(x, y) {
        // call the parent constructor
        this.parent(x, y);
        // create a font
        this.font = new me.Font("Arial", 20, "white", "left");

    },
    /*
     * -----
     * 
     * draw our score
     * 
     * ------
     */
    draw: function(context, x, y) {
        this.font.draw(context, this.value, this.pos.x + x, this.pos.y + y);
        this.tween = new me.Tween(this).to({x: 200}, 3000);
        this.tween.easing(me.Tween.Easing.Bounce.EaseOut);
        this.tween.start();
    }


});