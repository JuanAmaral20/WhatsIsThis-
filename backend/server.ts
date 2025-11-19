import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genAI';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '50mb' }));

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

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

app.post('/api/chat', async (req: Request, res: Response) => {
    try {
        const {base64Image} = req.body;

        if (!base64Image) {
            return res.status(400).json({ error: 'base64Image is required' });
        }
        const result = await genAI.models.generateContent({ model: "gemini-2.5-flash", contents: [
            { text: analysisPrompt },
            { inlineData: { mimeType: 'image/png', data: base64Image } }
        ] });
        const responseText = result.candidates?.[0]?.content?.parts?.[0]?.text || "Erro ao gerar resposta";
        return res.json({ result: responseText });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
   

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}🚀🚀`);
});
