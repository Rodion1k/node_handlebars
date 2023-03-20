const fs = require('fs');
const filePath = './phones.json';
module.exports = fileManager = {
    read: async () => {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(data.toString()));
                }
            });
        });
    },
    write: async (data) => {
        return new Promise((resolve, reject) => {
            const dataString = JSON.stringify(data);
            fs.writeFile(filePath, dataString, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    },
    append: async (data) => {
        return new Promise((resolve, reject) => {
            const dataString = JSON.stringify(data);
            fs.appendFile(filePath, dataString, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    },
    watchDir: (serverRPC, path) => {
        let events = [];
        //watch all files events in directory by path
        fs.watch(path, (eventType, filename) => {
            if (filename) {
                serverRPC.emit('change');
                events.push({eventType, filename});
                console.log(`Dir event!!!!!\n filename= ${filename}, eventType= ${eventType}\n -----------------`);
            }
        });
        return events;
    },
    copyFile: async (source, target) => {
        return new Promise((resolve, reject) => {
            fs.copyFile(source, target, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    },
    deleteFile: async (path) => {
        return new Promise((resolve, reject) => {
            fs.unlink(path, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    },
    readDir: async (path) => {
        return new Promise((resolve, reject) => {
            fs.readdir(path, (err, files) => {
                if (err)
                    reject(err);
                else
                    resolve(files);
            });
        });
    }
}
