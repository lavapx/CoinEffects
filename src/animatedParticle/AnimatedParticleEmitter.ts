import { AnimatedParticleEmitterConfig } from './AnimatedParticleEmitterConfig';
import { AnimatedParticle } from './AnimatedParticle';

export class AnimatedParticleEmitter extends Phaser.GameObjects.Particles.ParticleEmitter {
    public animated: boolean;
    public reverseAnimation: boolean;

    constructor(manager: Phaser.GameObjects.Particles.ParticleEmitterManager, config: AnimatedParticleEmitterConfig) {
        super(manager, config);
        this.reverseAnimation = config.reverseAnimation;
        this.particleClass = Object(AnimatedParticle);
    }

    public getFrame(): Phaser.Textures.Frame {
        return this.frames[0];
    }
}