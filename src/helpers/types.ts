export enum RateTestingVariations {
  Control,
  Test,
}

export type RateData = {
  joinedTime: number;
  numberOfShowedTimes: number;
  lastSeenTime: number;
  isRated: boolean;
};
