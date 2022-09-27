class level extends Phaser.Scene {
    constructor() {
        super("level");
    }

    preload() {
        this.load.image("choose", "assets/選關.png");
    }

    create() {
        this.add.image(960, 540, "choose");
        this.add.text(960, 700, "--請選擇關卡--", {font: '50px Tanuki-Permanent-Marker', fill: '#000'});
        this.Scene.start("game1");
    }
}