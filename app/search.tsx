import { useDebounce } from "@uidotdev/usehooks";
import { router } from 'expo-router';
import React, { useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, Icon, Text, TextInput } from 'react-native-paper';
import { useQuery } from 'react-query';
import { ErrorView } from "../components/Error";
import { LoadingView } from "../components/LoadingView";
import { octokit, org } from '../utils/octokit';

export default function SearchScreen() {
  const [text, setText] = React.useState("");
  const q = useMemo(() => `${text} org:${org}`, [text])
  const debouncedSearchTerm = useDebounce(q, 300);

  const { isLoading, error, data } = useQuery('repoSearch' + debouncedSearchTerm, () => {
    if (text.length < 1)
      return []

    return octokit.request(`GET /search/repositories`, {
      q: debouncedSearchTerm,
      headers: { 'X-GitHub-Api-Version': '2022-11-28' }
    }).then((payload) => payload?.data?.items)
  })

  if (error) return <ErrorView error={error} />

  return (
    <>
      <TextInput
        style={{ margin: 12 }}
        label="Search"
        value={text}
        onChangeText={text => setText(text)}
      />

      <FlatList
        data={data}
        ListFooterComponent={() => {
          if (isLoading) return <LoadingView />
        }}
        renderItem={({ item }) => (
          <Card style={styles.cardContainer}>
            <Card.Content >
              <Text variant="titleMedium">{item.name}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Icon
                  source="star"
                  color={"yellow"}
                  size={20}
                />
                <Text variant="bodyMedium">{item.stargazers_count}</Text>
              </View>
              <Text variant="bodyMedium">{item.description ? item.description : "No description for this repository at the moment."}</Text>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => router.push({
                pathname: "/detail/[name]",
                params: { name: item.name }
              })}>View</Button>
            </Card.Actions>
          </Card>
        )}
      />
    </>
  )
}


const styles = StyleSheet.create({
  cardContainer: { marginHorizontal: 12, marginVertical: 8, backgroundColor: 'white' }
});
