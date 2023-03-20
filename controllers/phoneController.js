const {disabled} = require("express/lib/application");

class PhoneController {
    constructor(phoneService) {
        this.phoneService = phoneService;
        this.router = require('express').Router({mergeParams: true});
        this.router.route('/')
            .get(async (req, res) => {
                await this.getAll(req, res);
            })
            .post(async (req, res) => {
                await this.createPhone(req, res);
            })
            .put(async (req, res) => {
                await this.updatePhone(req, res);
            });
        this.router.route('/:id')
            .delete(async (req, res) => {
                await this.deletePhone(req, res);
            });
        this.router.route('/addPhone')
            .get(async (req, res) => {
                await this.addView(req, res);
            });
        this.router.route('/updatePhone')
            .get(async (req, res) => {
                await this.updateView(req, res);
            });
    }

    async getAll(req, res) {
        res.render("phones", {
            disabled: false,
            buttonLabel: 'Добавить',
            phones: await this.phoneService.readAll()
        });
    }

    async addView(req, res) {
        res.render(
            "addPhone", {
                href: '/api/phones',
                label: 'Отказаться',
                disabled: true,
                values: {},
                phones: await this.phoneService.readAll()
            }
        );
    }

    async updateView(req, res) {
        res.render(
            "updatePhone", {
                disabled: true,
                values: req.query,
                phones: await this.phoneService.readAll()
            }
        );
    }


    createPhone(req, res) {
        this.phoneService.create(req.body).then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(400).send(error);
        });
    }

    async updatePhone(req, res) {
        this.phoneService.update(req.body).then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(400).send(error);
        });
    }

    async deletePhone(req, res) {
        this.phoneService.delete(req.params.id).then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(400).send(error);
        });
    }

}

module.exports = (customerService) => {
    const controller = new PhoneController(customerService);
    return controller.router;
}
