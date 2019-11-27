import { AnimatedParticleEmitterConfig } from './../animatedParticle/AnimatedParticleEmitterConfig';
import { MenuButton } from '../ui/menu-button';
import { AnimatedParticleEmitter } from '../animatedParticle/AnimatedParticleEmitter';

export class SimpleAnimationEmitterScene extends Phaser.Scene {
    private static sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
        key: 'SimpleEmitter',
        active: false,
        visible: false
    };

    constructor() {
        super(SimpleAnimationEmitterScene.sceneConfig);
    }

    public create(): void {
        let desc = this.add.bitmapText(0, 0, 'atari', 'emitter playing animation', 14);
        desc.setPosition(this.game.scale.width / 2 - desc.width / 2, 50);
        let particleManager = this.add.particles('coinParticle');

        let emitterConfig: AnimatedParticleEmitterConfig  = {
            x: this.game.scale.width / 2,
            y: this.game.scale.height - 20,
            frame: { frames: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ], cycle: false},
            reverseAnimation: false,
            quantity: 1,
            frequency: 120,
            angle: { min: -65, max: -115 },
            speed: 550,
            gravityY: 500,
            lifespan: { min: 2500, max: 2500 },
        };

        let emitter = new AnimatedParticleEmitter(particleManager, emitterConfig );
        particleManager.addEmitter(emitter);

        new MenuButton(this, 20, this.game.scale.height - 70, 'back', () => {
            this.scene.start('MainMenu');
        });
    }
}