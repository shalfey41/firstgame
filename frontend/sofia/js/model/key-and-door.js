/**
 * Created by Dmitry Bezugly <bezugly.ru> on 27.01.2017.
 */

export default class KeyAndDoor {
    constructor(queue) {
        this.isKey = false;

        this.key = new createjs.Bitmap(queue.getResult('key'));
        this.door = new createjs.Bitmap(queue.getResult('door'));
    }

    getKey(tileSize) {
        this.resetKey(tileSize);

        return this.key;
    }

    getDoor(tileSize) {
        this.door.regY = 5;
        this.resetDoor(tileSize);

        return this.door;
    }

    resetAll(tileSize) {
        this.resetDoor(tileSize);
        this.resetKey(tileSize);
    }

    resetKey(tileSize) {
        this.isKey = false;

        this.key.y = Math.floor((Math.random() * 4) + 1) * tileSize.height;
        this.key.x = Math.floor((Math.random() * 7)) * tileSize.width;
    }

    resetDoor(tileSize) {
        this.door.x = Math.floor((Math.random() * 7)) * tileSize.width;
    }

    keyPosition() {
        return {
            x: this.key.x,
            y: this.key.y,
        };
    }

    isGotKey() {
        return this.isKey;
    }

    gotKey() {
        this.isKey = true;
        this.key.x = -100;
    }

    doorPosition() {
        return {
            x: this.door.x,
            y: this.door.y,
        };
    }
}
