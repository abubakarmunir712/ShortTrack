const mongoose = require('mongoose');
const clicks = require('../models/click');
const links = require('../models/shortLink')
const axios = require('axios')

module.exports.clicks = async (req, res) => {
    try {
        const url = await links.findOne({ urlOwner: req.user.id, shortenedUrl: req.params.link })
        if (!url)
            return res.status(404).send({ message: "Link does not exist" })
        const Clicks = await clicks.find({ link: req.params.link })

        if (Clicks.length != 0)
            return res.send(Clicks)
        else
            return res.status(200).send({ message: 'No clicks made yet' });
    }
    catch (err) {
        return res.send('Internal Server error')
    }
}