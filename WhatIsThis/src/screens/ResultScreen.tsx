import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import type { Photo } from "../types";
import { Image } from "react-native";

export default function ResultScreen({
  photo,
  onBack,
}: {
  photo: Photo | null;
  onBack: () => void;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resultado da Captura</Text>
      {photo && (
        <View>
          <Image
            source={{ uri: photo.uri }}
            style={styles.image}
            resizeMode="contain"
          />
          <View>
            <View>
              <Text>Categoria</Text>
              <Text>{photo.category}</Text>
            </View>
            <View>
              <Text>Descrição</Text>
              <Text>{photo.description}</Text>
            </View>
          </View>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={onBack}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7c1ae4e5",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  image: {
    width: 400,
    height: 400,
  },
  button: {
    backgroundColor: "#6200ee",
    padding: 12,
    borderRadius: 4,
    marginTop: 16,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
});
