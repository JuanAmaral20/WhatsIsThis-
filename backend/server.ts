import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(cors());

app.use(express.json({ limit: "50mb" }));

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const analysisPrompt = `
Analise o objeto principal na imagem enviada e responda exclusivamente com as seguintes informações:

1. **Categoria do objeto**  
   (Escolha a melhor entre: Eletrônicos, Ferramentas, Doméstico, Alimentos, Beleza/Higiene, Roupa/Acessório, Brinquedo, Escritório, Automotivo, Esportivo, Escolar, Pet, ou “Outros” se não houver categoria adequada.)

2. **O que é o objeto**  
   (Nome claro e direto.)

3. **Para que serve**  
   (Função principal em 1 frase.)

4. **Preço médio no Brasil**  
   (Faixa de preço aproximada em reais.)

Regras:
- Seja breve e extremamente objetivo.
- Não descreva o cenário ou a foto, apenas o objeto.
- Não invente detalhes não visíveis.
- Se vários objetos aparecerem, descreva o mais relevante.
- O retorno deve ser estruturado exatamente assim:

Categoria: …
Objeto: …
Função: …
Preço médio: …
`;

app.post("/api/chat", async (req: Request, res: Response) => {
  try {
    const { base64Image } = req.body;

    if (!base64Image) {
      return res.status(400).json({ error: "base64Image is required" });
    }

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        { inlineData: { mimeType: "image/jpeg", data: base64Image } },
        { text: analysisPrompt },
      ],
    });

    const responseText = result.text;

    res.json({ result: responseText });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on http://192.168.1.8:${port} 🚀`);
});
