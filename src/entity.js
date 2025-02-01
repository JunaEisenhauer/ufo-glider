import {Group} from "three";
import ThreeObject from "./components/three/threeObject";

export default class Entity {

    children = [];
    components = [];

    constructor() {
        this.threeGroup = new Group();
    }

    get position() {
        return {x: this.threeGroup.position.x, y: this.threeGroup.position.y, z: this.threeGroup.position.z};
    }

    set position(position) {
        if (position.x !== undefined) {
            this.threeGroup.position.x = position.x;
        }

        if (position.y !== undefined) {
            this.threeGroup.position.y = position.y;
        }

        if (position.z !== undefined) {
            this.threeGroup.position.z = position.z;
        }
    }

    get rotation() {
        return {x: this.threeGroup.rotation.x, y: this.threeGroup.rotation.y, z: this.threeGroup.rotation.z};
    }

    set rotation(rotation) {
        if (rotation.x !== undefined) {
            this.threeGroup.rotation.x = rotation.x;
        }

        if (rotation.y !== undefined) {
            this.threeGroup.rotation.y = rotation.y;
        }

        if (rotation.z !== undefined) {
            this.threeGroup.rotation.z = rotation.z;
        }
    }

    get scale() {
        return {x: this.threeGroup.scale.x, y: this.threeGroup.scale.y, z: this.threeGroup.scale.z};
    }

    set scale(scale) {
        if (scale.x !== undefined) {
            this.threeGroup.scale.x = scale.x;
        }

        if (scale.y !== undefined) {
            this.threeGroup.scale.y = scale.y;
        }

        if (scale.z !== undefined) {
            this.threeGroup.scale.z = scale.z;
        }
    }

    createChildEntity() {
        const entity = new Entity();
        return this.addChildEntity(entity);
    }

    addChildEntity(entity) {
        this.children.push(entity);
        this.threeGroup.add(entity.threeGroup);
        return entity;
    }

    removeChildEntity(entity) {
        const index = this.children.indexOf(entity);
        if (index !== -1) {
            this.children.splice(index, 1);
        }

        this.threeGroup.remove(entity.threeGroup);
        return entity;
    }

    addComponent(component) {
        this.components.push(component);
        component.attachEntity(this);
        if (component instanceof ThreeObject) {
            this.threeGroup.add(component.threeObject);
        }

        return this;
    }

    removeComponent(component) {
        let index = this.components.indexOf(component);
        if (index !== -1) {
            this.components.splice(index, 1);
        }

        component.detachEntity();
        if (component instanceof ThreeObject) {
            this.threeGroup.remove(component.threeObject);
        }

        return this;
    }

    getComponent(type) {
        return this.components.find(component => component instanceof type);
    }

    getComponentInChildren(type) {
        for (const child of this.children) {
            const component = child.components.find(component => component instanceof type);
            if (component) {
                return component;
            }

            const componentInChild = child.getComponentInChildren(type);
            if (componentInChild) {
                return componentInChild;
            }
        }

        return undefined;
    }

    getComponentsInChildren() {
        const components = [];
        for (const child of this.children) {
            components.push(...child.components.filter(component => component instanceof type));
            components.push(...child.getComponentsInChildren(type));
        }

        return components;
    }
}
