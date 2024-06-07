const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LinkSchema = new Schema({
    urlOwner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User' 
    },
    shortenedUrl: {
        type: String, 
        required: true,
        unique:true
    },
    maxClicks: {
        type: Number
    },
    expirationDate: {
        type: Date
    },
    GeoLocationFilter: {
        type: String,
        enum: ["Block", "Allow", "None"],
        default: "None"
    },
    OSFilter: {
        type: String,
        enum: ["Block", "Allow", "None"],
        default: "None"
    },
    BrowserFilter: {
        type: String,
        enum: ["Block", "Allow", "None"],
        default: "None"
    },
    DeviceFilter: {
        type: String,
        enum: ["Block", "Allow", "None"],
        default: "None"
    },
    ReferrerFilter: {
        type: String,
        enum: ["Block", "Allow", "None"],
        default: "None"
    },
    blockedGeoLocations: {
        type: [String],
        default: []
    },
    blockedDevices: {
        type: [String],
        default: []
    },
    blockedOS: {
        type: [String],
        default: []
    },
    blockedBrowsers: {
        type: [String],
        default: []
    },
    allowedGeoLocations: {
        type: [String],
        default: []
    },
    blockedReferrer: {
        type: [String],
        default: []
    },
    allowedReferrer: {
        type: [String],
        default: []
    },
    allowedDevices: {
        type: [String],
        default: []
    },
    allowedOS: {
        type: [String],
        default: []
    },
    allowedBrowsers: {
        type: [String],
        default: []
    },
    conditions: {
        type: [{
            country: String,
            browser: String,
            device: String,
            OS: String,
            redirectUrl: String,
            landingPage: String,
            collectEmail: {
                type: Boolean,
                default: false
            },
            emailVerification: {
                type: Boolean,
                default: false
            },
            proxyCheck: {
                type: Boolean,
                default: false
            },
            checkType: {
                type: String,
                enum: ["None", "Strict", "Easy"],
                default: "None"
            }
        }],
    }
});

const Link = mongoose.model('Link', LinkSchema);
module.exports = Link;
