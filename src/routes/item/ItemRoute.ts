import BaseRoute from "../BaseRoute";
import express from 'express'

export default class ItemRoute extends BaseRoute {

    constructor(path: string) {
        super(path)
    }

    configure(app: express.Application): void {

    }

    addItem(res: any, req: any) {
        const { body, user } = req;
    }
}