#!/usr/bin/env node

const path = require('path');
const argv = require('minimist')(process.argv.slice(2));
const TagFactory = require('./tagFactory');

const {
    info,
    error,
    success,
    attrStrToObject,
    readFile,
    readDir,
    parseVars
} = require('./core');

const {
    TEMPLATE_REG_EXP,
    EXT_REG_EXP,
    NAME_TAG_REG_EXP,
    TEMPLATE_DIR,
} = require('./constants');

const example = () => info('Example: create-component -c componentname -t templatename -v test=True,test2=test');


init({
    componentName: argv.componentname || argv.c || example(),
    templateName: argv.templatename || argv.t || example(),
    vars: parseVars(argv.vars || argv.v)
});


function init({componentName, templateName, vars}) {
    const tagFactory = new TagFactory({ componentName, vars });

    readTemplate(TEMPLATE_DIR, templateName)
        .then((template) => parseTags(template, componentName))
        .then((tags) => buildTags(tags, tagFactory))
        .then(buildSuccess)
        .catch(error)
}


function readTemplate(templateDir, templateName) {
    return new Promise((resolve, reject) => {
        const [ file ] = readDir(templateDir)
            .filter((file) => file.toLowerCase().replace(EXT_REG_EXP, '') === templateName.toLowerCase());

        if (!file) {
            reject(`Template "${templateName}" douse not exists.`);
        }

        resolve(readFile(path.join(templateDir, file)), templateDir)
    });
}


function parseTags(templateStr, componentName) {
    const tags = [];

    templateStr.replace(NAME_TAG_REG_EXP, componentName)
        .match(TEMPLATE_REG_EXP)
        .forEach((template) => {
            template
                .replace(TEMPLATE_REG_EXP, (item, tag, attributes, content) => {
                    tags.push({
                        tag,
                        attributes: attrStrToObject(attributes),
                        content: content.trim()
                    });
                })
        });

    return tags;
}


function buildTags(tags, factory) {
    return Promise.all(
        tags.reduce((promises, tag) => [
            factory
                .create(tag)
                .build(),
            ...promises
        ], [])
    );
}


function buildSuccess(filesName) {
    success('====================================');
    filesName.forEach(fileName => success(`File ${fileName} is create.`));
    success('====================================');
}