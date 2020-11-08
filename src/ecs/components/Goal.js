import { Component } from 'geotic';
import * as GoalEvaluator from '../../ai/GoalEvaluator';

export class Goal extends Component {
    static properties = {
        name: 'Bored',
        originalIntent: '<Entity>',
        parent: '<Entity>',
        target: '<Entity>',
        cost: 0,
        complete: false,
    };

    isFinished() {
        return GoalEvaluator.isFinished(this.parent, this);
    }

    takeAction() {
        return GoalEvaluator.takeAction(this.parent, this);
    }
}