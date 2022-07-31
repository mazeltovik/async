import Component from '../../utils/component';
import './createCar.scss';
export default class GenerateBtn extends Component {
    text;
    constructor(...args: [string, string, string[]]) {
        super(...args);
        this.text = 'Generate Cars';
    }
    render() {
        super.render();
        (this.elem as HTMLButtonElement).textContent = this.text;
    }
}
