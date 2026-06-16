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
        this.load.image('Heart', 'assets/hert.png');
    }
    
    create() {
        this.gameOver = false;
        this.add.image(400, 300, 'Sky');
        this.platforms = this.physics.add.staticGroup();
        this.player = this.physics.add.sprite(100, 450, 'Man').setScale(0.2);
        this.player.body.setSize(200,540)
        this.player.body.setOffset(120,50)
        this.cursors = this.input.keyboard.createCursorKeys();
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.lives = 3;
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

        this.bombs = this.physics.add.group();

        
        this.platforms.create(400, 750, 'Ground').setScale(6).refreshBody();

        this.platforms.create(600, 500, 'Ground');
        this.platforms.create(50, 340, 'Ground');
        this.platforms.create(1050, 345, 'Ground');

        this.Stars = this.physics.add.group({
            key: 'Star',
            repeat: 11,
            setXY: { x: 15, y: 0, stepX: 100 }
        });
        this.add.text(16,45,'Lives:',{
                fontSize: '32px',
                color: '#000'
            }
        );
        this.hearts = [];
        for(let i = 0; i < this.lives; i++){
           const heart =this.add.image(155 + (i * 40), 60, 'Heart');

           heart.setScale(0.5);
           heart.setScrollFactor(0);
           this.hearts.push(heart);
        }        

        this.Stars.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        child.setScale(0.06)
        });
        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });


        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.Stars, this.platforms);
        this.physics.add.overlap(this.player,this.Stars,this.collectStar,null,this);
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);

    }

    update() {
        if (this.gameOver != true){
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

    }
    collectStar(player, star)
    {
        star.disableBody(true, true);

        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);

        if (this.Stars.countActive(true) === 0)
        {
            this.Stars.children.iterate(function (child)
            {
                child.enableBody(true, child.x, 0, true, true);
            });

            const x = (player.x < 400)
                ? Phaser.Math.Between(400, 800)
                : Phaser.Math.Between(0, 400);

            const bomb = this.bombs.create(x,16, 'Bomba');
            bomb.setScale(0.1)
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(
            Phaser.Math.Between(-200, 200),
            20
            );
        }
    }

    hitBomb (player, bomb)
    {
        bomb.destroy();

        this.lives--
        this.hearts[this.lives].setVisible(false);

        if (this.lives <= 0){
            this.physics.pause()
            player.setTint(0xff0000);
            player.anims.stop();

            this.gameOver = true;
        }

    }
}
