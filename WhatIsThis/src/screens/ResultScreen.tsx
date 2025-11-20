import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import type { Photo } from "../types";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function ResultScreen({
  photo,
  onBack,
}: {
  photo: Photo | null;
  onBack: () => void;
}) {
  return (
    <LinearGradient
      colors={["hsl(240, 99%, 50%)", "hsl(190, 100%, 50%)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.title}>Resultado da Captura</Text>
      {photo && (
        <View>
          <Image
            source={{ uri: photo.uri }}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.identifier}>Identificado</Text>
          <Text style={styles.object}>{photo.object}</Text>
          <View style={styles.containerObjects}>
            <View style={styles.containerObjectDescription}>
              <Text style={styles.text1}>Função:</Text>
              <Text style={styles.text2}>{photo.description}</Text>
            </View>
            <View
              style={{
                borderBottomColor: "#ccc",
                borderBottomWidth: 1,
                marginVertical: 10,
              }}
            />
            <View style={styles.containerObjectCategoryAndPrice}>
              <View style={styles.containerIdentifier}>
                <Text style={styles.text1}>Categoria:</Text>
                <Text style={styles.text2}>{photo.category}</Text>
              </View>
              <View style={styles.containerIdentifier}>
                <Text style={styles.text1}>Preço Médio:</Text>
                <Text style={styles.text2}>{photo.price}</Text>
              </View>
            </View>
          </View>
        </View>
      )}

      <LinearGradient
        colors={["hsl(240, 99%, 50%)", "hsl(190, 100%, 50%)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.buttonGradient} 
      >
        <TouchableOpacity onPress={onBack} style={styles.buttonInner}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </LinearGradient>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#fff",
  },
  image: {
    width: 400,
    height: 400,
  },
  identifier: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
    color: "#fff",
  },
  object: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 5,
    textAlign: "center",
    color: "#fff",
  },
  containerObjects: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    width: 300,
    alignSelf: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  containerObjectDescription: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  text1: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 12,
  },
  text2: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 10,
  },
  containerObjectCategoryAndPrice: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerIdentifier: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
  },
  buttonGradient: {
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 16,
  },
  buttonInner: {
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
