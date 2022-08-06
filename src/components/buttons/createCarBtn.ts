import Component from '../../utils/component';
import CreateInput from '../inputs/createInput';
import CreateColorInput from '../inputs/createColorInput';
import ParagpraphGarageComponent from '../main-container/paragraphGarageComponent';
import Car from '../cars/car';
import DivComponent from '../main-container/divComponent';
import MainComponent from '../main-container/mainComponent';
import './createCar.scss';
type ResCar = {
    name: string;
    color: string;
    id: number;
};
type ResCars = ResCar[];

export default class CreateCar<K extends unknown, V extends unknown, Z extends unknown> extends Component {
    text;
    communicationWith;
    constructor(
        public main: MainComponent<ParagpraphGarageComponent, DivComponent, CreateInput, CreateColorInput>,
        communicationWith: [K, V, Z],
        ...args: [string, string, string[]]
    ) {
        super(...args);
        this.text = 'Create';
        this.communicationWith = communicationWith;
    }
    render() {
        super.render();
        (this.elem as HTMLButtonElement).textContent = this.text;
    }
    async createCar() {
        let body = {
            name: (this.communicationWith[0] as CreateInput).getName() || 'default Car',
            color: (this.communicationWith[1] as CreateColorInput).getColor() || '#fb0404',
        };
        let res = await fetch('http://127.0.0.1:3000/garage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        if (res.ok) {
            const json = await res.json();
            let car = new Car(json.name, json.color, json.id, ['carContainer']);
            car.render();
            this.main.arrCars.push(car);
            (document.querySelector('.garageContainer') as HTMLDivElement).insertAdjacentElement('beforeend', car.elem);
            (this.communicationWith[2] as ParagpraphGarageComponent).amount = String(this.main.arrCars.length);
            (this.communicationWith[2] as ParagpraphGarageComponent).render();
            ((this.communicationWith[0] as CreateInput).elem as HTMLInputElement).value = '';
            (this.communicationWith[0] as CreateInput).name = '';
        }
    }
    // renderCars(arr: ResCars) {
    //     arr.forEach((v) => {
    //         let car = new Car(v.name, v.color, v.id, ['carContainer']);
    //         car.render();
    //         (this.communicationWith[2] as unknown as ParagpraphGarageComponent).elem.insertAdjacentElement(
    //             'beforeend',
    //             car.elem
    //         );
    //     });
    // }
    // async getCars() {
    //     let res = await fetch('http://127.0.0.1:3000/garage');
    //     if (res.ok) {
    //         const json = await res.json();

    //         this.renderCars(json);
    //     } else {
    //         console.log('Ошибка HTTP: ' + res.status);
    //     }
    // }
    eventHandler() {
        this.elem.addEventListener('click', async (event) => {
            this.createCar();
        });
    }
    getBody(name: string, color: string) {
        return {
            name: name,
            color: color,
        };
    }
}
