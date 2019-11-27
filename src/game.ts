import * as Phaser from 'phaser';
import Scenes from './scenes';

const config: Phaser.Types.Core.GameConfig = {
    width: 800,
    height: 600,
    type: Phaser.WEBGL,
    parent: 'game',
    scene: Scenes,
    backgroundColor: '#fafafa',
    fps: {
        min: 30,
        target: 30
    }
};

export class Game extends Phaser.Game {
    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config);
    }
}

window.addEventListener('load', () => {
    const game = new Game(config);
});