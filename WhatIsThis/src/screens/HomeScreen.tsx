import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface HomeScreenProps {
  onStartCamera: () => void; 
}

export default function HomeScreen({ onStartCamera }: HomeScreenProps) {
  return (
    <LinearGradient colors={["hsl(240, 99%, 50%)", "hsl(190, 100%, 50%)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}>
      <View style={styles.cameraIcon}>
        <Feather name="camera" size={50} color="white" />
      </View>
      <Text style={styles.tittle}>What is this?</Text>
      <Text style={styles.description}>
        Descubra o que é qualquer objeto em segundos
      </Text>
      <View style={styles.containerElements}>
        <View style={styles.iconContainer}>
          <Ionicons name="sparkles-outline" size={24} color="white" />
        </View>
        <View>
          <Text style={styles.textContainer}>Identificação Instantânea</Text>
          <Text style={styles.textContainerDescription}>
            Resultados em tempo real
          </Text>
        </View>
      </View>
      <View style={styles.containerElements}>
        <View style={styles.iconContainer}>
          <Feather name="camera" size={24} color="white" />
        </View>
        <View>
          <Text style={styles.textContainer}>Identificação Instantânea</Text>
          <Text style={styles.textContainerDescription}>
            Resultados em tempo real
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.customButton}
        onPress={onStartCamera}
      >
        <Feather name="camera" size={20} color="hsl(240, 99%, 50%)" />
        <Text style={styles.buttonText}>Iniciar Identificação de Objeto</Text>
      </TouchableOpacity>
      <Text style={styles.instructionText}>Toque no botão acima para começar</Text>
      <StatusBar style="auto" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraIcon: {
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 30,
    padding: 50,
  },
  tittle: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  containerElements: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    padding: 20,
    gap: 10,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
  },
  iconContainer: {
    marginRight: 10,
    backgroundColor: "#0101ff3f",
    padding: 10,
    borderRadius: 10,
  },
  textContainer: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 16,
  },
  textContainerDescription: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "normal",
    opacity: 0.8,
  },
  customButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 40,
    gap: 10,
  },
  buttonText: {
    color: "hsl(240, 99%, 50%)",
    fontWeight: "bold",
    fontSize: 16,
  },
  instructionText: {
    color: "#fff",
    fontSize: 14,
    marginTop: 30,
    opacity: 0.8,
  },
});
