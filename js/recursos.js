//recursos do jogo
game.resources = [
    /**
     * Graphics. O mapa gerado pelo "TILED" 
     */
    // our level tileset
    {name: "area01_level_tiles",  type:"image", src: "data/img/map/area01_level_tiles.png"},

    // nosso player 1
    {name: "justin_direita", type:"image", src: "data/img/sprite/justin_direita.png"},

        // nossas moedas
    {name: "spinning_coin_gold",  type:"image", src: "data/img/sprite/spinning_coin_gold.png"},

    // nosso inimigo
    {name: "wheelie_right",       type:"image", src: "data/img/sprite/wheelie_right.png"},

    // Nossa tela de inicio
    {name: "title_screen",       type:"image", src: "data/img/gui/title_screen.png"},
     
    /* 
     * Mapas. 
     */
    {name: "area02", type: "tmx", src: "data/map/level1/area02.tmx"},
    {name: "area01", type: "tmx", src: "data/map/level1/area01.tmx"},
    {name: "area03", type: "tmx", src: "data/map/level1/area03.tmx"},


     /* 
     * Background music. 
     */
    {name: "dst-inertexponent", type: "audio", src: "data/bgm/", channel : 1},
     
    /* 
     * Sound effects. 
     */
    {name: "cling", type: "audio", src: "data/sfx/", channel : 2},
    {name: "stomp", type: "audio", src: "data/sfx/", channel : 1},
    {name: "jump",  type: "audio", src: "data/sfx/", channel : 1},

    // game font
	{
    name: "32x32_font",
    type: "image",
    src: "data/img/sprite/32x32_font.png"
	}
 
];