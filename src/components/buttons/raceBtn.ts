import Component from '../../utils/component';
import MainComponent from '../main-container/mainComponent';
import ParagpraphGarageComponent from '../main-container/paragraphGarageComponent';
import DivComponent from '../main-container/divComponent';
import CreateInput from '../inputs/createInput';
import CreateColorInput from '../inputs/createColorInput';
import './garageBtn.scss';
import { time } from 'console';
export default class RaceBtn extends Component {
    text;
    constructor(
        public main: MainComponent<ParagpraphGarageComponent, DivComponent, CreateInput, CreateColorInput>,
        ...args: [string, string, string[]]
    ) {
        super(...args);
        this.text = 'Race';
    }
    render() {
        super.render();
        (this.elem as HTMLButtonElement).textContent = this.text;
    }
    getSvg(): SVGSVGElement[] {
        let svgs = this.main.arrCars.map((v) => {
            let svg = v.elem.querySelector('svg') as SVGSVGElement;
            svg.style.position = 'relative';
            return svg;
        });
        return svgs;
    }
    getId(): string[] {
        let ids = this.main.arrCars.map((v) => {
            return String(v.id);
        });
        return ids;
    }
    async getTime(): Promise<Promise<number | undefined>[]> {
        let urls = this.main.arrCars.map((v) => {
            return `http://127.0.0.1:3000/engine?id=${v.id}&status=started`;
        });
        let requests = urls.map((url) => {
            let res = fetch(url, {
                method: 'PATCH',
            });
            return res;
        });

        let times = await Promise.all(requests).then((responses) =>
            responses.map(async (response, i) => {
                let data = await response.json();
                let time = data.distance / data.velocity;
                let svgs = this.getSvg();
                let ids = this.getId();
                this.main.animate(
                    time,
                    function (progress) {
                        svgs[i].style.left = progress * 700 + 'px';
                    },
                    function (timeFraction) {
                        return Math.pow(timeFraction, 2);
                    }
                );
                let driveRes = await fetch(`http://127.0.0.1:3000/engine?id=${ids[i]}&status=drive`, {
                    method: 'PATCH',
                });
                if (driveRes.ok) {
                    return time;
                } else {
                    let x = svgs[i].style.left;
                    svgs[i].style.position = 'static';
                    svgs[i].style.marginLeft = x;
                    return 20000;
                }
            })
        );
        return times;
    }
    eventHandler() {
        this.elem.addEventListener('click', (event) => {
            this.getTime()
                .then((data) => {
                    if (data) return Promise.all(data);
                })
                .then((arr) => {
                    console.log(arr);
                    let minArr = arr as number[];
                    return Math.min.apply(minArr, minArr);
                })
                .then((min) => console.log(min));
        });
    }
}
