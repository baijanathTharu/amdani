import { View } from "react-native";
import React from "react";
import { TextInput, Text, Button, HelperText } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Model } from "../data/db";
import { TModel } from "../data/key-by-model";

export function Form({
  type,
  afterSave,
}: {
  type: TModel;
  afterSave: () => void;
}) {
  const [money, setMoney] = React.useState("");
  const [description, setDescription] = React.useState("");

  const saveData = async () => {
    if (!money) return;
    if (!description) return;
    const model = Model.getInstance(type, AsyncStorage);
    await model.create({
      money,
      description,
    });
    afterSave();
  };

  const errorChaPaisaMa = () => !money.length;
  const errorChaKKoLagiMa = () => !description.length;

  return (
    <>
      <View
        style={{
          paddingVertical: 5,
          alignItems: "center",
        }}
      >
        <Text variant="headlineMedium">
          {type === "expense"
            ? "Kharcha"
            : type === "income"
            ? "Amdani"
            : "No title"}
        </Text>
      </View>
      <View style={{ paddingTop: 20 }}>
        <TextInput
          mode="flat"
          label="Money"
          value={money}
          onChangeText={(text) => setMoney(text)}
        />
        <HelperText type="error" visible={errorChaPaisaMa()}>
          Required
        </HelperText>
      </View>
      <View style={{ paddingBottom: 20 }}>
        <TextInput
          mode="flat"
          label="Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <HelperText type="error" visible={errorChaKKoLagiMa()}>
          Required
        </HelperText>
      </View>
      <View style={{ paddingVertical: 10 }}>
        <Button icon="camera" mode="outlined" onPress={saveData}>
          Save
        </Button>
      </View>
    </>
  );
}
