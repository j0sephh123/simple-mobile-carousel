import { Stack } from "expo-router";
import { NotFoundState } from "../features/common";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <NotFoundState />
    </>
  );
}
