import { AnimatedParticle } from '../animatedParticle/AnimatedParticle';
import { AnimatedParticleEmitter } from '../animatedParticle/AnimatedParticleEmitter';
import { AnimatedParticleEmitterConfig } from '../animatedParticle/AnimatedParticleEmitterConfig';
import { MenuButton } from '../ui/menu-button';

export class LayeredAnimationEmitterScene extends Phaser.Scene {
    private static sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
        key: 'LayeredEmitter',
        active: false,
        visible: false
    };

    constructor() {
        super(LayeredAnimationEmitterScene.sceneConfig);
    }

    public create(): void {
        let desc = this.add.bitmapText(0, 0, 'atari', 'emitter playing layered animation', 14);
        desc.setPosition(this.game.scale.width / 2 - desc.width / 2, 50);

        // this.add.image(this.game.scale.width / 2, this.game.scale.height / 2, 'logo');

        let particleManager = this.add.particles('coinParticle');
        let emitterBoundsTop: Phaser.Geom.Line = new Phaser.Geom.Line(0, 0, this.game.scale.width, 0);
        // let emitterBoundsBottom: Phaser.Geom.Line = new Phaser.Geom.Line(0, this.game.scale.height, this.game.scale.width, this.game.scale.height);

        let emitterConfig: AnimatedParticleEmitterConfig  = {
            x: 0,
            y: -32,
            frame: { frames: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ], cycle: false},
            reverseAnimation: true,
            quantity: 1,
            frequency: 0,
            angle: 90,
            speed: { min: 0, max: 25},
            gravityY: 500,
            delay: {min: 0, max: 500},
            lifespan: { min: 2500, max: 2500 },
            scale: {min: .6, max: .85},
            emitZone: {type: 'edge', source: emitterBoundsTop, stepRate: 24, quantity: 0, seamless: true},
            rotate: {start: 0, end: 360, },
        };

        let emitter = new AnimatedParticleEmitter(particleManager, emitterConfig );
        emitter.onParticleEmit((particle: AnimatedParticle, emitter: AnimatedParticleEmitter) => {
            emitter.rotate.start = Phaser.Math.RND.angle();
            emitter.rotate.end = Phaser.Math.RND.angle();
        }, this);
        particleManager.addEmitter(emitter);

        new MenuButton(this, 20, this.game.scale.height - 70, 'back', () => {
          this.scene.start('MainMenu');
        });
    }

}