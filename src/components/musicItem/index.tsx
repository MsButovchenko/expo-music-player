import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { EScreens } from '../../constants/navigation.constant';
import { IMusicItemProps } from './musicItem.types';
import { PlayButton } from '../playButton';
import { EPlayButtonTypes } from '../playButton/playButton.contant';

export const MusicItem = ({
  music,
  isAllMusic,
  addMusic,
  isMyMusic,
  deleteMusic,
}: IMusicItemProps) => {
  const navigation = useNavigation();
  const { author, id, img, nameSong } = music;

  const onAddMusic = async (event: GestureResponderEvent) => {
    event.stopPropagation();
    event.preventDefault();
    addMusic && !isMyMusic && (await addMusic(music));
  };

  const onDeleteMusic = async (event: GestureResponderEvent) => {
    event.stopPropagation();
    event.preventDefault();
    deleteMusic && !isAllMusic && (await deleteMusic(music));
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        // @ts-ignore
        navigation.navigate(EScreens.Player, { id, isMyMusic: !isAllMusic })
      }
    >
      <>
        <Image source={img} style={styles.img} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{nameSong}</Text>
          <Text>{author}</Text>
        </View>
      </>
      <View style={styles.buttons}>
        {addMusic && (
          <PlayButton
            type={isMyMusic ? EPlayButtonTypes.CHECK : EPlayButtonTypes.ADD}
            onPress={onAddMusic}
            size={35}
            title=""
          />
        )}
        {!isAllMusic && (
          <PlayButton
            type={EPlayButtonTypes.DELETE}
            onPress={onDeleteMusic}
            size={25}
            title=""
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    gap: 10,
    maxHeight: 80,
    width: '100%',
    overflow: 'hidden',
  },
  description: {
    flex: 1,
  },
  titleContainer: {
    gap: 6,
    width: '65%',
  },
  title: {
    fontWeight: '500',
    fontSize: 18,
  },
  img: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  buttons: {
    justifyContent: 'center',
    height: '100%',
  },
});
