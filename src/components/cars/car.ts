import SELECTORS from '../../utils/selectors';
import SelectBtn from '../buttons/selectBtn';
import RemoveBtn from '../buttons/removeBtn';
import '../buttons/createCar.scss';
export default class Car {
    selectBtn;
    elem;
    removeBtn;
    span;
    constructor(public name: string, public color: string, public id: number, public classes: string[]) {
        this.elem = document.createElement('div');
        this.selectBtn = new SelectBtn(['selectBtn']);
        this.removeBtn = new RemoveBtn(['removeBtn']);
        this.span = document.createElement('span');
    }
    render() {
        this.selectBtn.render();
        this.removeBtn.render();
        (this.span as HTMLSpanElement).textContent = this.name;
        (this.elem as HTMLDivElement).classList.add(...this.classes);
        (this.elem as HTMLDivElement).id = String(this.id);
        (this.elem as HTMLDivElement).setAttribute('color', this.color);
        (this.elem as HTMLDivElement).insertAdjacentElement('beforeend', this.selectBtn.elem);
        (this.elem as HTMLDivElement).insertAdjacentElement('beforeend', this.removeBtn.elem);
        (this.elem as HTMLDivElement).insertAdjacentElement('beforeend', this.span);
    }
}
