import Component from '../../utils/component';
import ParagpraphGarageComponent from './paragraphGarageComponent';
import Car from '../cars/car';
import './main.scss';
import DivComponent from './divComponent';
import CreateInput from '../inputs/createInput';
import CreateColorInput from '../inputs/createColorInput';
type ResCar = {
    name: string;
    color: string;
    id: number;
};
type ResCars = ResCar[];

export default class MainComponent<K, G, I, C> extends Component {
    communicationWith;
    arrCars: Car[];
    constructor(communicationWith: [K, G, I, C], ...args: [string, string, string[]]) {
        super(...args);
        this.communicationWith = communicationWith;
        this.arrCars = [];
    }
    render() {
        this.elem.classList.add(...this.classes);
        document.querySelector(`${this.parentNode}`)?.insertAdjacentElement('afterbegin', this.elem);
    }
    renderCars(arr: ResCars) {
        this.arrCars = arr.map((v) => {
            let car = new Car(v.name, v.color, v.id, ['carContainer']);
            car.render();
            (this.communicationWith[1] as unknown as DivComponent).elem.insertAdjacentElement('beforeend', car.elem);
            return car;
        });
    }
    async getCars() {
        let res = await fetch('http://127.0.0.1:3000/garage');
        if (res.ok) {
            let json = await res.json();
            (this.communicationWith[0] as unknown as ParagpraphGarageComponent).amount = json.length;
            (this.communicationWith[0] as unknown as ParagpraphGarageComponent).render();
            this.renderCars(json);
            console.log(this.arrCars);
        } else {
            console.log('Ошибка HTTP: ' + res.status);
        }
    }
    eventHandler() {
        window.onload = () => {
            this.getCars();
        };
    }
    getName(div: HTMLDivElement) {
        let indexName = this.arrCars.findIndex((v) => {
            return v.id == Number(div.id);
        });

        let spanContent = document.getElementById(`${div.id}`)!.querySelector('span')!.textContent as string;
        console.log(this.arrCars);
        this.arrCars[indexName].name = spanContent;
        (this.communicationWith[0] as unknown as ParagpraphGarageComponent).amount = String(this.arrCars.length);
        (this.communicationWith[0] as unknown as ParagpraphGarageComponent).render();
        (this.communicationWith[2] as unknown as CreateInput).id = div.id;
        (this.communicationWith[2] as unknown as CreateInput).name = `${this.arrCars[indexName].name}`;
        (
            (this.communicationWith[2] as unknown as CreateInput).elem as HTMLInputElement
        ).value = `${this.arrCars[indexName].name}`;
        ((this.communicationWith[2] as unknown as CreateInput).elem as HTMLInputElement).focus();
    }
    getColor(div: HTMLDivElement) {
        let divColor = document.getElementById(`${div.id}`)?.getAttribute('color') as string;

        let indexName = this.arrCars.findIndex((v) => {
            return v.color == divColor || v.id == Number(div.id);
        });
        (this.communicationWith[0] as unknown as ParagpraphGarageComponent).amount = String(this.arrCars.length);
        (this.communicationWith[0] as unknown as ParagpraphGarageComponent).render();
        // let indexName = Number(div.id) - 1;
        // let divColor = document.getElementById(`${indexName + 1}`)?.getAttribute('color') as string;
        this.arrCars[indexName].color = divColor;
        (this.communicationWith[3] as unknown as CreateColorInput).id = div.id;
        ((this.communicationWith[3] as unknown as CreateColorInput).elem as HTMLInputElement).value =
            this.arrCars[indexName].color;

        (this.communicationWith[3] as unknown as CreateColorInput).color = this.arrCars[indexName].color;
    }
    selectHandler(event: MouseEvent) {
        let divFromSelect = (event.target as HTMLElement).classList.contains('selectBtn')
            ? (event.target as HTMLElement).closest('div')
            : null;
        if (divFromSelect) {
            this.getName(divFromSelect);
            this.getColor(divFromSelect);
        }
    }
    async deleteCars(id: string) {
        let res = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
            method: 'DELETE',
        });
    }
    removeHandler(event: MouseEvent) {
        let divFromRemove = (event.target as HTMLElement).classList.contains('removeBtn')
            ? (event.target as HTMLElement).closest('div')
            : null;
        if (divFromRemove) {
            this.deleteCars(divFromRemove.id);
            this.arrCars = this.arrCars.filter((v) => {
                return String(v.id) !== divFromRemove?.id;
            });
            divFromRemove.remove();
            (this.communicationWith[0] as unknown as ParagpraphGarageComponent).amount = String(this.arrCars.length);
            (this.communicationWith[0] as unknown as ParagpraphGarageComponent).render();
        }
    }
    clickHandler() {
        this.elem.addEventListener('click', (event) => {
            this.selectHandler(event);
            this.removeHandler(event);
        });
    }
}
