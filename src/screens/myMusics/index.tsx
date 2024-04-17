import { FlatList, StyleSheet, Text, View } from 'react-native';
import { MusicItem } from '../../components/musicItem';
import { useMyMusics } from '../../hooks/myMusics.hook';

export const MyMusics = () => {
  const { myMusic, deleteMusic, getMyMusic, onFavorite } = useMyMusics();

  return (
    <>
      {!!myMusic?.length && (
        <FlatList
          data={myMusic}
          keyExtractor={(item) => item.id}
          onRefresh={getMyMusic}
          refreshing={false}
          renderItem={({ item }) => (
            <MusicItem
              music={item}
              deleteMusic={deleteMusic}
              onFavorite={onFavorite}
            />
          )}
        />
      )}
      {!myMusic?.length && (
        <View style={styles.emptyContainer}>
          <Text style={styles.title}>Нет добавленной музыки</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
  },
});
