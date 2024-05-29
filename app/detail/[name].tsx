import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { Chip, Text } from 'react-native-paper';
import { useQuery } from 'react-query';
import { ErrorView } from '../../components/Error';
import { LoadingView } from '../../components/LoadingView';
import { octokit, org } from '../../utils/octokit';


export default function DetailScreen() {
  const { name } = useLocalSearchParams();

  const { isLoading, error, data } = useQuery('repoDetail' + name, () =>
    octokit.request(`GET /repos/${org}/${name}`, {
      owner: org,
      repo: name,
      org,
      headers: { 'X-GitHub-Api-Version': '2022-11-28' }
    }).then((payload) => {
      return payload?.data
    })
  )

  if (isLoading) return <LoadingView />
  if (error) return <ErrorView error={error} />

  return (
    <>
      <ScrollView contentContainerStyle={{ margin: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>
            <IconText
              source="star"
              count={data.stargazers_count}
            />
            <IconText
              source="directions-fork"
              count={data.forks_count}
            />
            <IconText
              source="eye"
              count={data.watchers}
            />
          </View>
          <Text>{data?.language}</Text>
        </View>
        <Spacer />
        <Text variant="titleLarge">{data.name}</Text>
        <Spacer />
        <Text variant="bodyMedium">{data.description ? data.description : "No description for this repository at the moment."}</Text>
        <Text>Powered by: {data?.language}</Text>
      </ScrollView>
    </>
  )
}

function IconText({
  source,
  count,
}: {
  source: string,
  count: number,
}) {
  return (
    <View style={{ marginRight: 8 }}>
      <Chip icon={source} >{count}</Chip>
    </View>
  )
}

// Just a simple spacer component
function Spacer() {
  return <View style={{ marginTop: 12 }} />
}
