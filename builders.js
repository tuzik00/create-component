const {
    easyTemplate,
    makeDir,
    createFile
} = require('./core');


class AbstractBuilder {
    constructor(props, options = {}) {

    }

    build() {
        return Promise.reject()
    }
}


class FileBuilder extends AbstractBuilder {
    constructor(params, options = {}) {
        super(params);

        this.options = {
            vars: {},
            ...options
        };

        this.attrs = {
            name: this.options.componentName,
            ...params.attributes
        };

        this.content = easyTemplate(params.content, this.options.vars);
    }

    build() {
        const { componentName } = this.options;
        const { name, ext } = this.attrs;

        const filePath = `${componentName}/${name}.${ext}`;

        return makeDir(componentName)
            .then(() => createFile(filePath, this.content))
            .then(() => filePath)
    }
}


module.exports.FileBuilder = FileBuilder;