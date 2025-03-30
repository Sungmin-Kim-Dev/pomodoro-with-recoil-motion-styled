import {atom} from "recoil";

export const minutesState = atom<number>({
  key: "minutesState",
  default: 25, // Initial value: 25 minutes
});

export const secondsState = atom<number>({
  key: "secondsState",
  default: 0, // Initial value: 0 seconds
});

export const isRunningState = atom<boolean>({
  key: "isRunningState",
  default: false, // Initially not running
});

export const roundNumber = atom<number>({
  key: "roundNumber",
  default: 0,
});

export const goalNumber = atom<number>({
  key: "goalNumber",
  default: 0,
});
