import Component from '../../utils/component';

export default class DivComponent extends Component {
    constructor(...args: [string, string, string[]]) {
        super(...args);
    }
    render() {
        this.elem.classList.add(...this.classes);
        document.querySelector(`${this.parentNode}`)?.insertAdjacentElement('beforeend', this.elem);
    }
}
