/*global Phaser*/


var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {};

game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        game.load.image('player', 'assets/player.png');
        game.load.image('object', 'assets/object.png');
        game.load.image('Blockcivilian', 'assets/Blockcivilian.png');
    },

    create: function() {

        // set the background color to blue
        game.stage.backgroundColor = '#3598db';

        // Start the Arcade physics system (for movements and collisions )
        game.physics.startSystem(Phaser.Physics.Arcade);

        // Add the player at the bottom of the screen
        this.player = game.add.sprite(200, 400, 'player');

        // We need to enable phsics on the this.player
        game.physics.arcade.enable(this.player);

        //this.scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        // Enable body on player
        this.player.enableBody = true;

        // Make sure the player won't move when it hits the ball
        this.player.body.immovable = true;

        // Create the left/right arrow keys
        this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

        // Create objects group
        this.objects = game.add.group();

        //Enable body for all objects in the group
        this.objects.enableBody = true;

        // Anchor this object to _this variable
        var _this = this;
        
        this.Blockcivilians = game.add.group();
        
        this.Blockcivilians.enableBody = true;



        // Create objects over time
        setInterval(function() {
                    // create an object at the top of the screen at a random x
                    var object = _this.objects.create(Math.random() * 800, -64, 'object');

                    var Blockcivilian = _this.Blockcivilians.create(Math.random() * 800, -64, 'Blockcivilian');

                    // Let grvity do its thing
                    object.body.gravity.y = 1000;
                
                    Blockcivilian.body.gravity.y = 200;
            
        },
                700); // 1000 = 1000,s = 1 second
    },


    update: function() {
        // Move the player left/right when an arrow key is pressed
        if (this.left.isDown) this.player.body.velocity.x = -1500;
        else if (this.right.isDown) this.player.body.velocity.x = 1500;

        // Stop the player when no key is pressed
        else this.player.body.velocity.x = 0;

        // Collision between the player and the object
        game.physics.arcade.overlap(this.player, this.objects, this.hitObject, null, this);
        game.physics.arcade.overlap(this.player, this.Blockcivilians, this.hitBlockcivilian, null, this);
    },
    hitObject: function(player, object) {
        object.kill();
        this.score++;
        this.scoreText = "score" + 1;
        
    },
    hitBlockcivilian: function(player, Blockcivilian){
        Blockcivilian.kill();
        this.score++;
        this.scoreText = "score" + 1;
    }
    
};


game.state.add('main', game_state.main);
game.state.start('main');
