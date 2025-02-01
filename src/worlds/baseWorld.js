import Spawner from "../components/game/./spawner";
import Follower from "../components/game/follower";
import GameState from "../components/game/gameState";
import Upgrade from "../components/game/upgrade";
import AmbientLight from "../components/three/light/ambientLight";
import CameraEntity from "../prefabs/cameraEntity";
import SpaceStationEntity from "../prefabs/spaceStationEntity";
import UfoEntity from "../prefabs/ufoEntity";
import AlienSystem from "../systems/alienSystem";
import AnimationSystem from "../systems/animationSystem";
import BackgroundSystem from "../systems/backgroundSystem";
import BounceSystem from "../systems/bounceSystem";
import CollectSystem from "../systems/collectSystem";
import CollisionSystem from "../systems/collisionSystem";
import ControlSystem from "../systems/controlSystem";
import EnvironmentSystem from "../systems/environmentSystem";
import FollowSystem from "../systems/followSystem";
import GameStateSystem from "../systems/gameStateSystem";
import HuntSystem from "../systems/huntSystem";
import MenuSystem from "../systems/menuSystem";
import ProjectileSystem from "../systems/projectileSystem";
import ShieldSystem from "../systems/shieldSystem";
import SkipSystem from "../systems/skipSystem";
import SoundSystem from "../systems/soundSystem";
import SpawnerSystem from "../systems/spawner/spawnerSystem";
import UfoMovementSystem from "../systems/ufoMovementSystem";
import UiSystem from "../systems/uiSystem";
import UpgradeSystem from "../systems/UpgradeSystem";
import VelocitySystem from "../systems/velocitySystem";
import WeaponSystem from "../systems/weaponSystem";
import {loadAudio, loadGLTF} from "../utils/assetLoader";
import World from "../world";

export default class BaseWorld extends World {

    constructor(canvas) {
        super(canvas);
    }

    start() {
        super.start();
        this.loadAssets().then(() => {
            this.setupSystems();
            this.setupEntities();
        });
    }

    async loadAssets() {
        const ufoAsset = loadGLTF("ufo/ufo.glb", "ufo");
        const spaceStationAsset = loadGLTF("spaceStation/SpaceStation.glb", "spaceStation");
        const starAsset = loadGLTF("star/star.glb", "star");
        const rockAsset = loadGLTF("rock/rock.glb", "rock");
        const alienAsset = loadGLTF("alien/alien.glb", "alien");
        const rocketAsset = loadGLTF("rocket/rocket.glb", "rocket");
        const explosionAsset = loadAudio("sound/explosion.mp3", "explosion");
        const glissAsset = loadAudio("sound/gliss.mp3", "gliss");
        const gameoverAsset = loadAudio("sound/gameover.mp3", "gameOver");
        const winAsset = loadAudio("sound/win.mp3", "win");
        const bonusAsset = loadAudio("sound/bonus.mp3", "bonus");
        const spaceAsset = loadAudio("sound/space.mp3", "space");
        return Promise.all([ufoAsset, spaceStationAsset, starAsset, rockAsset, alienAsset, rocketAsset, explosionAsset, glissAsset, gameoverAsset, winAsset, bonusAsset, spaceAsset]);
    }

    setupSystems() {
        this.registerSystem(new GameStateSystem(this));
        this.registerSystem(new EnvironmentSystem(this));
        this.registerSystem(new BackgroundSystem(this));
        this.registerSystem(new SoundSystem(this));
        this.registerSystem(new AnimationSystem(this));
        this.registerSystem(new ControlSystem(this));
        this.registerSystem(new VelocitySystem(this));
        this.registerSystem(new BounceSystem(this));
        this.registerSystem(new FollowSystem(this));
        this.registerSystem(new UfoMovementSystem(this));
        this.registerSystem(new SpawnerSystem(this));
        this.registerSystem(new CollisionSystem(this));
        this.registerSystem(new CollectSystem(this));
        this.registerSystem(new AlienSystem(this));
        this.registerSystem(new HuntSystem(this));
        this.registerSystem(new ShieldSystem(this));
        this.registerSystem(new SkipSystem(this));
        this.registerSystem(new WeaponSystem(this));
        this.registerSystem(new ProjectileSystem(this));
        this.registerSystem(new UpgradeSystem(this));
        this.registerSystem(new MenuSystem(this));
        this.registerSystem(new UiSystem(this));
    }

    setupEntities() {
        this.gameState = new GameState();
        this.createEntity().addComponent(this.gameState)
            .addComponent(new Upgrade());

        // Ufo
        const ufo = this.addEntity(new UfoEntity());

        // Camera
        const camera = this.addEntity(new CameraEntity(ufo));

        const spaceStation = this.addEntity(new SpaceStationEntity());
        spaceStation.position = {z: this.gameState.goal() + 20};

        // Light
        const ambientLight = this.createEntity().addComponent(new AmbientLight());
        ambientLight.position = {x: 0.5, y: 1, z: 0.25};
        const spawner = this.createEntity()
            .addComponent(new Spawner())
            .addComponent(new Follower(ufo, {z: 100}, {x: 0, y: 0}));
    }
}
