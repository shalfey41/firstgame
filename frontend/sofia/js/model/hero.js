/**
 * Created by Dmitry Bezugly on 26.01.2017.
 */

/**
 * Модель героя
 */
export default class Hero {
    constructor(queue, tileSize) {
        this.player = new createjs.Bitmap(queue.getResult('hero'));

        this.player.resetPosition = {
            x: tileSize.width * 3,
            y: tileSize.height * 5,
        };

        this.initialize();
    }

    /**
     * Установка точки регистрации
     * и начальной позиции героя
     */
    initialize() {
        this.setReg();
        this.reset();
    }

    /**
     * Установка точки регистрации
     */
    setReg() {
        this.player.regY = 15;
    }

    /**
     * Установка начальной позиции героя
     */
    reset() {
        this.player.x = this.player.resetPosition.x;
        this.player.y = this.player.resetPosition.y;
    }

    /**
     * Возвращает позицию героя по оси x
     *
     * @returns {Number}
     */
    get positionX() {
        return this.player.x;
    }

    /**
     * Возвращает позицию героя по оси y
     *
     * @returns {Number}
     */
    get positionY() {
        return this.player.y;
    }

    /**
     * Установка позиции героя по оси x
     *
     * @param {Number} value - новое значение
     */
    set positionX(value) {
        this.player.x = value;
    }

    /**
     * Установка позиции героя по оси y
     *
     * @param {Number} value - новое значение
     */
    set positionY(value) {
        this.player.y = value;
    }

    /**
     * Перемещение героя стрелками
     *
     * @param {Number} key - код клавиши
     * @param {Object} tileSize - размер кусочка фона
     */
    move(key, tileSize) {
        const ACTIONS = {
            37: 'left',
            38: 'top',
            39: 'right',
            40: 'down',
        };

        if (!Object.keys(ACTIONS).some(action => +action === key)) return;

        const tile = tileSize;
        let newX = this.positionX;
        let newY = this.positionY;

        switch (ACTIONS[key]) {
            case 'left': {
                newX -= tile.width;
                break;
            }
            case 'top': {
                newY -= tile.height;
                break;
            }
            case 'right': {
                newX += tile.width;
                break;
            }
            case 'down': {
                newY += tile.height;
                break;
            }
        }

        if (newX < 0 || newX > tile.width * 6 || newY < 0 || newY > tile.height * 5) return;

        this.positionX = newX;
        this.positionY = newY;
    }
}
