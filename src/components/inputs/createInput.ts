import Component from '../../utils/component';

export default class CreateInput extends Component {
    type;
    name;
    id;
    constructor(...args: [string, string, string[]]) {
        super(...args);
        this.type = 'text';
        this.name = '';
        this.id = '';
    }
    render() {
        super.render();
        (this.elem as HTMLInputElement).type = this.type;
    }
    eventHandler() {
        this.elem.addEventListener('change', (event) => {
            this.name = (event.target as HTMLInputElement).value;
        });
    }
    getName() {
        return this.name;
    }
}
