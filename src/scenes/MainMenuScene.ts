import { MenuButton } from '../ui/menu-button';

export class MainMenuScene extends Phaser.Scene {
    private static sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
        key: 'MainMenu',
        active: false,
        visible: false,
    };

    constructor() {
        super(MainMenuScene.sceneConfig);
    }

    public create(): void {
        let desc = this.add.bitmapText(0, 0, 'atari' , 'Coin Effects', 22);
        desc.setPosition(80, 45);

        new MenuButton(this, 100, 100, 'Anim Variations', () => {
            this.scene.start('Variations');
        });

        new MenuButton(this, 100, 155, 'Simple Anim Emitter', () => {
            this.scene.start('SimpleEmitter');
        });

        new MenuButton(this, 100, 210, 'Layered Anim Emitter', () => {
            this.scene.start('LayeredEmitter');
        });
    }
}
