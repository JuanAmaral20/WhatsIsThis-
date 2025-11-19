import { parseResult } from "../../utils/parser";
import { Photo } from "../types";
import { Alert } from "react-native";

const YOUR_PROXY_API_URL = "http://192.168.1.8:3000/api/chat";

export interface IdentificationResult {
  categoria: string;
  objeto: string;
  funcao: string;
  precoMedio: string;
  rawResponse: string;
}

export async function identifyObject(
  photo: Photo,
  prompt: string
): Promise<IdentificationResult> {
  const imageBase64 = photo.base64;

  if (!imageBase64) {
    throw new Error("A foto não contém dados Base64 para envio.");
  }

  try {
    console.log(
      "Enviando requisição real para o backend em:",
      YOUR_PROXY_API_URL
    );

    const requestBody = {
      base64Image: imageBase64,
      prompt: prompt,
    };

    const response = await fetch(YOUR_PROXY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Erro do Servidor/Proxy:", data);
      throw new Error(
        `Falha no servidor: ${data.error || "Resposta JSON inválida."}`
      );
    }

    const responseText = data.result;

    const parsed = parseResult(responseText);

    return {
      categoria: parsed["Categoria"] ?? "",
      objeto: parsed["Objeto"] ?? "",
      funcao: parsed["Função"] ?? "",
      precoMedio: parsed["Preço médio"] ?? "",
      rawResponse: responseText,
    };
    
  } catch (error) {
    console.error("Erro de Rede/API:", error);
    Alert.alert(
      "Erro de Conexão",
      "Não foi possível conectar ao backend. Verifique se o servidor está rodando e o IP está correto."
    );
    throw new Error("Falha de comunicação com o servidor.");
  }
}
