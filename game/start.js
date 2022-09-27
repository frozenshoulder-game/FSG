class start extends Phaser.Scene {
    constructor() {
        super("start");
    }

    preload() {
        this.load.image("home", "assets/首頁.png");
    }

    create() {
        this.add.image(960, 540, "home");
        this.add.text(960, 700, "--點擊畫面進入--", {font: '40px Tanuki-Permanent-Marker', fill: '#000'});
        /* this.scene.start("level"); */
    }
}