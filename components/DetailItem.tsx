import { router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { Button, Card, Icon, Text } from 'react-native-paper';
// import type { RestEndpointMethodTypes } from 'octokit';
import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";

type DetailItemType = {
  item: RestEndpointMethodTypes["repos"]["get"]["response"]['data']
}

export const DetailItem = ({ item }: DetailItemType) => {
  const handleDetail = () => router.push({
    pathname: "/detail/[name]",
    params: { name: item.name }
  })
  return (
    <Card style={{ marginHorizontal: 12, marginVertical: 8, backgroundColor: 'white' }}>
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
        <Button onPress={handleDetail}>View</Button>
      </Card.Actions>
    </Card>
  )
}