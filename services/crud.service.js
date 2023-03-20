const fileManager = require('../helpers/fileManager');

class CrudService {

    async readAll() {
        return await fileManager.read();
    }

    async create(data) {
        let phoneList = await this.readAll();
        if (phoneList.find(s => s.SurName === data.SurName || s.PhoneNumber === data.PhoneNumber))
            return Promise.reject(`Object with  name=${data.Surname} or phone=${data.PhoneNumber} already exist`);
        data.Id = Math.max(...phoneList.map(o => o.Id)) + 1;
        phoneList.push(data);
        return await fileManager.write(phoneList);
    }

    async update(data) {
        let phoneList = await this.readAll();
        if (!phoneList.find(s => s.Id === data.Id))
            return Promise.reject(`Object with  id=${data.Id} not exist`);

        const index = phoneList.findIndex(s => s.Id === data.Id);
        phoneList[index] = data;
        return await fileManager.write(phoneList);

    }

    async delete(id) {
        let phoneList = await this.readAll();
        const phoneId = parseInt(id);
        if (!phoneList.find(s => s.Id === phoneId))
            return Promise.reject(`Object with  id=${id} not exist`);
        const index = phoneList.findIndex(s => s.Id === phoneId);
        phoneList.splice(index, 1);
        return await fileManager.write(phoneList);
    }
}

module.exports = CrudService;