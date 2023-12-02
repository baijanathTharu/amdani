import { Alert, ScrollView, View } from "react-native";
import React from "react";
import { Text, Card, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Model, TDataItem } from "../../data/db";

export default function ExpenseScreen() {
  const [expenses, setExpense] = React.useState<TDataItem[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("There is some error");
  const [shouldReload, setShouldReload] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    setError("");
    Model.getInstance("expense", AsyncStorage)
      .getAllOrderedByLatest()
      .then((data) => {
        setExpense(data);
      })
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [shouldReload]);

  const reloadData = () => setShouldReload((prev) => !prev);

  const onDeleteItem = async (id: number, description: string) => {
    Alert.alert("Delete: ", `Do you want to delete: (${description})?`, [
      {
        text: "cancel",
        onPress() {
          // console.warn("cancel");
          // do nothing
        },
        style: "cancel",
      },
      {
        text: "Yes",
        async onPress() {
          const model = Model.getInstance("expense", AsyncStorage);
          await model.deleteById(id);
          reloadData();
        },
        style: "destructive",
      },
    ]);
  };
  return (
    <ScrollView style={{ padding: 10 }}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View style={{ paddingVertical: 10 }}>
          <View style={{ marginVertical: 5 }}>
            <Button icon="reload" onPress={reloadData}>
              Reload
            </Button>
          </View>
          {error ? (
            <Text variant="labelMedium" style={{ color: "red" }}>
              {error}
            </Text>
          ) : (
            expenses.map((expense) => {
              const dateStrToDate = new Date(expense.date);
              const date = dateStrToDate.getDate();
              const month = dateStrToDate.getMonth() + 1;
              const year = dateStrToDate.getFullYear();
              const hr = dateStrToDate.getHours();
              const min = dateStrToDate.getMinutes();
              return (
                <View
                  style={{ paddingVertical: 5 }}
                  key={new Date(expense.date).getMilliseconds()}
                >
                  <Card>
                    <Card.Title
                      title={`${year}/${month}/${date}`}
                      subtitle={`${hr}:${min}`}
                      // left={(props) => <Avatar.Icon {...props} icon="" />}
                    />
                    <Card.Content>
                      <Text variant="titleMedium">{expense.description}</Text>
                      <Text variant="bodyMedium">Rs. {expense.money}</Text>
                    </Card.Content>
                    <Card.Actions>
                      <Button
                        icon={"delete"}
                        textColor="red"
                        mode="outlined"
                        onPress={() =>
                          onDeleteItem(expense.id, expense.description)
                        }
                      >
                        Delete
                      </Button>
                    </Card.Actions>
                  </Card>
                </View>
              );
            })
          )}
        </View>
      )}
    </ScrollView>
  );
}
