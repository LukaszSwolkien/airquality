
export interface AirQualityLevels {
    [level: number] : number;
}

export interface AirQualityStandard {
    standards: AirQualityLevels;
    name: string;
    unit: string;
}

const qualityStandards: { [name: string]: AirQualityStandard } = {
    // https://sojp.wios.warszawa.pl/skala-jakosci-powietrza
    // https://en.wikipedia.org/wiki/Air_Quality_Health_Index_(Canada)
    // µg/m3: airQualityIndex
    'SO2': { 
        standards: {
            50: 1,
            100: 2,
            200: 5,  // umiarkowany
            250: 6,  // dostateczny
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
            150: 5,  // umiarkowany
            200: 6,  // dostateczny
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
            10499: 5,  // umiarkowany
            14499: 6,  // dostateczny
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
            100: 5,  // umiarkowany
            140: 6,  // dostateczny
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
            60: 5,  // umiarkowany
            84: 6,  // dostateczny
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
            120: 5,  // umiarkowany
            160: 6,  // dostateczny
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
            15: 5,  // umiarkowany
            20: 6,  // dostateczny
            50: 10,
            51: 11
        },
        name: 'C6H6',
        unit: '&mu;g/m<sup>3</sup>'
    }
}

export function getParameters(): string[] {
    return Object.keys(qualityStandards);
}

export function getStandards(parameter: string) {
    return qualityStandards[parameter].standards;
}

export function getName(parameter: string) {
    return qualityStandards[parameter].name;
}

export function getUnit(parameter: string) {
    return qualityStandards[parameter].unit;
}


export function getHealthRisk(AQHI: number): string {
    // https://en.wikipedia.org/wiki/Air_Quality_Health_Index_(Canada)
    let healthRisk: { [level: number] : string } = {
        3: 'Low',
        6: 'Moderate',
        10: 'High',
        11: 'Very high'
    };
    let res = Object.keys(healthRisk)
        .map(x => parseInt(x))
        .filter(x => x >= AQHI)
        .reduce((min, curr) => Math.min(min, curr), 11);
    return healthRisk[res];
}

export function getAQHI(pollution: number, qualityStandard: any) {
    let hr = Object.keys(qualityStandard)
        .map(x => parseInt(x))
        .filter(x => x >= pollution);
    if (hr.length > 0){
        let minV = Math.min.apply(null, hr);
        let idx = qualityStandard[minV];
        return Math.min(idx, 11);
    }
    return 11;
}
