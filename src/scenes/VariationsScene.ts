import { MenuButton } from './../ui/menu-button';
import * as Screen from '../util/Helper';

export class VariationsScene extends Phaser.Scene {
    private static sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
        key: 'Variations',
        active: false,
        visible: false,
    };

    private _coinAnimationConfig: Phaser.Types.Animations.Animation;
    private _coin1: Phaser.GameObjects.Sprite;
    private _coin2: Phaser.GameObjects.Sprite;
    private _coin3: Phaser.GameObjects.Sprite;
    private _coin4: Phaser.GameObjects.Sprite;

    constructor() {
        super(VariationsScene.sceneConfig);
    }

    public create(): void {
        let screenCenterX = Screen.getCenter(this).x;
        let screenCenterY = Screen.getCenter(this).y;

        let spriteSheet = this.add.image(screenCenterX, 50, 'coinAtlas', '__BASE').setScale(.5);
        // filesize could be halved
        let desc = this.add.bitmapText(0, 0, 'atari', '15 frame spritesheet @.5 scale', 14);
        desc.setPosition(spriteSheet.x - desc.width / 2,
            spriteSheet.y + spriteSheet.displayHeight / 2 + desc.height);

        let frameNames = this.anims.generateFrameNames('coinAtlas', { prefix: 'coin_', start: 1, end: 15, zeroPad: 4 });

        this._coinAnimationConfig = {
            key: 'coinSpin',
            frames: frameNames,
            frameRate: 15,
            repeat: -1,
        };

        if (this.anims.create(this._coinAnimationConfig)) {
            // normal
            this._coin1 = this.add.sprite(screenCenterX - 100, screenCenterY - 100, 'coinAtlas');
            this._coin1.anims.play('coinSpin');
            desc = this.add.bitmapText(0, 0, 'atari', 'forward', 14);
            desc.setPosition(this._coin1.x - desc.width / 2,
                this._coin1.y + this._coin1.height);

            // reverse
            this._coin2 = this.add.sprite(screenCenterX + 100 , screenCenterY - 100, 'coinAtlas');
            this._coin2.anims.playReverse('coinSpin');
            desc = this.add.bitmapText(0, 0, 'atari', 'reverse', 14);
            desc.setPosition(this._coin2.x - desc.width / 2,
                this._coin2.y + this._coin1.height);

            // angle/rotation
            this._coin3 = this.add.sprite(screenCenterX - 100, screenCenterY + 100, 'coinAtlas');
            this._coin3.angle = -90;
            this._coin3.anims.play('coinSpin');
            desc = this.add.bitmapText(0, 0, 'atari', 'angle', 14);
            desc.setPosition(this._coin3.x - desc.width / 2,
                this._coin3.y + this._coin1.height);

            // tweened
            this._coin4 = this.add.sprite(screenCenterX + 100, screenCenterY + 100, 'coinAtlas');
            this._coin4.anims.play('coinSpin');
            let tween: Phaser.Tweens.Tween;
            tween = this.tweens.add({
                targets: this._coin4,
                loop: -1,
                props: {
                    angle: {
                        value: 360,
                        duration: 5000
                    }
                }
            });
            desc = this.add.bitmapText(0, 0, 'atari', 'tween', 14);
            desc.setPosition(this._coin4.x - desc.width / 2,
                this._coin4.y + this._coin1.height);
        }

        new MenuButton(this, 20, this.game.scale.height - 70, 'back', () => {
            this.scene.start('MainMenu');
        });
    }
}