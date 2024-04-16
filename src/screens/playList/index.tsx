import { FlatList } from 'react-native';
import { musicMock } from '../../mock/mock';
import { MusicItem } from '../../components/musicItem';
import { useMyMusics } from '../../hooks/myMusics.hook';

export const PlayList = () => {
  const { myMusicIds, addMusic, getMyMusic } = useMyMusics();

  return (
    <FlatList
      data={musicMock}
      keyExtractor={(item) => item.id}
      onRefresh={getMyMusic}
      refreshing={false}
      renderItem={({ item }) => (
        <MusicItem
          music={item}
          isAllMusic
          addMusic={addMusic}
          isMyMusic={myMusicIds?.includes(item.id)}
        />
      )}
    />
  );
};
