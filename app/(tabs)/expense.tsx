import { ScrollView, View } from "react-native";
import React from "react";
import { TextInput, Text, Button, Card, HelperText } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

type TKharcha = {
  paisa: string;
  kKoLagi: string;
  date: Date;
};

const key = "kharcha_haru";
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

async function getKharchas() {
  const kharchas = await AsyncStorage.getItem(key);
  return kharchas ? (JSON.parse(kharchas) as TKharcha[]) : [];
}

export default function ExpenseScreen() {
  const [paisa, setPaisa] = React.useState("");
  const [kKoLagi, setKKoLagi] = React.useState("");
  const [kharchas, setKharchas] = React.useState<TKharcha[]>([]);
  const [shouldReload, setShouldReload] = React.useState(false);

  React.useEffect(() => {
    getKharchas().then((kharchas) => {
      const nayaKharchaHaruSuruma = kharchas.sort((a, b) => {
        const aDate = new Date(a.date);
        const bDate = new Date(b.date);
        if (aDate < bDate) return 1;
        else if (aDate > bDate) return -1;
        return 0;
      });
      setKharchas(nayaKharchaHaruSuruma);
    });
  }, [shouldReload]);

  const saveKharcha = async () => {
    if (!paisa) return;
    if (!kKoLagi) return;
    await createKharcha({
      paisa,
      kKoLagi,
      date: new Date(),
    });
    setShouldReload((prev) => !prev);
  };

  const errorChaPaisaMa = () => !paisa.length;
  const errorChaKKoLagiMa = () => !kKoLagi.length;

  return (
    <ScrollView style={{ padding: 20 }}>
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
      <View style={{ paddingVertical: 20 }}>
        <View style={{ alignItems: "center" }}>
          <Text variant="titleMedium" style={{ paddingVertical: 5 }}>
            Kharcha Haru
          </Text>
        </View>
        {kharchas.map((kharcha) => {
          const dateStrToDate = new Date(kharcha.date);
          const date = dateStrToDate.getDate();
          const month = dateStrToDate.getMonth() + 1;
          const year = dateStrToDate.getFullYear();
          const hr = dateStrToDate.getHours();
          const min = dateStrToDate.getMinutes();
          return (
            <View
              style={{ paddingVertical: 5 }}
              key={new Date(kharcha.date).getMilliseconds()}
            >
              <Card>
                <Card.Title
                  title={`${year}/${month}/${date}`}
                  subtitle={`${hr}:${min}`}
                  // left={(props) => <Avatar.Icon {...props} icon="" />}
                />
                <Card.Content>
                  <Text variant="titleLarge">{kharcha.kKoLagi}</Text>
                  <Text variant="bodyMedium">Rs. {kharcha.paisa}</Text>
                  <Text variant="bodyMedium">Date:</Text>
                </Card.Content>
                {/* <Card.Cover source={{ uri: "https://picsum.photos/700" }} /> */}
                {/* <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
          </Card.Actions> */}
              </Card>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
