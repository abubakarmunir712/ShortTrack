const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isURL } = require('validator')

const LinkSchema = new Schema({
    urlOwner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    shortenedUrl: {
        type: String,
        required: [true,'Link is required'],
        unique: true,
        minlength: [6,'The link must be at least six characters long!']
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
            redirectUrl:
            {
                type: String,
                validate: [isURL, 'Please enter valid Url']
            },
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

LinkSchema.pre('save', function(next) {
    // BrowserFilter logic
    if (this.BrowserFilter === "Allow" || this.BrowserFilter === "None") {
        this.set('blockedBrowsers', []);
    }

    if (this.BrowserFilter === "Block" || this.BrowserFilter === "None") {
        this.set('allowedBrowsers', []);
    }

    // DeviceFilter logic
    if (this.DeviceFilter === "Allow" || this.DeviceFilter === "None") {
        this.set('blockedDevices', []);
    }

    if (this.DeviceFilter === "Block" || this.DeviceFilter === "None") {
        this.set('allowedDevices', []);
    }

    // GeoLocationFilter logic
    if (this.GeoLocationFilter === "Allow" || this.GeoLocationFilter === "None") {
        this.set('blockedGeoLocations', []);
    }

    if (this.GeoLocationFilter === "Block" || this.GeoLocationFilter === "None") {
        this.set('allowedGeoLocations', []);
    }

    // OSFilter logic
    if (this.OSFilter === "Allow" || this.OSFilter === "None") {
        this.set('blockedOS', []);
    }

    if (this.OSFilter === "Block" || this.OSFilter === "None") {
        this.set('allowedOS', []);
    }

    // ReferrerFilter logic
    if (this.ReferrerFilter === "Allow" || this.ReferrerFilter === "None") {
        this.set('blockedReferrer', []);
    }

    if (this.ReferrerFilter === "Block" || this.ReferrerFilter === "None") {
        this.set('allowedReferrer', []);
    }

    next();
});


const Link = mongoose.model('Link', LinkSchema);
module.exports = Link;
