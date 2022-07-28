import Component from '../../utils/component';
import CreateInput from '../inputs/createInput';
import CreateColorInput from '../inputs/createColorInput';
import './createCar.scss';
export default class CreateCar extends Component {
    elem;
    text;
    communicationWith;
    constructor(communicationWith: [CreateInput, CreateColorInput], ...args: [string, string, string[]]) {
        super(...args);
        this.elem = document.createElement(this.tag);
        this.text = 'Create';
        this.communicationWith = communicationWith;
    }
    render() {
        super.render();
        (this.elem as HTMLButtonElement).textContent = this.text;
    }
    eventHandler() {
        this.elem.addEventListener('click', async (event) => {
            let body = {
                name: this.communicationWith[0].getName(),
                color: this.communicationWith[1].getColor(),
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
                console.log(json);
            }
        });
    }
    getBody(name: string, color: string) {
        return {
            name: name,
            color: color,
        };
    }
}
