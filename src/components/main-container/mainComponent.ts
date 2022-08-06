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
type Draw = (x: number) => void;
type Timing = (t: number) => number;
export default class MainComponent<
    K extends unknown,
    G extends unknown,
    I extends unknown,
    C extends unknown
> extends Component {
    communicationWith;
    arrCars: Car[];
    requestId;
    constructor(communicationWith: [K, G, I, C], ...args: [string, string, string[]]) {
        super(...args);
        this.communicationWith = communicationWith;
        this.arrCars = [];
        this.requestId = 0;
    }
    render() {
        this.elem.classList.add(...this.classes);
        document.querySelector(`${this.parentNode}`)?.insertAdjacentElement('afterbegin', this.elem);
    }

    // Получение машин

    renderCars(arr: ResCars) {
        this.arrCars = arr.map((v) => {
            let car = new Car(v.name, v.color, v.id, ['carContainer']);
            car.render();
            (this.communicationWith[1] as DivComponent).elem.insertAdjacentElement('beforeend', car.elem);
            return car;
        });
    }
    async getCars() {
        let res = await fetch('http://127.0.0.1:3000/garage/');
        if (res.ok) {
            let json = await res.json();
            (this.communicationWith[0] as ParagpraphGarageComponent).amount = json.length;
            (this.communicationWith[0] as ParagpraphGarageComponent).render();
            this.renderCars(json);
        } else {
            console.log('Ошибка HTTP: ' + res.status);
        }
    }

    eventHandler() {
        window.onload = () => {
            this.getCars();
        };
    }

    // Получение марки машины

    getName(div: HTMLDivElement) {
        let indexName = this.arrCars.findIndex((v) => {
            return v.id == Number(div.id);
        });

        let spanContent = document.getElementById(`${div.id}`)!.querySelector('span')!.textContent as string;

        this.arrCars[indexName].name = spanContent;
        (this.communicationWith[0] as ParagpraphGarageComponent).amount = String(this.arrCars.length);
        (this.communicationWith[0] as ParagpraphGarageComponent).render();
        (this.communicationWith[2] as CreateInput).id = div.id;
        (this.communicationWith[2] as CreateInput).name = `${this.arrCars[indexName].name}`;
        ((this.communicationWith[2] as CreateInput).elem as HTMLInputElement).value = `${this.arrCars[indexName].name}`;
        ((this.communicationWith[2] as CreateInput).elem as HTMLInputElement).focus();
    }

    // Получение цвета машины

    getColor(div: HTMLDivElement) {
        let divColor = document.getElementById(`${div.id}`)?.getAttribute('color') as string;

        let indexName = this.arrCars.findIndex((v) => {
            return v.color == divColor || v.id == Number(div.id);
        });
        (this.communicationWith[0] as ParagpraphGarageComponent).amount = String(this.arrCars.length);
        (this.communicationWith[0] as ParagpraphGarageComponent).render();
        // let indexName = Number(div.id) - 1;
        // let divColor = document.getElementById(`${indexName + 1}`)?.getAttribute('color') as string;
        this.arrCars[indexName].color = divColor;
        (this.communicationWith[3] as CreateColorInput).id = div.id;
        ((this.communicationWith[3] as CreateColorInput).elem as HTMLInputElement).value =
            this.arrCars[indexName].color;

        (this.communicationWith[3] as CreateColorInput).color = this.arrCars[indexName].color;
    }

    //Обработчик кнопки Selecet c применение делегирования

    selectHandler(event: MouseEvent) {
        let divFromSelect = (event.target as HTMLElement).classList.contains('selectBtn')
            ? (event.target as HTMLElement).closest('div')
            : null;
        if (divFromSelect) {
            this.getName(divFromSelect);
            this.getColor(divFromSelect);
        }
    }

    // Удаление машины

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
            (this.communicationWith[0] as ParagpraphGarageComponent).amount = String(this.arrCars.length);
            (this.communicationWith[0] as ParagpraphGarageComponent).render();
        }
    }

    // Анимация запуска машины

    animate(duration: number, draw: Draw, timing: Timing): void {
        let start = performance.now();

        this.requestId = requestAnimationFrame(function animate(time) {
            let timeFraction = (time - start) / duration;
            if (timeFraction > 1) timeFraction = 1;

            let progress = timing(timeFraction);

            draw(progress);

            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            }
        });
    }
    startCar(event: MouseEvent) {
        let divFromStart = (event.target as HTMLElement).classList.contains('engineBtn')
            ? (event.target as HTMLElement).closest('div')
            : null;
        let svg = divFromStart?.querySelector('svg') as SVGSVGElement;
        if (divFromStart) {
            this.start(svg, divFromStart.id);
        }
    }

    // Остановка машины

    stopCar(event: MouseEvent) {
        let divFromStart = (event.target as HTMLElement).classList.contains('stopEngineBtn')
            ? (event.target as HTMLElement).closest('div')
            : null;
        let svg = divFromStart?.querySelector('svg') as SVGSVGElement;
        if (divFromStart) {
            this.stop(svg, divFromStart.id);
            // svg.style.position = 'static';
            // svg.style.marginLeft = '0px';
        }
    }

    // Запуск машины

    async start(svg: SVGSVGElement, id: string) {
        let res = await fetch(`http://127.0.0.1:3000/engine?id=${id}&status=started`, {
            method: 'PATCH',
        });

        if (res.ok) {
            let data = await res.json();
            svg.style.position = 'relative';
            this.driveMode(svg, id);
            let time = data.distance / data.velocity;
            console.log(time);
            this.animate(
                time,
                function (progress) {
                    svg.style.left = progress * 700 + 'px';
                },
                function (timeFraction) {
                    return Math.pow(timeFraction, 2);
                }
            );
        } else {
            console.log('Ошибка HTTP: ' + res.status);
        }
    }
    async driveMode(svg: SVGSVGElement, id: string) {
        let res = await fetch(`http://127.0.0.1:3000/engine?id=${id}&status=drive`, {
            method: 'PATCH',
        });
        if (res.ok) {
            // console.log(await res.json());
        } else {
            let x = svg.style.left;
            svg.style.position = 'static';
            svg.style.marginLeft = x;
            console.log('Ошибка HTTP: ' + res.status);
        }
    }

    // Остановка машины

    async stop(svg: SVGSVGElement, id: string) {
        let res = await fetch(`http://127.0.0.1:3000/engine?id=${id}&status=stopped`, {
            method: 'PATCH',
        });
        if (res.ok) {
            svg.style.position = 'static';
            svg.style.marginLeft = '0px';
        }
    }
    clickHandler() {
        this.elem.addEventListener('click', (event) => {
            this.selectHandler(event);
            this.removeHandler(event);
            this.startCar(event);
            this.stopCar(event);
        });
    }
}
