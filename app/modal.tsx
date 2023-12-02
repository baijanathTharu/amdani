import { View } from "react-native";
import { Form } from "../components/form";
import { router, useLocalSearchParams } from "expo-router";
import { TModel } from "../data/key-by-model";

export default function ModalScreen() {
  const params = useLocalSearchParams<{ type: TModel }>();
  const afterSave = () => {
    router.push(`/(tabs)/${params.type}`);
  };
  return (
    <View style={{ padding: 20 }}>
      <Form type={params.type} afterSave={afterSave} />
    </View>
  );
}
