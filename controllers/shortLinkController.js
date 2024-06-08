const shortLink = require('../models/shortLink');
const mongoose = require('mongoose');

module.exports.addLink = async(req, res) => {
    try{
        const link = await shortLink.create(req.body)
        console.log(link)
        res.status(200).send({ message: 'Link Created successfully' });
    }
    catch(err){
        console.log(err)
        res.status(500).send({ error: 'Internal server error' });
    }
};

module.exports.deleteLink = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).send({ message: 'Please provide a valid id' });
        }

        const link = await shortLink.deleteOne({ urlOwner: req.user.id, _id: req.params.id });

        if (link.deletedCount === 0) {
            return res.status(404).send({ message: 'Link not found' });
        }

        res.status(200).send({ message: 'Link deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal server error' });
    }
};

module.exports.updateLink = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).send({ message: 'Please provide a valid id' });
        }

        const link = await shortLink.findOne({ urlOwner: req.user.id, _id: req.params.id });

        if (!link) {
            return res.status(404).send({ message: 'Link not found' });
        }

        // Manually update fields
        Object.keys(req.body).forEach(key => {
            link[key] = req.body[key];
        });

        // Save the document to trigger pre-save hooks
        await link.save();

        res.status(200).send(link);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal server error' });
    }
};

module.exports.getSingleLink = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).send({ message: 'Please provide a valid id' });
        }

        const link = await shortLink.findOne({ urlOwner: req.user.id, _id: req.params.id });

        if (!link) {
            return res.status(404).send({ message: 'Link not found' });
        }

        res.status(200).send(link);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal server error' });
    }
};

module.exports.getAllLinks = async (req, res) => {
    try {
        const links = await shortLink.find({ urlOwner: req.user.id });
        res.status(200).send(links);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal server error' });
    }
};
