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

        
        
        this.platforms.create(400, 750, 'Ground').setScale(6).refreshBody();

        this.platforms.create(600, 500, 'Ground');
        this.platforms.create(50, 340, 'Ground');
        this.platforms.create(1050, 345, 'Ground');

        this.Stars = this.physics.add.group({
            key: 'Star',
            repeat: 11,
            setXY: { x: 15, y: 0, stepX: 100 }
        });

        this.Stars.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        child.setScale(0.06)
        });
        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.Stars, this.platforms);
        this.physics.add.overlap(this.player,this.Stars,this.collectStar,null,this);

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
    collectStar (player, star)
    {
        star.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
    }
}
