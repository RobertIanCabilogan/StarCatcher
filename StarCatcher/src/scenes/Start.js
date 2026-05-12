export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }

    preload() {
        this.load.image('Bomba', 'assets/bomb.png');
        this.load.image('Star', 'assets/star.png');
        this.load.image('Sky', 'assets/Bg.jpg');
        this.load.image('Ground', 'assets/Ground.png');
        this.load.spritesheet('Man', 'assets/sprite_sheet.png', { frameWidth: 32, frameHeight: 48 });
    }
    
    create() {
        
        this.add.image(400, 300, 'Sky');
        var platforms;
        platforms = this.physics.add.staticGroup();

        platforms.create(400, 568, 'Ground').setScale(2).refreshBody();

        platforms.create(600, 400, 'Ground');
        platforms.create(50, 250, 'Ground');
        platforms.create(750, 220, 'Ground');
    }

    update() {

    }
    
}
