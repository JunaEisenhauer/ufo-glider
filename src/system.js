import Tag from "./components/tag";

export default class System {

    static findComponent(entities, type) {
        for (const entity of entities) {
            const component = entity.components.find(component => component instanceof type);
            if (component) {
                return component;
            }

            const componentInChild = this.findComponent(entity.children, type);
            if (componentInChild) {
                return componentInChild;
            }
        }

        return null;
    }

    static findComponents(entities, type) {
        const components = [];
        for (const entity of entities) {
            components.push(...entity.components.filter(component => component instanceof type));
            components.push(...this.findComponents(entity.children, type));
        }

        return components;
    }

    static findTag(entities, tag) {
        for (const entity of entities) {
            const component = entity.components.find(component => component instanceof Tag);
            if (component && component.hasTag(tag)) {
                return component.entity;
            }

            const componentInChild = this.findTag(entity.children, tag);
            if (componentInChild) {
                return componentInChild.entity;
            }
        }

        return null;
    }

    static findTags(entities, tag) {
        const tags = [];
        for (const entity of entities) {
            const component = entity.components.find(component => component instanceof Tag);
            if (component && component.hasTag(tag)) {
                tags.push(entity);
            }

            const componentInChild = this.findTags(entity.children, tag);
            for (const child of componentInChild) {
                tags.push(child);
            }
        }

        return tags;
    }

    static forEachEntity(entities, action) {
        entities.forEach(entity => {
            action(entity);
            this.forEachEntity(entity.children, action);
        });
    }

    update() {
    }
}
