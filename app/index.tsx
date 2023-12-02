import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { IncomeModel } from "../data/income";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ExpenseModel } from "../data/expense";

export default function HomeScreen() {
  const [iLoading, setILoading] = React.useState(false);
  const [eLoading, setELoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [shouldReload, setShouldReload] = React.useState(false);
  const [totalIncome, setTotalIncome] = React.useState(0);
  const [totalExpense, setTotalExpense] = React.useState(0);

  React.useEffect(() => {
    setError("");
    setILoading(true);

    IncomeModel.getInstance(AsyncStorage)
      .getTotal()
      .then((total) => setTotalIncome(total))
      .catch((e) => setError(e.message))
      .finally(() => setILoading(false));
  }, [shouldReload]);

  React.useEffect(() => {
    setError("");
    setELoading(true);

    ExpenseModel.getInstance(AsyncStorage)
      .getTotal()
      .then((total) => setTotalExpense(total))
      .catch((e) => setError(e.message))
      .finally(() => setELoading(false));
  }, [shouldReload]);

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
          {error ? (
            <Text style={{ color: "red" }} variant="titleMedium">
              {error}
            </Text>
          ) : null}
          {iLoading ? (
            <Text>Loading...</Text>
          ) : (
            <Card style={{ width: "80%" }}>
              <Card.Content>
                <Text variant="titleLarge">Total Amdani</Text>
                <Text variant="bodyMedium">Rs. {totalIncome}</Text>
                <Text variant="bodyMedium">
                  Date: {new Date().toISOString()}
                </Text>
                <Link href={`/(tabs)/income`}>
                  <Text style={{ fontStyle: "italic", color: "#42a5f5" }}>
                    See more
                  </Text>
                </Link>
              </Card.Content>
            </Card>
          )}
          {eLoading ? (
            <Text>Loading...</Text>
          ) : (
            <Card style={{ width: "80%" }}>
              <Card.Content>
                <Text variant="titleLarge">Total Kharcha</Text>
                <Text variant="bodyMedium">Rs. {totalExpense}</Text>
                <Text variant="bodyMedium">
                  Date: {new Date().toISOString()}
                </Text>
                <Link href={`/(tabs)/expense`}>
                  <Text style={{ fontStyle: "italic", color: "#42a5f5" }}>
                    See more
                  </Text>
                </Link>
              </Card.Content>
            </Card>
          )}
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
