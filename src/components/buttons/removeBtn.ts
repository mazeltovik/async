export default class RemoveBtn {
    elem;
    text;
    constructor(public classes: string[]) {
        this.elem = document.createElement('button');
        this.text = 'Remove';
    }
    render() {
        (this.elem as HTMLButtonElement).textContent = this.text;
        (this.elem as HTMLButtonElement).classList.add(...this.classes);
    }
}
