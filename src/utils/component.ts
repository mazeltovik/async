export default class Component {
    elem;
    constructor(public tag: string, public parentNode: string, public classes: string[] = []) {
        this.elem = document.createElement(this.tag);
    }
    render() {
        this.elem.classList.add(...this.classes);
        document.querySelector(`${this.parentNode}`)?.insertAdjacentElement('beforeend', this.elem);
    }
}
