import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, View, useColorScheme } from "react-native";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
    // screenOptions={{
    //   tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
    // }}
    >
      <Tabs.Screen
        name="income"
        options={{
          title: "Income",
          tabBarIcon: ({ color }) => <TabBarIcon name="money" color={color} />,
          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
              <Link href="/" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="home"
                      size={25}
                      // color={Colors[colorScheme ?? 'light'].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
              <Link href="/modal?type=income" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="plus-square"
                      size={25}
                      // color={Colors[colorScheme ?? 'light'].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="expense"
        options={{
          title: "Expense",
          tabBarIcon: ({ color }) => <TabBarIcon name="money" color={color} />,
          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
              <Link href="/" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="home"
                      size={25}
                      // color={Colors[colorScheme ?? 'light'].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
              <Link href="/modal?type=expense" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="plus-square"
                      size={25}
                      // color={Colors[colorScheme ?? 'light'].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
