import { Image, SafeAreaView, Text, View } from 'react-native';
import { usePlayerMusicHook } from './hook/playerMusic.hook';
import { PlayButton } from '../../components/playButton';
import Slider from '@react-native-community/slider';
import { EPlayButtonTypes } from '../../components/playButton/playButton.contant';
import { useEffect, useState } from 'react';
import { musicMock } from '../../mock/mock';
import { styles } from './playerMusic.styles';
import { Loader } from '../../components/loader';
import { useRoute } from '@react-navigation/native';
import { IPlayerMusicParams } from '../../types/playerMusic.types';
import { useMyMusics } from '../../hooks/myMusics.hook';

export const PlayerMusic = () => {
  const route = useRoute();
  const { id, isMyMusic } = (route.params ?? {}) as IPlayerMusicParams;

  const { myMusic } = useMyMusics();
  const [currentAudioId, setCurrentAudioId] = useState(id);

  const audioList = isMyMusic ? myMusic ?? [] : musicMock;

  useEffect(() => {
    if (id !== currentAudioId && id) {
      setCurrentAudioId(id);
    } else if (!id && audioList?.length) {
      setCurrentAudioId(audioList[0]?.id);
    }
  }, [id]);

  const {
    status,
    isPlaying,
    durationMillis,
    positionMillis,
    playAudio,
    pauseAudio,
    playFromTime,
    switchNextSong,
    switchPrevSong,
    author,
    title,
    img,
  } = usePlayerMusicHook({
    currentAudioId,
    changeAudio: setCurrentAudioId,
    audioList,
  });

  return (
    <View style={styles.container}>
      {!!audioList?.length && (
        <SafeAreaView style={styles.player}>
          <View style={styles.description}>
            {!status?.isLoaded && <Loader />}
            {status?.isLoaded && (
              <>
                <View style={styles.imgContainer}>
                  <Image source={img} style={styles.img} />
                </View>

                <View>
                  <Text style={[styles.songContent, styles.songTitle]}>
                    {title}
                  </Text>
                  <Text style={[styles.songContent, styles.songArtist]}>
                    {author}
                  </Text>
                </View>
              </>
            )}
          </View>

          <View style={styles.bottom}>
            <View style={styles.progressLevelDuraiton}>
              <Text style={styles.progressLabelText}>
                {new Date(positionMillis).toLocaleTimeString().substring(3)}
              </Text>
              <Text style={styles.progressLabelText}>
                {new Date(durationMillis).toLocaleTimeString().substring(3)}
              </Text>
            </View>

            <Slider
              style={styles.progressBar}
              value={positionMillis}
              minimumValue={0}
              maximumValue={durationMillis}
              thumbTintColor="#000"
              minimumTrackTintColor="#000"
              maximumTrackTintColor="#000"
              onSlidingStart={async () => await pauseAudio(true)}
              onSlidingComplete={async (value) => {
                await playFromTime(value);
                isPlaying && (await playAudio());
              }}
            />

            <View style={styles.buttons}>
              <View style={styles.bottomIconContainer}>
                <PlayButton
                  type={EPlayButtonTypes.PREV}
                  onPress={switchPrevSong}
                  size={30}
                  title=""
                />
                <PlayButton
                  type={
                    !isPlaying ? EPlayButtonTypes.PLAY : EPlayButtonTypes.PAUSE
                  }
                  onPress={() => (!isPlaying ? playAudio() : pauseAudio())}
                  size={50}
                  title=""
                />
                <PlayButton
                  type={EPlayButtonTypes.NEXT}
                  onPress={switchNextSong}
                  size={30}
                  title=""
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
};
