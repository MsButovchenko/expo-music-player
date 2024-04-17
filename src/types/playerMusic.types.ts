import { ImageSourcePropType } from 'react-native';

export interface IPlayerMusic {
  id: string;
  url: unknown;
  img: ImageSourcePropType;
  author?: string;
  nameSong: string;
  favorites?: boolean;
}

export interface IPlayerMusicParams {
  id: string;
  isMyMusic: boolean;
}
