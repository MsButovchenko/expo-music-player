import { IPlayerMusic } from '../../types/playerMusic.types';

export interface IMusicItemProps {
  music: IPlayerMusic;
  isAllMusic?: boolean;
  addMusic?: (music: IPlayerMusic) => Promise<void>;
  deleteMusic?: (music: IPlayerMusic) => Promise<void>;
  isMyMusic?: boolean;
  onFavorite?: (id: string) => void;
}
