import express from 'express'

export default abstract class BaseRoute {
    protected path: string

    protected constructor(path: string) {
        this.path = path
    }

    abstract configure(app: express.Application): void
}
