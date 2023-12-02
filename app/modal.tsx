import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { Form, TFormSave } from "../components/form";
import { TModel } from "../data/key-by-model";
import { IncomeModel } from "../data/income";
import { ExpenseModel } from "../data/expense";

export default function ModalScreen() {
  const params = useLocalSearchParams<{ type: TModel }>();
  const onSave: TFormSave = async (data) => {
    if (params.type === "income") {
      const model = IncomeModel.getInstance(AsyncStorage);
      await model.create({
        money: data.money,
        description: data.description,
      });
    }

    if (params.type === "expense") {
      const model = ExpenseModel.getInstance(AsyncStorage);
      await model.create({
        money: data.money,
        description: data.description,
      });
    }
    router.push(`/(tabs)/${params.type}`);
  };
  return (
    <View style={{ padding: 20 }}>
      <Form type={params.type} onSave={onSave} />
    </View>
  );
}
