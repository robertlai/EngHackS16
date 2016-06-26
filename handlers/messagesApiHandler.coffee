mongoose = require ('mongoose')

MessageRepo = require('../data/MessageRepo')


module.exports = (io) ->

    getChildren = (req, res, next) ->

        _parent = mongoose.Types.ObjectId(req.body._parent)

        MessageRepo.getChildrenOfNode _parent, (err, allNodes) ->
            return next(err) if err
            res.json(allNodes)

    {
        getChildren: getChildren
    }
