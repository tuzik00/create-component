const { FileBuilder } = require('./builders');


class TagFactory {
    constructor(options = {}) {
        this.options = {
            vars: {},
            componentName: null,
            ...options
        };
    }

    create({tag, attributes, content}) {
        switch (tag) {
            case 'template':
                return new FileBuilder({
                    content,
                    attributes
                }, this.options)
        }
    };

}


module.exports = TagFactory;