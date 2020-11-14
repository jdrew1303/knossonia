import Manager from '../Manager';
import Display from './Display';
import spritesheets from './spritesheets';

export default class Renderer extends Manager {
    #tileWidth = 16;
    #tileHeight = 16;
    #spritesheets = {};
    #display = null;

    width = 24;
    height = 24;

    get tileWidth() {
        return this.#tileWidth;
    }

    get tileHeight() {
        return this.#tileHeight;
    }

    get display() {
        return this.#display;
    }

    get canvas() {
        return this.display.canvas;
    }

    constructor(game) {
        super(game);

        spritesheets.forEach((spritesheet) => {
            this.#spritesheets[spritesheet.name] = spritesheet;
        });

        this.#display = new Display({
            width: this.width,
            height: this.height,
            tileWidth: this.tileWidth,
            tileHeight: this.tileHeight,
        });

        document.body.appendChild(this.display.canvas);
    }

    draw(x, y, char, fg, bg) {
        this.drawSprite(x, y, char, fg, bg);
    }

    computeTextWidth(text) {
        return text.length * .5;
    }

    drawText(x, y, text, fg, bg) {
        for (let i = 0; i < text.length; i++) {
            const sprite = this.#spritesheets.font.getSprite(text.charAt(i));

            this.display.drawSprite(x + (.5 * i), y, sprite, fg, bg);
        }
    }

    drawSprite(x, y, glyph, fg1, fg2, bg) {
        const sprite = this.#spritesheets.tiles.getSprite(glyph);

        this.display.drawSprite(x, y, sprite, fg1, fg2, bg);
    }

    clear() {
        this.display.clear();
    }

    pxToTile(xPx, yPx) {
        const x = Math.trunc(xPx / this.tileWidth);
        const y = Math.trunc(yPx / this.tileHeight);

        return {x, y};
    }
}
