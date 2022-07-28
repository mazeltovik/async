import Component from '../../utils/component';
import './createCar.scss';
export default class UpdateBtn extends Component {
    elem;
    text;
    constructor(...args: [string, string, string[]]) {
        super(...args);
        this.elem = document.createElement(this.tag);
        this.text = 'Update';
    }
    render() {
        super.render();
        (this.elem as HTMLButtonElement).textContent = this.text;
    }
}
