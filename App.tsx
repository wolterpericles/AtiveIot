import { NavigationContainer, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import AuthNavigator from "./src/navigation/AuthNavigator";
import AppNavigator from "./src/navigation/AppNavigator";
import { AuthProvider, useAuth } from "./src/context/AuthContext";

function RootNavigator() {
  const { user } = useAuth();
  return user ? <AppNavigator /> : <AuthNavigator />;
}

export default function App() {
  const scheme = useColorScheme(); // retorna "dark" ou "light"

  return (
    <AuthProvider>
      <NavigationContainer theme={scheme === "dark" ? DarkTheme : DefaultTheme}>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
