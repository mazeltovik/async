export default class EngineBtn {
    elem;
    constructor(public classes: string[], public text: string) {
        this.elem = document.createElement('button');
    }
    render() {
        (this.elem as HTMLButtonElement).textContent = this.text;
        (this.elem as HTMLButtonElement).classList.add(...this.classes);
    }
    startStopCar(event: MouseEvent) {
        let divFromStart = (event.target as HTMLElement).classList.contains('engineBtn')
            ? (event.target as HTMLElement).closest('div')
            : null;
        console.log(divFromStart);
    }
}
