const padding = 12;
const minimumWidth = 250;
const minimumHeight = 50;

export class MenuButton extends Phaser.GameObjects.Rectangle {
    private label: Phaser.GameObjects.BitmapText;

    constructor(scene: Phaser.Scene, x: number, y: number, text: string, onClick?: () => void) {
        super(scene, x, y);
        scene.add.existing(this);
        this.setOrigin(0, 0);

        this.label = scene.add.bitmapText(x + padding, y + padding, 'atari', text).setFontSize(18);

        const labelWidth = this.label.width + padding;
        const labelHeight = this.label.height + padding;

        this.width = labelWidth >= minimumWidth ? labelWidth : minimumWidth;
        this.height = labelHeight >= minimumHeight ? labelHeight : minimumHeight;

        this.setInteractive({ useHandCursor: true })
            .on('pointerover', this.enterMenuButtonHoverState)
            .on('pointerout', this.enterMenuButtonRestState)
            .on('pointerdown', this.enterMenuButtonActiveState)
            .on('pointerup', this.enterMenuButtonHoverState);

        if (onClick) {
            this.on('pointerup', onClick);
        }

        this.enterMenuButtonRestState();
    }

    private enterMenuButtonHoverState() {
        this.label.setTintFill(0x000000);
        this.setFillStyle(0x888888);
    }

    private enterMenuButtonRestState() {
        this.label.setTintFill(0xffffff);
        this.setFillStyle(0x222222);
    }

    private enterMenuButtonActiveState() {
        this.label.setTintFill(0xffffff);
        this.setFillStyle(0x444444);
    }
}
