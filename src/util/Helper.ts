export function getCenter(scene: Phaser.Scene): Phaser.Geom.Point {
    return new Phaser.Geom.Point(scene.game.scale.width / 2 , scene.game.scale.height / 2 );
}