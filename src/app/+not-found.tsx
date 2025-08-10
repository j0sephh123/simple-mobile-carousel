import { Stack } from "expo-router";
import { NotFoundState } from "@/src/ui/states";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <NotFoundState />
    </>
  );
}
