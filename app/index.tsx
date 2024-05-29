import { router } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, MD2Colors } from 'react-native-paper';
import { ErrorView } from '../components/Error';
import { LoadingView } from '../components/LoadingView';
import { useRepos } from '../hooks/useRepos';
import { DetailItem } from '../components/DetailItem';

export default function HomeScreen() {

  const {
    flattenData,
    isLoading,
    isFetching,
    error,
    fetchNextPage,
    isMaxPage
  } = useRepos()

  const handleSearch = () => (router.push('search'))

  if (isLoading) return <LoadingView />

  if (error) return <ErrorView error={error} />

  return (
    <React.Fragment>
      <FlatList
        data={flattenData}
        keyExtractor={d => d.id.toString()}
        onEndReached={() => {
          if (isFetching) return
          fetchNextPage()
        }}
        ListFooterComponent={() => {
          if (isFetching && isMaxPage)
            return <ActivityIndicator style={{ marginTop: 12 }} animating={true} color={MD2Colors.red800} />
        }}
        renderItem={DetailItem}
      />
      <View style={styles.lowerViewContainer}>
        <Button icon="text-search" mode="contained" onPress={handleSearch}>Search</Button>
      </View>
    </React.Fragment>
  )
}


const styles = StyleSheet.create({
  lowerViewContainer: {
    marginHorizontal: 12, marginVertical: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'
  }
});



