import GameState from "../components/game/gameState";
import Weapon from "../components/game/weapon";
import ProjectileEntity from "../prefabs/projectileEntity";
import System from "../system";
import time from "../time";
import ControlSystem from "./controlSystem";

export default class WeaponSystem extends System {

    constructor(world) {
        super();
        this.world = world;
    }

    update() {
        if (!this.weapon) {
            this.weapon = System.findComponent(this.world.entities, Weapon);
        }

        if (!this.gameState) {
            this.gameState = System.findComponent(this.world.entities, GameState);
        }

        if (!this.controlSystem) {
            this.controlSystem = this.world.findSystem(ControlSystem);
        }

        if (!this.gameState.running) {
            return;
        }

        if (!this.controlSystem.shoot) {
            return;
        }

        if (this.weapon.weaponLevel === 0) {
            return;
        }

        const weaponDelay = Math.max(this.weapon.weaponDelay - this.weapon.weaponLevel * this.weapon.weaponReductionPerLevel, this.weapon.weaponMinDelay);
        if (this.weapon.lastShootTime + weaponDelay > time.current) {
            return;
        }

        const projectile = new ProjectileEntity();
        projectile.position = this.weapon.entity.position;
        this.world.addEntity(projectile);
        this.weapon.lastShootTime = time.current;
    }
}
