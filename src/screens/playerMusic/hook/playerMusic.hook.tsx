import { useEffect, useMemo, useRef, useState } from 'react';
import { Audio, AVPlaybackStatusError, AVPlaybackStatusSuccess } from 'expo-av';
import { IPlayerMusic } from '../../../types/playerMusic.types';

interface IPlayerMusicHookProps {
  currentAudioId: string;
  audioList: IPlayerMusic[];
  changeAudio: (id: string) => void;
}

export const usePlayerMusicHook = ({
  changeAudio,
  currentAudioId,
  audioList,
}: IPlayerMusicHookProps) => {
  const sound = useRef(new Audio.Sound());
  const [isPlaying, setIsPlaying] = useState(false);

  const currentSongSettings = useMemo(
    () => audioList?.find((audio) => audio.id === currentAudioId),
    [currentAudioId, audioList]
  );

  const [status, setStatus] = useState<
    AVPlaybackStatusSuccess | AVPlaybackStatusError
  >();
  console.log(status);
  sound.current.setOnPlaybackStatusUpdate((status) => {
    status.isLoaded && status.didJustFinish && switchNextSong();
    setStatus(status);
  });

  const playAudio = async () => {
    try {
      if (status?.isLoaded && !status.isPlaying) {
        await sound.current.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const playFromTime = async (time: number) => {
    try {
      if (status?.isLoaded) {
        await sound.current.setPositionAsync(time);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const pauseAudio = async (withoutPlayingModeChange?: boolean) => {
    try {
      if (status?.isLoaded && status.isPlaying) {
        await sound.current.pauseAsync();
        !withoutPlayingModeChange && setIsPlaying(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadAudio = async () => {
    if (currentSongSettings?.url) {
      try {
        // @ts-ignore
        await sound.current.loadAsync(currentSongSettings?.url, {}, true);
        await sound.current.setStatusAsync({
          progressUpdateIntervalMillis: 1000,
        });
        await sound.current.playAsync();
        setIsPlaying(true);
      } catch (error) {
        // console.error(error);
      }
    }
  };

  const switchNextSong = () => {
    const songsLength = audioList.length;
    const currentSongIndex = audioList?.findIndex(
      (audio) => audio.id === currentAudioId
    );

    currentSongIndex !== -1 &&
      songsLength &&
      changeAudio(
        currentSongIndex === songsLength - 1
          ? audioList[0].id
          : audioList[currentSongIndex + 1].id
      );
  };

  const switchPrevSong = () => {
    const songsLength = audioList.length;
    const currentSongIndex = audioList?.findIndex(
      (audio) => audio.id === currentAudioId
    );

    currentSongIndex !== -1 &&
      songsLength &&
      changeAudio(
        currentSongIndex === 0
          ? audioList[songsLength - 1].id
          : audioList[currentSongIndex - 1].id
      );
  };

  useEffect(() => {
    (async () => {
      await sound?.current?.unloadAsync();
      await loadAudio();
    })();
  }, [currentAudioId, audioList]);

  return {
    playAudio,
    pauseAudio,
    loadAudio,
    playFromTime,
    switchNextSong,
    switchPrevSong,
    isPlaying: !!status?.isLoaded && isPlaying,
    durationMillis: status?.isLoaded ? status.durationMillis ?? 0 : 0,
    positionMillis: status?.isLoaded ? status.positionMillis ?? 0 : 0,
    status,
    sound,
    author: currentSongSettings?.author,
    title: currentSongSettings?.nameSong,
    img: currentSongSettings?.img,
  };
};
