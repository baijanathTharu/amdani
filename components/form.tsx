import { View } from "react-native";
import React from "react";
import { TextInput, Text, Button, Card, HelperText } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type TKharcha = {
  paisa: string;
  kKoLagi: string;
  date: Date;
};

// const key = "kharcha_haru";
const key = "test";
async function createKharcha({ paisa, kKoLagi, date }: TKharcha) {
  const input = {
    paisa,
    kKoLagi,
    date,
  };
  const dataStr = await AsyncStorage.getItem(key);
  if (dataStr) {
    const data = JSON.parse(dataStr) as TKharcha[];
    data.push(input);
    await AsyncStorage.setItem(key, JSON.stringify(data));
    return;
  }
  await AsyncStorage.setItem(key, JSON.stringify([input]));
}

export async function getKharchas() {
  const kharchas = await AsyncStorage.getItem(key);
  return kharchas ? (JSON.parse(kharchas) as TKharcha[]) : [];
}

export function Form({ afterSave }: { afterSave: () => void }) {
  const [paisa, setPaisa] = React.useState("");
  const [kKoLagi, setKKoLagi] = React.useState("");

  const saveKharcha = async () => {
    if (!paisa) return;
    if (!kKoLagi) return;
    await createKharcha({
      paisa,
      kKoLagi,
      date: new Date(),
    });
    afterSave();
  };

  const errorChaPaisaMa = () => !paisa.length;
  const errorChaKKoLagiMa = () => !kKoLagi.length;

  return (
    <>
      <View
        style={{
          paddingVertical: 10,
          alignItems: "center",
        }}
      >
        <Text variant="headlineLarge">Kharcha kam garnus</Text>
      </View>
      <View style={{ paddingTop: 20 }}>
        <TextInput
          mode="flat"
          label="Kharcha kati vayo"
          value={paisa}
          onChangeText={(text) => setPaisa(text)}
        />
        <HelperText type="error" visible={errorChaPaisaMa()}>
          paisa halnus pahila
        </HelperText>
      </View>
      <View style={{ paddingBottom: 20 }}>
        <TextInput
          mode="flat"
          label="K Ko Lagi"
          value={kKoLagi}
          onChangeText={(text) => setKKoLagi(text)}
        />
        <HelperText type="error" visible={errorChaKKoLagiMa()}>
          k ko lagi pani lekhnus
        </HelperText>
      </View>
      <View style={{ paddingVertical: 10 }}>
        <Button icon="camera" mode="outlined" onPress={saveKharcha}>
          Save
        </Button>
        {/* <Button
          icon="camera"
          mode="outlined"
          onPress={() => setShouldReload((prev) => !prev)}
        >
          Refresh
        </Button> */}
      </View>
    </>
  );
}
