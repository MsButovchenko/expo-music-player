import { NavigationContainer } from '@react-navigation/native';
import { Navigation } from './navigations/navigation';
import { StatusBar } from 'react-native';
import React, { useState } from 'react';
import { MyMusicContext } from './context/myMusic.context';
import { IPlayerMusic } from './types/playerMusic.types';

export const Main = () => {
  const [myMusic, setMyMusic] = useState<IPlayerMusic[] | null>(null);
  const [myMusicIds, setMyMusicIds] = useState<string[] | null>(null);
  return (
    <MyMusicContext.Provider
      value={{ myMusic, myMusicIds, setMyMusic, setMyMusicIds }}
    >
      <NavigationContainer>
        <Navigation />
        <StatusBar />
      </NavigationContainer>
    </MyMusicContext.Provider>
  );
};
