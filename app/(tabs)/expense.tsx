import { ScrollView, View } from "react-native";
import React from "react";
import { Text, Card } from "react-native-paper";
import { TKharcha, getKharchas } from "../../components/form";

export default function ExpenseScreen() {
  const [kharchas, setKharchas] = React.useState<TKharcha[]>([]);

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
  }, []);

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

      <View style={{ paddingVertical: 20 }}>
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
