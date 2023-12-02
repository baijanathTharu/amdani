export const models = ["income", "expense"] as const;
export type TModel = (typeof models)[number];
export const keyByModelName = {
  [models[0]]:
    process.env.EXPO_PUBLIC_ENVIRONMENT === "DEV" ? "dev_income" : "income",
  [models[1]]:
    process.env.EXPO_PUBLIC_ENVIRONMENT === "DEV" ? "dev_expense" : "expense",
} as const;
