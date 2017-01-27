/**
 * Created by Dmitry Bezugly on 26.01.2017.
 */

import * as image from '../../images';
import * as audio from '../../audio';

import Background from '../model/background';
import Hero from '../model/hero';
import Enemy from '../model/enemy';
import GameCounter from '../model/game-counter';
import KeyAndDoor from '../model/key-and-door';

/**
 * Сцена игры
 */
export default class Stage {
    /**
     * Создание сцены
     * Когда файлы загрузятся, сработает функция render
     */
    initialize() {
        this.stage = new createjs.Stage('game');
        this.queue = new createjs.LoadQueue(false);
        this.queue.addEventListener('complete', this.render.bind(this));
        this.queue.loadManifest([
            { id: 'hero', src: image.boy },
            { id: 'stone', src: image.stone },
            { id: 'water', src: image.water },
            { id: 'grass', src: image.grass },
            { id: 'bug', src: image.bug },
            { id: 'key', src: image.key },
            { id: 'door', src: image.door },
            { id: 'scream', src: audio.scream },
            { id: 'background', src: audio.background },
            { id: 'waterSplash', src: audio.splash },
        ]);
    }

    /**
     * Рендер элементов на сцене
     */
    render() {
        this.background = new Background(this.queue);
        this.background.createBackground(this.stage);

        this.keyAndDoor = new KeyAndDoor(this.queue);
        this.stage.addChild(this.keyAndDoor.getKey(this.background.tileSize));
        this.stage.addChild(this.keyAndDoor.getDoor(this.background.tileSize));

        this.hero = new Hero(this.queue, this.background.tileSize);
        this.stage.addChild(this.hero.player);

        this.bugs = new Enemy(4, this.stage, this.queue);
        this.bugs.resetAll(this.background.tileSize);

        this.gameCounter = new GameCounter();
        this.stage.addChild(this.gameCounter.levelPosition);

        createjs.Sound.play('background', { loop: -1 });

        this.setEvents();
    }

    /**
     * Подписка на события
     */
    setEvents() {
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.addEventListener('tick', this.onTick.bind(this));

        window.addEventListener('keydown', this.onKeyDown.bind(this));
    }

    /**
     * Обновляет сцену
     */
    onTick() {
        this.bugs.move(this.background.tileSize, this.gameCounter.levelNumber);

        this.checkCollision();

        this.stage.update();
    }

    /**
     * Обработчик клавиатуры
     *
     * @param e - нажатый элемент
     */
    onKeyDown(e) {
        this.hero.move(e.keyCode, this.background.tileSize);

        this.checkGotKey();

        this.checkDoor();
    }

    checkGotKey() {
        const keyPosition = this.keyAndDoor.keyPosition();
        const heroX = this.hero.positionX;
        const heroY = this.hero.positionY;

        if (keyPosition.x === heroX && keyPosition.y === heroY) this.keyAndDoor.gotKey();
    }

    checkDoor() {
        const doorPosition = this.keyAndDoor.doorPosition();
        const heroY = this.hero.positionY;
        const heroX = this.hero.positionX;

        if (heroY === 0) {
            if (doorPosition.y === heroY && this.keyAndDoor.isGotKey()) {
                this.gameCounter.levelUp();
                this.hero.reset();
                this.keyAndDoor.resetAll(this.background.tileSize);
            } else if (doorPosition.y === heroY && doorPosition.x !== heroX) {
                this.hero.reset();
            } else {
                this.hero.positionY = heroY + this.background.tileSize.height;
            }
        }
    }

    /**
     * Перезапуск игры, если герой столкнулся с препятсвием
     */
    checkCollision() {
        if (this.isCollision()) {
            this.bugs.resetAll(this.background.tileSize);
            this.hero.reset();
            this.gameCounter.resetLevel();
            this.keyAndDoor.resetAll(this.background.tileSize);
        }
    }

    /**
     * Проверка на столкновение героя и препятствий
     */
    isCollision() {
        const heroX = this.hero.positionX;
        const heroY = this.hero.positionY;
        const tile = this.background.tileSize;

        return this.bugs.enemies.some((bug) => {
            return heroY === bug.y &&
                heroX < bug.x + (tile.width * 0.75) &&
                bug.x < heroX + (tile.width * 0.75);
        });
    }
}
