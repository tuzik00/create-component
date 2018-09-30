const { FileBuilder } = require('./builders');


class TagFactory {
    constructor(params = {}) {
        this.options = {
            context: {},
            dirName: null,
            ...params
        };
    }

    create({tag, attributes, content}) {
        switch (tag) {
            case 'template':
                return new FileBuilder({
                    attributes,
                    content
                }, this.options)
        }
    };

}


module.exports = TagFactory;