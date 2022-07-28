import Component from '../../utils/component';

export default class CreateColorInput extends Component {
    elem;
    type;
    color;
    constructor(...args: [string, string, string[]]) {
        super(...args);
        this.elem = document.createElement(this.tag);
        this.type = 'color';
        this.color = '';
    }
    render() {
        super.render();
        (this.elem as HTMLInputElement).type = this.type;
    }
    eventHandler() {
        this.elem.addEventListener('change', (event) => {
            this.color = (event.target as HTMLInputElement).value;
            console.log(this.color);
        });
    }
    getColor() {
        return this.color;
    }
}
