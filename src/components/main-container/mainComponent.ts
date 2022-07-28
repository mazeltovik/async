import Component from '../../utils/component';
import './main.scss';
export default class MainComponent extends Component {
    elem;
    constructor(...args: [string, string, string[]]) {
        super(...args);
        this.elem = document.createElement(this.tag);
    }
    render() {
        this.elem.classList.add(...this.classes);
        document.querySelector(`${this.parentNode}`)?.insertAdjacentElement('afterbegin', this.elem);
    }
}
