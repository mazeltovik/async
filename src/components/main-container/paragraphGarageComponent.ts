import Component from '../../utils/component';

export default class ParagpraphGarageComponent extends Component {
    content;
    amount: string;
    constructor(amount: string, content: string, ...args: [string, string, string[]]) {
        super(...args);
        this.amount = amount;
        this.content = content;
    }
    render() {
        this.elem.classList.add(...this.classes);
        (this.elem as HTMLParagraphElement).textContent = `${this.content} (${this.amount})`;
        document.querySelector(`${this.parentNode}`)?.insertAdjacentElement('afterbegin', this.elem);
    }
    async getCars() {
        let res = await fetch('http://127.0.0.1:3000/garage');
        if (res.ok) {
            const json = await res.json();
            this.amount = json.length;
            this.render();
        } else {
            console.log('Ошибка HTTP: ' + res.status);
        }
    }
    eventHandler() {}
}
