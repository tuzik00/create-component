const {
    easyTemplate,
    makeDir,
    createFile
} = require('./core');


class AbstractBuilder {
    constructor(props) {

    }

    build() {
        return Promise.reject()
    }
}


class FileBuilder extends AbstractBuilder {
    constructor(props, options = {}) {
        super(props);

        this.options = {
            context: {},
            ...options
        };

        this.attrs = {
            name: this.options.dirName,
            ...props.attributes
        };

        this.content = easyTemplate(props.content, this.options.context);
    }

    build() {
        const { dirName } = this.options;
        const { name, ext } = this.attrs;

        const path = `${dirName}/${name}.${ext}`;

        return makeDir(dirName)
            .then(() => createFile(path, this.content))
            .then(() => path)
    }
}


module.exports.FileBuilder = FileBuilder;