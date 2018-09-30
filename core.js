const fs = require("fs");


module.exports = {
    error(message){
        console.log('\x1b[31m', message);
        process.exit(0)
    },

    info(message){
        console.log('\x1b[33m%s\x1b[0m', message);
        process.exit(0)
    },

    success(message){
        console.log('\x1b[32m', message);
    },

    attrStrToObject(attrString) {
        return attrString.split(/\s/)
            .reduce(function (result, item) {
                if (item.trim()) {
                    const [name, value] = item.split('=');

                    result[name] = value.replace(/['"]/g, "");
                }

                return result;
            }, {});
    },

    easyTemplate(str, options) {
        let re = /<%([^%>]+)?%>/g,
            reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,
            code = 'var r=[];\n',
            cursor = 0, match;

        let add = function (line, js) {
            js ? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n')
                : (code += line != '' ? 'r.push(`' + line.replace(/"/g, '\\"') + '`);\n' : '');

            return add;
        };

        while (match = re.exec(str)) {
            add(str.slice(cursor, match.index))(match[1], true);
            cursor = match.index + match[0].length;
        }

        add(str.substr(cursor, str.length - cursor));

        code += 'return r.join("");';

        return new Function(code).apply(options);
    },

    makeDir(dirName) {
        return new Promise((resolve) => fs.mkdir(dirName, resolve))
    },

    readDir(dirName) {
        return fs.readdirSync(dirName);
    },

    createFile(dirName, content) {
        const file = fs.createWriteStream(dirName);

        file.write(content);
        file.end();

        return file;
    },

    readFile(fileDir) {
        return new Promise((resolve, reject) => {
            fs.readFile(fileDir, 'utf-8', (err, templateStr) => {
                if (err) {
                    reject(err);
                }

                resolve(templateStr);
            });
        })
    },

    parseVars(vars = '') {
        return vars.split(',')
            .reduce((result, item) => {
                const [name, value] = item.split('=');
                result[name] = value;
                return result;
            }, {})
    }
};