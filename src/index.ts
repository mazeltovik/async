import MainComponent from './components/main-container/mainComponent';
import DivComponent from './components/main-container/divComponent';
import SELECTORS from './utils/selectors';
import GarageBtn from './components/buttons/garageBtn';
import WinnersBtn from './components/buttons/winnersBtn';
import CreateInput from './components/inputs/createInput';
import CreateColorInput from './components/inputs/createColorInput';
import CreateCar from './components/buttons/createCarBtn';
import UpdateBtn from './components/buttons/updataBtn';
import RaceBtn from './components/buttons/raceBtn';
import ResetBtn from './components/buttons/resetBtn';
import GenerateBtn from './components/buttons/generateBtn';
import ParagpraphGarageComponent from './components/main-container/paragraphGarageComponent';
import ParagpraphPageComponent from './components/main-container/paragpraphPageComponent';
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
    raceContainer;
    raceBtn;
    resetBtn;
    generateBtn;
    garageContainer;
    paragpraphGarageComponent;
    paragpraphPageComponent;
    constructor() {
        this.routerContainer = new DivComponent('div', SELECTORS.main, ['routerContainer']);
        this.garageBtn = new GarageBtn('button', SELECTORS.routerContainer, ['btnGarage']);
        this.winnersBtn = new WinnersBtn('button', SELECTORS.routerContainer, ['btnGarage']);
        this.controlDiv = new DivComponent('div', SELECTORS.main, ['controlContainer']);
        this.createInput = new CreateInput('input', SELECTORS.controlContainer, ['createInput']);
        this.paragpraphGarageComponent = new ParagpraphGarageComponent('', 'garage', 'p', SELECTORS.garageContainer, [
            'garageP',
        ]);
        this.paragpraphPageComponent = new ParagpraphPageComponent(1, 'page', 'p', SELECTORS.garageContainer, [
            'pageP',
        ]);
        this.createColorInput = new CreateColorInput('input', SELECTORS.controlContainer, ['createColorInput']);
        // this.createCar = new CreateCar<CreateInput, CreateColorInput, ParagpraphGarageComponent>(
        //     [this.createInput, this.createColorInput, this.paragpraphGarageComponent],
        //     'button',
        //     SELECTORS.controlContainer,
        //     ['btnCreate']
        // );
        this.updateDiv = new DivComponent('div', SELECTORS.main, ['updateContainer']);
        this.updateInput = new CreateInput('input', SELECTORS.updateContainer, []);
        this.updateColor = new CreateColorInput('input', SELECTORS.updateContainer, []);
        // this.updateBtn = new UpdateBtn<CreateInput, CreateColorInput>(
        //     this.main,
        //     [this.updateInput, this.updateColor],
        //     'button',
        //     SELECTORS.updateContainer,
        //     ['btnCreate']
        // );
        this.raceContainer = new DivComponent('div', SELECTORS.main, ['raceContainer']);
        this.raceBtn = new RaceBtn('button', SELECTORS.raceContainer, ['raceBtn']);
        this.resetBtn = new ResetBtn('button', SELECTORS.raceContainer, ['resetBtn']);
        this.generateBtn = new GenerateBtn('button', SELECTORS.raceContainer, ['btnGen']);
        this.garageContainer = new DivComponent('div', SELECTORS.main, ['garageContainer']);
        this.main = new MainComponent<ParagpraphGarageComponent, DivComponent, CreateInput, CreateColorInput>(
            [this.paragpraphGarageComponent, this.garageContainer, this.updateInput, this.updateColor],
            'div',
            SELECTORS.body,
            ['main']
        );
        this.updateBtn = new UpdateBtn<CreateInput, CreateColorInput>(
            this.main,
            [this.updateInput, this.updateColor],
            'button',
            SELECTORS.updateContainer,
            ['btnCreate']
        );
        this.createCar = new CreateCar<CreateInput, CreateColorInput, ParagpraphGarageComponent>(
            this.main,
            [this.createInput, this.createColorInput, this.paragpraphGarageComponent],
            'button',
            SELECTORS.controlContainer,
            ['btnCreate']
        );
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
        this.raceContainer.render();
        this.raceBtn.render();
        this.resetBtn.render();
        this.generateBtn.render();
        this.garageContainer.render();
        this.paragpraphGarageComponent.render();
        this.paragpraphPageComponent.render();
    }
    addHandlers() {
        this.main.eventHandler();
        this.main.clickHandler();
        this.garageBtn.eventHandler();
        this.createInput.eventHandler();
        this.createColorInput.eventHandler();
        this.createCar.eventHandler();
        this.updateInput.eventHandler();
        this.updateColor.eventHandler();
        this.updateBtn.eventHandler();
    }
}

let app = new App();
app.build();
app.addHandlers();
