import AsyncStorage from '@react-native-async-storage/async-storage';
import { MY_MUSIC_KEY } from '../constants/myMusic.contants';
import { useContext, useEffect } from 'react';
import { IPlayerMusic } from '../types/playerMusic.types';
import { MyMusicContext } from '../context/myMusic.context';

export const useMyMusics = () => {
  const { myMusic, myMusicIds, setMyMusicIds, setMyMusic } =
    useContext(MyMusicContext);

  const getMyMusic = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(MY_MUSIC_KEY);
      const musics = jsonValue !== null ? JSON.parse(jsonValue) : jsonValue;
      setMusics(musics);
      return musics;
    } catch (e) {
      console.error(e);
    }
  };

  const setMusics = (musics: IPlayerMusic[] | null) => {
    setMyMusic(musics);
    setMyMusicIds(musics?.map((music) => music?.id) ?? null);
  };

  const addMusic = async (music: IPlayerMusic) => {
    try {
      if (!myMusicIds?.includes(music.id)) {
        const newPlayList = [...(myMusic ?? []), music];
        await AsyncStorage.setItem(MY_MUSIC_KEY, JSON.stringify(newPlayList));
        setMusics(newPlayList);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteMusic = async (music: IPlayerMusic) => {
    try {
      if (myMusicIds?.includes(music.id)) {
        const newPlayList = myMusic?.filter(
          (myMusic) => myMusic.id !== music.id
        );
        await AsyncStorage.setItem(MY_MUSIC_KEY, JSON.stringify(newPlayList));
        setMusics(newPlayList ?? null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    (async () => {
      await getMyMusic();
    })();
  }, []);

  return {
    myMusic,
    addMusic,
    deleteMusic,
    getMyMusic,
    myMusicIds,
  };
};
