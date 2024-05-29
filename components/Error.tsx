import { Text } from 'react-native-paper';

export function ErrorView({ error }: any) {
  return <Text>An error has occurred: {JSON.stringify(error)}</Text>
}
