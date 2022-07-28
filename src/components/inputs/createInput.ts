import Component from '../../utils/component';

export default class CreateInput extends Component {
    elem;
    type;
    name;
    constructor(...args: [string, string, string[]]) {
        super(...args);
        this.elem = document.createElement(this.tag);
        this.type = 'text';
        this.name = '';
    }
    render() {
        super.render();
        (this.elem as HTMLInputElement).type = this.type;
    }
    eventHandler() {
        this.elem.addEventListener('change', (event) => {
            this.name = (event.target as HTMLInputElement).value;
            console.log(this.name);
        });
    }
    getName() {
        return this.name;
    }
}
