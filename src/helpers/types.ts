export enum ABTestingVariation {
  Control,
  Test,
}

export type StorageABTestingObjectType = {
  joinedTime: number;
  numberOfShowedTimes: number;
  lastSeenTime: number;
  isRated: boolean;
};
