import Component from '../../utils/component';

export default class ParagpraphPageComponent extends Component {
    content;
    amount: number;
    constructor(amount: number, content: string, ...args: [string, string, string[]]) {
        super(...args);
        this.amount = amount;
        this.content = content;
    }
    render() {
        this.elem.classList.add(...this.classes);
        (this.elem as HTMLParagraphElement).textContent = `${this.content} ${this.amount}`;
        document.querySelector(`${this.parentNode}`)?.insertAdjacentElement('beforeend', this.elem);
    }
}
