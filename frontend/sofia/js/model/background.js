/**
 * Created by Dmitry Bezugly <bezugly.ru> on 26.01.2017.
 */

/**
 * Модель фона
 */
export default class Background {
    constructor(queue) {
        this.TILE_WIDTH = 100;
        this.TILE_HEIGHT = 83;
        this.TILE_OFFSET_Y = 9;

        this.queue = queue;
    }

    /**
     * Создание фона
     *
     * @param {Object} stage - сцена
     */
    createBackground(stage) {
        for (let i = 0; i < 6; i += 1) {
            let type = 'stone';

            if (i === 0) type = 'water';
            else if (i === 5) type = 'grass';

            for (let j = 0; j < 7; j += 1) {
                stage.addChild(this.createTile(type, i, j));
            }
        }
    }

    /**
     * Создание кусочка фона
     *
     * @param {String} type - id картинки
     * @param {Number} i - итератор
     * @param {Number} j - итератор
     *
     * @returns {createjs.Bitmap}
     */
    createTile(type, i, j) {
        const tile = new createjs.Bitmap(this.queue.getResult(type));

        tile.x = j * this.TILE_WIDTH;
        tile.y = (i * this.TILE_HEIGHT) - this.TILE_OFFSET_Y;

        return tile;
    }

    /**
     * Размер кусочка фона
     *
     * @returns {{ width: number, height: number, offsetY: number }}
     */
    get tileSize() {
        return {
            width: this.TILE_WIDTH,
            height: this.TILE_HEIGHT,
            offsetY: this.TILE_OFFSET_Y,
        };
    }
}
