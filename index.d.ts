export interface AirQualityLevels {
    [level: number]: number;
}
export interface AirQualityStandard {
    standards: AirQualityLevels;
    name: string;
    unit: string;
}
export declare function getParameters(): string[];
export declare function getStandards(parameter: string): AirQualityLevels;
export declare function getName(parameter: string): string;
export declare function getUnit(parameter: string): string;
export declare function getHealthRisk(AQHI: number): string;
export declare function getAQHI(pollution: number, qualityStandard: any): number;
