import Component from '../../utils/component';

export default class CreateColorInput extends Component {
    type;
    color;
    id;
    constructor(...args: [string, string, string[]]) {
        super(...args);
        this.type = 'color';
        this.color = '';
        this.id = '';
    }
    render() {
        super.render();
        (this.elem as HTMLInputElement).type = this.type;
    }
    eventHandler() {
        this.elem.addEventListener('change', (event) => {
            this.color = (event.target as HTMLInputElement).value;
        });
    }
    getColor() {
        return this.color;
    }
}
