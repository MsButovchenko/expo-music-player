import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
    padding: 10,
  },
  player: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  songContent: {
    textAlign: 'center',
    color: '#EEEEEE',
  },
  imgContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  img: {
    width: 350,
    height: 350,
    borderRadius: 15,
  },
  songTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  songArtist: {
    fontSize: 16,
    fontWeight: '300',
  },
  bottom: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  progressBar: {
    height: 40,
    flexDirection: 'row',
  },
  progressLevelDuraiton: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabelText: {
    color: '#FFF',
  },
  buttons: {
    alignItems: 'center',
    paddingVertical: 15,
    justifyContent: 'flex-end',
  },

  bottomIconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 30,
  },
  description: {
    minHeight: '65%',
  },
});
