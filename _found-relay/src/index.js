import express from 'express'

const app = (module.exports = express())

app.use(require('./apps/artworks/server'))
