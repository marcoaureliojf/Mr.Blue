//recursos do jogo
// Estes recursos são chamados pelo main (game.js)
game.resources = [
    /**
     * Graphics. O mapa gerado pelo "TILED" 
     */
    // our level tileset
    {name: "area01_level_tiles", type: "image", src: "data/img/map/area01_level_tiles.png"},
    {name: "area11_level_tiles", type: "image", src: "data/img/map/area11_level_tiles.png"},
    {name: "metatiles32x32", type: "image", src: "data/img/map/metatiles32x32.png"},
    // nosso player 1
    {name: "justin_direita", type: "image", src: "data/img/sprite/justin_direita.png"},
    {name: "justin_mortal", type: "image", src: "data/img/sprite/justin_mortal.png"},
    // nossas moedas
    {name: "spinning_coin_gold", type: "image", src: "data/img/sprite/spinning_coin_gold.png"},
    // fruta de habilidades
    {name: "fruit", type: "image", src: "data/img/sprite/fruit.png"},
    // nosso inimigo
    {name: "wheelie_right", type: "image", src: "data/img/sprite/wheelie_right.png"},
    {name: "monkey_right", type: "image", src: "data/img/sprite/monkey_right_.png"},
    // Nossa tela de inicio
    {name: "title_screen", type: "image", src: "data/img/gui/title_screen.png"},
    // plano de fundo nivel 1
    {name: "area01_bkg0", type: "image", src: "data/img/map/area01_bkg0.jpg"},
    {name: "area01_bkg1", type: "image", src: "data/img/map/area01_bkg1.png"},
    {name: "area01_bkg2", type: "image", src: "data/img/map/area01_bkg2.png"},
    // plano de fundo nivel 2
    {name: "area02_bkg0", type: "image", src: "data/img/map/area11_parallax/area02_bkg0.jpg"},
    {name: "area02_bkg1", type: "image", src: "data/img/map/area11_parallax/area02_bkg1.jpg"},
    /* 
     * Mapas. 
     */
    // nivel 1
    {name: "area02", type: "tmx", src: "data/map/level1/area02.tmx"},
    {name: "area01", type: "tmx", src: "data/map/level1/area01.tmx"},
    {name: "area03", type: "tmx", src: "data/map/level1/area03.tmx"},
    // nivel 2
    {name: "area11", type: "tmx", src: "data/map/level2/area11.tmx"},
    /* 
     * Background music. 
     */
    {name: "dst-inertexponent", type: "audio", src: "data/bgm/", channel: 1},
    {name: "DST-5thStreet_Title", type: "audio", src: "data/bgm/", channel: 1},
    {name: "DST-Arch-Delerium_Ancient", type: "audio", src: "data/bgm/", channel: 1},
    /* 
     * Sound effects. 
     */
    {name: "cling", type: "audio", src: "data/sfx/", channel: 2},
    {name: "stomp", type: "audio", src: "data/sfx/", channel: 1},
    {name: "jump", type: "audio", src: "data/sfx/", channel: 1},
    // game font
    {name: "32x32_font", type: "image", src: "data/img/font/32x32_font.png"},
    {name: "16x16_font", type: "image", src: "data/img/font/16x16_font.png"}

];