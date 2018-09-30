const path = require('path');


const TEMPLATE_REG_EXP = /^<([a-z]+)(\s.+)?>((.+|[\n\s])+?)<\/[a-z]+>$/gm;

const EXT_REG_EXP = /\..+/;

const NAME_TAG_REG_EXP = /%NAME%/g;

const TEMPLATE_DIR = path.resolve(__dirname, 'templates');


module.exports = {
    EXT_REG_EXP,
    TEMPLATE_REG_EXP,
    NAME_TAG_REG_EXP,
    TEMPLATE_DIR
};