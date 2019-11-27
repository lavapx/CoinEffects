import { MenuButton } from '../ui/menu-button';

export class PreloaderScene extends Phaser.Scene {
    private static sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
        key: 'Boot',
        active: false,
        visible: false
    };

    constructor() {
        super(PreloaderScene.sceneConfig);
    }

    public preload() {
        let screenCenterX = this.game.scale.width / 2;
        let screenCenterY = this.game.scale.height / 2;

        let progressBarHeight = 70;
        let progressBarWidth = 400;

        let progressBarContainer = this.add.rectangle(screenCenterX, screenCenterY, progressBarWidth, progressBarHeight, 0x000000);
        let progressBar = this.add.rectangle(screenCenterX + 15 - progressBarContainer.width * 0.5, screenCenterY, 10, progressBarHeight - 20, 0x007aa7);

        let percentText = this.add.text(0, screenCenterY - 10, '0%').setFontSize(24).setColor('#000000');

        this.load.on('progress', (value: number) => {
            progressBar.width = (progressBarWidth - 20) * value;

            let percent = value * 100;
            percentText.setText(`${percent}%`);
            percentText.x = progressBar.x + progressBar.width - percentText.width - 5;
        });

        this.load.on('complete', () => {
            new MenuButton(this, 20, this.game.scale.height - 70, 'Start', () => {
                percentText.destroy();
                progressBar.destroy();
                progressBarContainer.destroy();

                this.scene.start('MainMenu');
            });
        });
        this.loadAssets();
    }

    private loadAssets() {
        this.load.setPath('assets');
        this.load.bitmapFont({
            key: 'atari',
            textureURL: 'fonts/atari-smooth.png',
            fontDataURL: 'fonts/atari-smooth.xml'
        });
        this.load.atlas({
            key: 'coinAtlas',
            textureURL: 'images/spinningCoin.png',
            atlasURL: 'images/spinningCoin.json'
        });
        this.load.spritesheet({
            key: 'coinParticle',
            url: 'images/spinningCoin.png',
            frameConfig: { frameWidth: 64, frameHeight: 64 }
        });
    }

}
