/**
 * Created by Dmitry Bezugly on 27.01.2017.
 */

/**
 * Модель противника
 */
export default class Enemy {
    constructor(enemies, stage, queue) {
        this.enemies = [];

        this.createMany(enemies, stage, queue);
    }

    /**
     * Создание противников
     *
     * @param {Number} enemies - количество противников
     * @param {Object} stage - сцена
     * @param {Object} queue - очередь
     */
    createMany(enemies, stage, queue) {
        for (let i = 0; i < enemies; i += 1) {
            stage.addChild(this.createEnemy(queue));
        }
    }

    /**
     * Создание противника и добавление в массив всех противников
     *
     * @param {Object} queue - очередь
     *
     * @returns {createjs.Bitmap}
     */
    createEnemy(queue) {
        const enemy = new createjs.Bitmap(queue.getResult('bug'));

        this.enemies.push(enemy);

        return enemy;
    }

    /**
     * Рандомно раскидывает противников за пределами сцены
     *
     * @param {Object} tileSize - размер кусочка фона
     */
    resetAll(tileSize) {
        this.enemies.forEach((enemy) => {
            this.reset(tileSize, enemy);
        });
    }

    /**
     * Рандомно раскидывает противника за пределами сцены
     *
     * @param {Object} tileSize - размер кусочка фона
     * @param {Object} enemy - противник
     */
    reset(tileSize, enemy) {
        enemy.y = Math.floor((Math.random() * 4) + 1) * tileSize.height;
        enemy.x = -tileSize.width;
        enemy.speed = (Math.random() * 3) + 1;
    }

    /**
     * Двигает противников
     *
     * @param {Object} tileSize - размер кусочка фона
     */
    move(tileSize) {
        this.enemies.forEach((enemy, level) => {
            enemy.x += enemy.speed * (1 + (level * 0.3));

            if (enemy.x > tileSize.width * 7) this.reset(tileSize, enemy);
        });
    }
}
