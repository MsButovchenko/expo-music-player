import { IPlayerMusic } from '../types/playerMusic.types';

export const musicMock: IPlayerMusic[] = [
  {
    id: '1',
    url: require('./audio/korol-i-shut-prygnu-so-skaly.mp3'),
    img: require('./images/sound1.jpg'),
    author: 'Король и шут',
    nameSong: 'Прыгнуть со скалы',
  },
  {
    id: '2',
    url: require('./audio/Пошлая Молли - Типичная вечеринка с бассейном.mp3'),
    img: require('./images/sound1.jpg'),
    author: 'Пошлая Молли',
    nameSong: 'Типичная вечеринка с бассейном',
  },
];
