import type { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';
import { IPlayerMusic } from '../types/playerMusic.types';

export interface IMusicArgs {
  myMusic: IPlayerMusic[] | null;
  myMusicIds: string[] | null;
  setMyMusic: Dispatch<SetStateAction<IPlayerMusic[] | null>>;
  setMyMusicIds: Dispatch<SetStateAction<string[] | null>>;
}

export const MyMusicContext = createContext<IMusicArgs>({
  myMusic: null,
  myMusicIds: null,
  setMyMusic: () => {},
  setMyMusicIds: () => {},
});
