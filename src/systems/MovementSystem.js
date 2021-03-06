import { IsDestroying, MoveCommand, Position } from '../ecs/components';
import * as Directions from '../enums/Directions';
import System from './System';

export default class MovementSystem extends System {
    #query = null;

    constructor(game) {
        super(game);
        this.#query = game.ecs.createQuery({
            all: [MoveCommand, Position],
            not: [IsDestroying],
        });
    }

    update(dt) {
        this.#query.get().forEach((entity) => {
            const delta = Directions.delta(entity.moveCommand.direction);

            entity.fireEvent('try-move', delta);

            entity.moveCommand.destroy();
        });
    }
}
