import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import React, { useRef, useState } from "react";
import { Photo } from "../types";
import { identifyObject } from "../services/IdentificationService";
import { LinearGradient } from "expo-linear-gradient";

interface CameraScreenProps {
  onCapture: (photo: Photo) => void;
  onCancel: () => void;
}

const CameraScreen: React.FC<CameraScreenProps> = ({ onCapture, onCancel }) => {
  const cameraRef = useRef<CameraView>(null);
  const [type, setType] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    requestPermission();
  }

  const handleCapture = async () => {
    try {
      if (!cameraRef.current) return;

      const photo = await cameraRef.current.takePictureAsync({
        base64: true,
        quality: 0.4,
      });
      console.log("Foto capturada, enviando para backend...");
      console.log("Base64 existe? ", photo.base64?.substring(0, 30));

      const basePhoto: Photo = {
        uri: photo.uri,
        base64: photo.base64 ?? "",
        width: photo.width,
        height: photo.height,
        category: undefined,
        description: undefined,
        object: undefined,
        price: undefined,
      };

      const identificationResult = await identifyObject(
        basePhoto,
        "Identifique o objeto na imagem e forneça categoria, descrição, objeto e preço médio."
      );

      const finalPhoto: Photo = {
        ...basePhoto,
        category: identificationResult.categoria,
        object: identificationResult.objeto,
        description: identificationResult.funcao, 
        price: identificationResult.precoMedio, 
      };

      console.log("Identificação completa. Objeto:", finalPhoto.object);

      onCapture(finalPhoto);
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível identificar o objeto. Verifique a conexão e o backend."
      );
    } finally {
      setIsProcessing(false); 
    }
  };

  return (
    <LinearGradient
      colors={["hsl(240, 99%, 50%)", "hsl(190, 100%, 50%)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Feather
        style={styles.iconCamera}
        name="camera"
        size={50}
        color="#ffffff"
      />
      <CameraView
        style={styles.cameraView}
        ref={cameraRef}
        facing={type}
      ></CameraView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.buttonTextCancel}>Cancelar</Text>
        </TouchableOpacity>

        <View style={styles.captureButton}>
          <TouchableOpacity onPress={handleCapture} activeOpacity={1}>
            <LinearGradient
              colors={["hsl(240, 99%, 50%)", "hsl(190, 100%, 50%)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <Feather name="camera" size={20} color="#ffffff" />
              <Text style={styles.buttonTextCapture}>Capturar</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7c1ae4e5",
    alignItems: "center",
    justifyContent: "center",
  },
  iconCamera: {
    marginBottom: 20,
  },
  cameraView: {
    width: 350,
    height: 400,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 50,
  },
  cancelButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#fff",
    padding: 10, 
    width: 150,
    borderWidth: 1,
    borderColor: "hsl(240, 99%, 50%)",
    borderRadius: 10,
  },
  buttonTextCancel: {
    color: "hsl(240, 99%, 50%)",
    fontWeight: "bold",
  },
  buttonTextCapture: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  captureButton: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    overflow: "hidden",
  },
  buttonGradient: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
    width: 150,
    justifyContent: "center",
    height: 60,
    borderRadius: 10,
  },
});

export default CameraScreen;
