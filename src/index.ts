import MainComponent from './components/main-container/mainComponent';
import DivComponent from './components/main-container/divComponent';
import SELECTORS from './utils/selectors';
import GarageBtn from './components/buttons/garageBtn';
import WinnersBtn from './components/buttons/winnersBtn';
import CreateInput from './components/inputs/createInput';
import CreateColorInput from './components/inputs/createColorInput';
import CreateCar from './components/buttons/createCarBtn';
import UpdateBtn from './components/buttons/updataBtn';
import './global.scss';

class App {
    main;
    routerContainer;
    garageBtn;
    winnersBtn;
    controlDiv;
    createInput;
    createColorInput;
    createCar;
    updateDiv;
    updateInput;
    updateColor;
    updateBtn;
    constructor() {
        this.main = new MainComponent('div', SELECTORS.body, ['main']);
        this.routerContainer = new DivComponent('div', SELECTORS.main, ['routerContainer']);
        this.garageBtn = new GarageBtn('button', SELECTORS.routerContainer, ['btnGarage']);
        this.winnersBtn = new WinnersBtn('button', SELECTORS.routerContainer, ['btnGarage']);
        this.controlDiv = new DivComponent('div', SELECTORS.main, ['controlContainer']);
        this.createInput = new CreateInput('input', SELECTORS.controlContainer, ['createInput']);
        this.createColorInput = new CreateColorInput('input', SELECTORS.controlContainer, ['createColorInput']);
        this.createCar = new CreateCar(
            [this.createInput, this.createColorInput],
            'button',
            SELECTORS.controlContainer,
            ['btnCreate']
        );
        this.updateDiv = new DivComponent('div', SELECTORS.main, ['updateContainer']);
        this.updateInput = new CreateInput('input', SELECTORS.updateContainer, []);
        this.updateColor = new CreateColorInput('input', SELECTORS.updateContainer, []);
        this.updateBtn = new UpdateBtn('button', SELECTORS.updateContainer, ['btnCreate']);
    }
    build() {
        this.main.render();
        this.routerContainer.render();
        this.garageBtn.render();
        this.winnersBtn.render();
        this.controlDiv.render();
        this.createInput.render();
        this.createColorInput.render();
        this.createCar.render();
        this.updateDiv.render();
        this.updateInput.render();
        this.updateColor.render();
        this.updateBtn.render();
    }
    addHandlers() {
        this.garageBtn.eventHandler();
        this.createInput.eventHandler();
        this.createColorInput.eventHandler();
        this.createCar.eventHandler();
    }
}

let app = new App();
app.build();
app.addHandlers();
