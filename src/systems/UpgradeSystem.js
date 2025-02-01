import GameState from "../components/game/gameState";
import Ufo from "../components/game/ufo";
import Upgrade from "../components/game/upgrade";
import Weapon from "../components/game/weapon";
import System from "../system";

export default class UpgradeSystem extends System {

    constructor(world) {
        super();
        this.world = world;
    }

    update() {
        if (!this.upgrade) {
            this.upgrade = System.findComponent(this.world.entities, Upgrade);
        }

        if (!this.gameState) {
            this.gameState = System.findComponent(this.world.entities, GameState);
        }

        if (!this.ufo) {
            this.ufo = System.findComponent(this.world.entities, Ufo);
        }

        if (!this.weapon) {
            this.weapon = System.findComponent(this.world.entities, Weapon);
        }
    }

    buy(name) {
        const upgrade = this.upgrade.upgrades[name];
        if (!this.isAffordable(name)) {
            return;
        }

        this.gameState.stars -= upgrade.cost;
        upgrade.unlocked = true;
        upgrade.level++;
        upgrade.cost += upgrade.increaseCost;

        if (name === "shield") {
            this.gameState.initialLife += 1;
        }

        if (name === "weapon") {
            this.weapon.weaponLevel++;
        }

        if (name === "skip") {
            this.gameState.skip += 100;
        }
    }

    getCost(name) {
        return this.upgrade.upgrades[name].cost;
    }

    getLevel(name) {
        return this.upgrade.upgrades[name].level;
    }

    isUnlocked(name) {
        return this.upgrade.upgrades[name].unlocked;
    }

    isAffordable(name) {
        const upgrade = this.upgrade.upgrades[name];
        return this.gameState.stars >= upgrade.cost;
    }
}
