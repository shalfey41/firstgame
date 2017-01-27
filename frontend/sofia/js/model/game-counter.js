/**
 * Created by Dmitry Bezugly on 26.01.2017.
 */

/**
 * Счет игры
 */
export default class Level {
    constructor() {
        this.levelNumber = 1;
        this.level = new createjs.Text(`Уровень: ${this.levelNumber}`, '30px Arial', '#fff');
    }

    /**
     * Увеличение уровня
     */
    levelUp() {
        this.levelNumber += 1;
        this.setLevelText();
    }

    /**
     * Установка уровня к нулю
     */
    resetLevel() {
        this.levelNumber = 1;
        this.setLevelText();
    }

    /**
     * Запись текста уровня
     */
    setLevelText() {
        this.level.text = `Уровень: ${this.levelNumber}`;
    }

    /**
     * Устанавливает начальную позицию уровня
     * и возвращает объект
     *
     * @returns {createjs.Text}
     */
    get levelPosition() {
        this.level.x = 20;
        this.level.y = 20;

        return this.level;
    }
}
