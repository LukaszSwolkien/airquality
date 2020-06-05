"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var qualityStandards = {
    // https://sojp.wios.warszawa.pl/skala-jakosci-powietrza
    // https://en.wikipedia.org/wiki/Air_Quality_Health_Index_(Canada)
    // µg/m3: airQualityIndex
    'SO2': {
        standards: {
            50: 1,
            100: 2,
            200: 5,
            250: 6,
            500: 10,
            501: 11
        },
        name: 'SO2',
        unit: '&mu;g/m<sup>3</sup>'
    },
    'NO2': {
        standards: {
            40: 1,
            100: 2,
            150: 5,
            200: 6,
            400: 10,
            401: 11
        },
        name: 'NO2',
        unit: '&mu;g/m<sup>3</sup>'
    },
    'CO': {
        standards: {
            2499: 1,
            6499: 2,
            10499: 5,
            14499: 6,
            20499: 10,
            20500: 11
        },
        name: 'CO',
        unit: '&mu;g/m<sup>3</sup>'
    },
    'PM10': {
        standards: {
            20: 1,
            60: 2,
            100: 5,
            140: 6,
            200: 10,
            201: 11
        },
        name: 'PM10',
        unit: '&mu;g/m<sup>3</sup>'
    },
    'PM25': {
        standards: {
            12: 1,
            36: 2,
            60: 5,
            84: 6,
            120: 10,
            121: 11
        },
        name: 'PM2.5',
        unit: '&mu;g/m<sup>3</sup>'
    },
    'O3': {
        standards: {
            30: 1,
            70: 2,
            120: 5,
            160: 6,
            240: 10,
            241: 11
        },
        name: 'O3',
        unit: '&mu;g/m<sup>3</sup>'
    },
    'C6H6': {
        standards: {
            5: 1,
            10: 2,
            15: 5,
            20: 6,
            50: 10,
            51: 11
        },
        name: 'C6H6',
        unit: '&mu;g/m<sup>3</sup>'
    }
};
function getParameters() {
    return Object.keys(qualityStandards);
}
exports.getParameters = getParameters;
function getStandards(parameter) {
    return qualityStandards[parameter].standards;
}
exports.getStandards = getStandards;
function getName(parameter) {
    return qualityStandards[parameter].name;
}
exports.getName = getName;
function getUnit(parameter) {
    return qualityStandards[parameter].unit;
}
exports.getUnit = getUnit;
function getHealthRisk(AQHI) {
    // https://en.wikipedia.org/wiki/Air_Quality_Health_Index_(Canada)
    var healthRisk = {
        3: 'Low',
        6: 'Moderate',
        10: 'High',
        11: 'Very high'
    };
    var res = Object.keys(healthRisk)
        .map(function (x) { return parseInt(x); })
        .filter(function (x) { return x >= AQHI; })
        .reduce(function (min, curr) { return Math.min(min, curr); }, 11);
    return healthRisk[res];
}
exports.getHealthRisk = getHealthRisk;
function getAQHI(pollution, qualityStandard) {
    var hr = Object.keys(qualityStandard)
        .map(function (x) { return parseInt(x); })
        .filter(function (x) { return x >= pollution; });
    if (hr.length > 0) {
        var minV = Math.min.apply(null, hr);
        var idx = qualityStandard[minV];
        return Math.min(idx, 11);
    }
    return 11;
}
exports.getAQHI = getAQHI;
