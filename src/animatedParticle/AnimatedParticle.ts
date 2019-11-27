import { AnimatedParticleEmitter } from './AnimatedParticleEmitter';

export class AnimatedParticle extends Phaser.GameObjects.Particles.Particle {
    private static lastReverse: boolean = false;
    private isReverse: boolean = false;
    private frameIndex: number;
    private updateInterval: number;
    private timeSinceFrameChange: number;
    private maxFrame: number;

    constructor(emitter: AnimatedParticleEmitter) {
        super(emitter);
        if (emitter.reverseAnimation) {
            if (AnimatedParticle.lastReverse === false) {
                this.isReverse = true;
                AnimatedParticle.lastReverse = true;
            } else {
                AnimatedParticle.lastReverse = false;
            }
        }
        this.frameIndex = 0;
        this.timeSinceFrameChange = 0;
        this.maxFrame = this.emitter.frames.length - 1;
        this.updateInterval = .05; // fps prop?
    }

    public update(delta: number, step: number, processors: any[]): boolean {
        let returnVale = super.update(delta, step, processors);

        this.timeSinceFrameChange += delta / 1000;
        if (this.timeSinceFrameChange >= this.updateInterval) {
           if (this.isReverse) {
                    this.frameIndex--;

                    if (this.frameIndex < 0) {
                        this.frameIndex = this.maxFrame;
                    }
                } else {
                    this.frameIndex++;

                    if (this.frameIndex > this.maxFrame) {
                        this.frameIndex = 0;
                    }

                }

           this.timeSinceFrameChange = 0;
        }
        this.frame = this.emitter.frames[this.frameIndex];
        return returnVale;
    }

}
