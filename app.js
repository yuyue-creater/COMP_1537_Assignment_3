const express = require('express')
const cors = require('cors');
const app = express();
// const mongoose = require('mongoose');

app.use(cors());
app.use(express.json())

// const unicornSchema = new mongoose.Schema({});
// const unicornModel = mongoose.model('unicorns', unicornSchema)

const unicornModel = require('./models/unicorns')

app.post('/search', async (req, res) => {
    console.log(req.body)

    var projectionArgument = {}
    if (req.body.projectionFilters.name == true && req.body.projectionFilters.weight == true) {
        projectionArgument = { "name": 1, "weight": 2, "_id": 0 }
    } else if (req.body.projectionFilters.name == true && req.body.projectionFilters.weight == false) {
        projectionArgument = { "name": 1, "_id": 0 }
    } else if (req.body.projectionFilters.name == false && req.body.projectionFilters.weight == true) {
        projectionArgument = { "weight": 1, "_id": 0 }
    }

    if (req.body.type === 'nameSearch') {
        var selectionArgument = {}
        if (req.body.name) {
            selectionArgument = {
                name: req.body.name
            }
        }
        const result = await unicornModel.find(selectionArgument, projectionArgument);
        res.json(result);

    } else if (req.body.type === 'weightSearch') {
        var selectionArgument = {}
        selectionArgument = {
            $and: [{ weight: { $lte: req.body.maxWeight } },
            { weight: { $gte: req.body.minWeight } }]
        }
        const result = await unicornModel.find(selectionArgument, projectionArgument);
        console.log(result)
        res.json(result);

    } else if (req.body.type === 'fruitSearch') {
        console.log(req.body)
        var selectionArgument = {}
        if (req.body.likesApples && req.body.likesCarrots) {
            selectionArgument = {
                $and: [{ loves: { $in: ["apple"] } },
                { loves: { $in: ["carrot"] } }]
            }
        } else if (req.body.likesApples) {
            selectionArgument = {
                loves: { $in: ["apple"] },
            }
        } else if (req.body.likesCarrots) {
            selectionArgument = {
                loves: { $in: ["carrot"] },
            }
        }
        
        const result = await unicornModel.find(selectionArgument, projectionArgument);
        res.json(result);
    }
});

module.exports = app;