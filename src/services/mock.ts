import {ABTestingVariation} from '../helpers/types';

const MOCK_CONFIG: {experiment: ABTestingVariation} = {
  experiment: ABTestingVariation.Test,
};
export const USER_JOINED = new Date(2022, 0).getTime();

export const getConfig = async (): Promise<typeof MOCK_CONFIG> =>
  new Promise((res, _) => {
    setTimeout(() => {
      res(MOCK_CONFIG);
    }, 500);
  });
