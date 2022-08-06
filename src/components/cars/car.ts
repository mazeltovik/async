import SELECTORS from '../../utils/selectors';
import SelectBtn from '../buttons/selectBtn';
import RemoveBtn from '../buttons/removeBtn';
import EngineBtn from '../buttons/engineBtn';
import DivComponent from '../main-container/divComponent';
import ImgCar from '../../imageCar/imageCar';
import '../buttons/createCar.scss';
export default class Car {
    selectBtn;
    elem;
    removeBtn;
    span;
    // divComponent;
    engineStartBtn;
    stopEngineBtn;
    imgCar;
    constructor(public name: string, public color: string, public id: number, public classes: string[]) {
        this.elem = document.createElement('div');
        this.selectBtn = new SelectBtn(['selectBtn']);
        this.removeBtn = new RemoveBtn(['removeBtn']);
        this.span = document.createElement('span');
        // this.divComponent = new DivComponent('div', SELECTORS.carContainer, ['imgCar']);
        this.engineStartBtn = new EngineBtn(['engineBtn'], 'A');
        this.stopEngineBtn = new EngineBtn(['stopEngineBtn'], 'B');
        this.imgCar = new ImgCar(this.color, ['imgCar']);
    }
    render() {
        this.selectBtn.render();
        this.removeBtn.render();
        this.engineStartBtn.render();
        this.stopEngineBtn.render();
        this.imgCar.render(this.color);
        // this.divComponent.render();
        (this.span as HTMLSpanElement).textContent = this.name;
        (this.elem as HTMLDivElement).classList.add(...this.classes);
        (this.elem as HTMLDivElement).id = String(this.id);
        (this.elem as HTMLDivElement).setAttribute('color', this.color);
        (this.elem as HTMLDivElement).insertAdjacentElement('beforeend', this.selectBtn.elem);
        (this.elem as HTMLDivElement).insertAdjacentElement('beforeend', this.removeBtn.elem);
        (this.elem as HTMLDivElement).insertAdjacentElement('beforeend', this.span);
        (this.elem as HTMLDivElement).insertAdjacentElement('beforeend', this.engineStartBtn.elem);
        (this.elem as HTMLDivElement).insertAdjacentElement('beforeend', this.stopEngineBtn.elem);
        (this.elem as HTMLDivElement).insertAdjacentElement('beforeend', this.imgCar.elem);
        // (this.elem as HTMLDivElement).insertAdjacentElement('beforeend', this.divComponent.elem);
    }
}
