export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }

    preload() {
        this.load.image('Bomba', 'assets/bomb.png');
        this.load.image('Star', 'assets/star.png');
        this.load.image('Sky', 'assets/Bg.jpg');
        this.load.image('Ground', 'assets/platform.png');
        this.load.spritesheet('Man', 'assets/sprite_sheet.png', { frameWidth: 456, frameHeight: 587 });
    }
    
    create() {

        
        this.add.image(400, 300, 'Sky');
        this.platforms = this.physics.add.staticGroup();
        
        
        this.platforms.create(400, 750, 'Ground').setScale(6).refreshBody();

        this.platforms.create(600, 500, 'Ground');
        this.platforms.create(50, 340, 'Ground');
        this.platforms.create(1050, 345, 'Ground');
        this.playerControl()

    }

    update() {

        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);
            this.player.flipX = false;
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);
            this.player.flipX = true;
        }
        else
        {
            this.player.setVelocityX(0);

            this.player.anims.stop();
        }

        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-330);
        }
    }


    playerControl(){
        this.player = this.physics.add.sprite(100, 450, 'Man').setScale(0.2);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('Man', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('Man', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });

        this.physics.add.collider(this.player, this.platforms);
    }
    
}
