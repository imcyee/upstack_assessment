import { ActivityIndicator, MD2Colors } from 'react-native-paper';


export function LoadingView() {
  return <ActivityIndicator style={{ marginTop: 12 }} animating={true} color={MD2Colors.red800} />
}
