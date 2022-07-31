import Component from '../../utils/component';
import './garageBtn.scss';
export default class RaceBtn extends Component {
    text;
    constructor(...args: [string, string, string[]]) {
        super(...args);
        this.text = 'Race';
    }
    render() {
        super.render();
        (this.elem as HTMLButtonElement).textContent = this.text;
    }
}
