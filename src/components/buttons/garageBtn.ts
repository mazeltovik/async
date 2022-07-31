import Component from '../../utils/component';
import './garageBtn.scss';
export default class GarageBtn extends Component {
    text;
    constructor(...args: [string, string, string[]]) {
        super(...args);
        this.text = 'To garage';
    }
    render() {
        super.render();
        (this.elem as HTMLButtonElement).textContent = this.text;
    }
    eventHandler(): void {
        this.elem.addEventListener('click', async (event) => {
            let res = await fetch('http://127.0.0.1:3000/garage');
            if (res.ok) {
                const json = await res.json();
                console.log(json);
            } else {
                console.log('Ошибка HTTP: ' + res.status);
            }
        });
    }
}
