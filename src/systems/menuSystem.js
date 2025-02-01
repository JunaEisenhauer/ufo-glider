import GameState from "../components/game/gameState";
import System from "../system";
import GameStateSystem from "./gameStateSystem";
import UpgradeSystem from "./UpgradeSystem";

export default class MenuSystem extends System {

    constructor(world) {
        super();
        this.world = world;
        this.firstGame = true;
        this.menu = document.getElementById("menu");
        this.play = document.getElementById("play");
        const that = this;
        this.play.addEventListener("click", function () {
            that.clickPlay();
        });

        this.won = document.getElementById("won");
        this.lost = document.getElementById("lost");

        this.upgrades = document.getElementById("upgrades");
        this.starsUpgrades = document.getElementById("starsUpgrades");
        this.upgradesShield = document.getElementById("upgradesShield");
        this.upgradesShield.addEventListener("click", function () {
            that.buyShield();
        });
        this.upgradesWeapon = document.getElementById("upgradesWeapon");
        this.upgradesWeapon.addEventListener("click", function () {
            that.buyWeapon();
        });
        this.upgradesSkip = document.getElementById("upgradesSkip");
        this.upgradesSkip.addEventListener("click", function () {
            that.buySkip();
        });
    }

    update() {
        if (!this.gameStateSystem) {
            this.gameStateSystem = this.world.findSystem(GameStateSystem);
        }

        if (!this.gameState) {
            this.gameState = System.findComponent(this.world.entities, GameState);
        }

        if (!this.upgradeSystem) {
            this.upgradeSystem = this.world.findSystem(UpgradeSystem);
        }

        this.menu.hidden = !!this.gameState.running;
        this.won.hidden = !this.gameState.hasWon;
        this.lost.hidden = this.gameState.hasWon === null ? true : this.gameState.hasWon;

        this.starsUpgrades.innerHTML = this.gameState.stars;

        this.upgradesShield.innerHTML = "SHIELD (" + this.upgradeSystem.getLevel("shield") + ")<br>Cost: " + this.upgradeSystem.getCost("shield") + " Stars";
        if (this.upgradeSystem.isAffordable("shield")) {
            this.upgradesShield.classList.add("affordable");
            this.upgradesShield.classList.remove("locked");
        } else {
            this.upgradesShield.classList.add("locked");
            this.upgradesShield.classList.remove("affordable");
        }

        this.upgradesWeapon.innerHTML = "WEAPON (" + this.upgradeSystem.getLevel("weapon") + ")<br>Cost: " + this.upgradeSystem.getCost("weapon") + " Stars";
        if (this.upgradeSystem.isAffordable("weapon")) {
            this.upgradesWeapon.classList.add("affordable");
            this.upgradesWeapon.classList.remove("locked");
        } else {
            this.upgradesWeapon.classList.add("locked");
            this.upgradesWeapon.classList.remove("affordable");
        }

        this.upgradesSkip.innerHTML = "SPEED BOOST (" + this.upgradeSystem.getLevel("skip") + ")<br>Cost: " + this.upgradeSystem.getCost("skip") + " Stars";
        if (this.upgradeSystem.isAffordable("skip")) {
            this.upgradesSkip.classList.add("affordable");
            this.upgradesSkip.classList.remove("locked");
        } else {
            this.upgradesSkip.classList.add("locked");
            this.upgradesSkip.classList.remove("affordable");
        }

        this.upgrades.hidden = this.firstGame;
    }

    clickPlay() {
        this.gameStateSystem.startGame();
        this.firstGame = false;
    }

    buyShield() {
        this.upgradeSystem.buy("shield");
    }

    buyWeapon() {
        this.upgradeSystem.buy("weapon");
    }

    buySkip() {
        this.upgradeSystem.buy("skip");
    }
}
