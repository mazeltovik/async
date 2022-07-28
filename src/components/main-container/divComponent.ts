import Component from '../../utils/component';

export default class DivComponent extends Component {
    elem;
    constructor(...args: [string, string, string[]]) {
        super(...args);
        this.elem = document.createElement(this.tag);
    }
    render() {
        console.log(document.querySelector('.main') as HTMLBodyElement);
        this.elem.classList.add(...this.classes);
        document.querySelector(`${this.parentNode}`)?.insertAdjacentElement('beforeend', this.elem);
    }
}
