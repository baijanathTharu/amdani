import { Link } from "expo-router";
import { View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View style={{ alignItems: "center", paddingVertical: 10 }}>
        <Text variant="titleLarge">Amdani</Text>
        <View
          style={{
            alignItems: "center",
            paddingVertical: 10,
            gap: 20,
            width: "100%",
            marginLeft: 20,
            marginRight: 20,
          }}
        >
          <Card style={{ width: "80%" }}>
            <Card.Content>
              <Text variant="titleLarge">Total Amdani</Text>
              <Text variant="bodyMedium">Rs. 1525</Text>
              <Text variant="bodyMedium">Date: 2023-12-02</Text>
              <Link href={`/(tabs)/income`}>
                <Text style={{ fontStyle: "italic", color: "#42a5f5" }}>
                  See more
                </Text>
              </Link>
            </Card.Content>
          </Card>
          <Card style={{ width: "80%" }}>
            <Card.Content>
              <Text variant="titleLarge">Total Kharcha</Text>
              <Text variant="bodyMedium">Rs. 1525</Text>
              <Text variant="bodyMedium">Date: 2023-12-02</Text>
              <Link href={`/(tabs)/expense`}>
                <Text style={{ fontStyle: "italic", color: "#42a5f5" }}>
                  See more
                </Text>
              </Link>
            </Card.Content>
          </Card>
        </View>
        <View>
          <Button icon={"plus"} mode="outlined">
            Add
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
