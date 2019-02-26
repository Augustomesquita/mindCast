import React from 'react';
import {
  TouchableOpacity, Platform, View, Text, FlatList,
} from 'react-native';
import styled from 'styled-components';

import NextPodcastListItem from './NextPodcastListItem';
import Icon from '~/components/common/Icon';
import appStyles from '~/styles';

const Container = styled(View)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.dark};
  padding-top: ${({ theme }) => theme.metrics.getHeightFromDP('6%')}px;
`;

const Header = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

const NextText = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('7%')}px;
  font-family: CircularStd-Bold;
  padding-left: ${({ theme }) => theme.metrics.largeSize}px;
  padding-bottom: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const Playlist = styled(FlatList)`
  width: 100%;
  height: 100%;
  margin-top: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const renderHeader = (onBackPress: Function, iconName: string): Object => {
  const iconSize = Platform.OS === 'android' ? '8%' : '12%';

  return (
    <Header>
      <TouchableOpacity
        onPress={onBackPress}
        hitSlop={{
          bottom: appStyles.metrics.smallSize,
          right: appStyles.metrics.smallSize,
          left: appStyles.metrics.smallSize,
          top: appStyles.metrics.smallSize,
        }}
      >
        <Icon
          name={iconName}
          size={appStyles.metrics.getWidthFromDP(iconSize)}
        />
      </TouchableOpacity>
      <NextText>Next Up</NextText>
    </Header>
  );
};

const renderNextPodcastsList = (
  nextPodcasts: Array<Object>,
  removeFromPlaylist: Function,
): Object => (
  <Playlist
    showsHorizontalScrollIndicator={false}
    keyExtractor={item => `${item.id}`}
    data={nextPodcasts}
    renderItem={({ item }) => (
      <NextPodcastListItem
        removeFromPlaylist={removeFromPlaylist}
        podcast={item}
      />
    )}
  />
);

type Props = {
  removeFromPlaylist: Function,
  playlist: Array<Object>,
  onBackPress: Function,
  playlistIndex: number,
};

const ContentView = ({
  removeFromPlaylist,
  playlistIndex,
  onBackPress,
  playlist,
}: Props): Object => {
  const iconName = Platform.OS === 'android' ? 'arrow-left' : 'chevron-left';
  const nextPodcasts = playlist.slice(playlistIndex + 1, playlist.length);

  return (
    <Container>
      {renderHeader(onBackPress, iconName)}
      {renderNextPodcastsList(nextPodcasts, removeFromPlaylist)}
    </Container>
  );
};

export default ContentView;
