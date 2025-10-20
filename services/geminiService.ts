import { GoogleGenAI, Modality, Part } from "@google/genai";

// Fix: Initialize the GoogleGenAI client with the API key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const fileToGenerativePart = async (file: File): Promise<Part> => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  const base64EncodedData = await base64EncodedDataPromise;
  return {
    inlineData: {
      data: base64EncodedData,
      mimeType: file.type,
    },
  };
};

export const generateVirtualTryOn = async (
  personImage: File,
  garmentImage: File | null,
  garmentDescription: string,
  refinePrompt: string = ''
): Promise<string> => {
  const model = 'gemini-2.5-flash-image';
  
  const personImagePart = await fileToGenerativePart(personImage);

  const parts: Part[] = [personImagePart];
  
  let promptText = "Virtually try on the garment onto the person in the image. Ensure the result is realistic, maintaining the person's pose, body shape, and background. The output image should be a full-body or upper-body shot similar to the input person's image.";

  if (garmentImage) {
    const garmentImagePart = await fileToGenerativePart(garmentImage);
    parts.push(garmentImagePart);
    promptText += " The garment to be worn is in the second image provided.";
  } else if (garmentDescription) {
    promptText += ` The garment is: ${garmentDescription}.`;
  }
  
  if (refinePrompt) {
    promptText += ` Additional instructions: ${refinePrompt}.`;
  }
  
  parts.push({ text: promptText });

  try {
    const result = await ai.models.generateContent({
      model: model,
      contents: { parts: parts },
      config: {
          responseModalities: [Modality.IMAGE],
      },
    });

    if (result.candidates && result.candidates[0] && result.candidates[0].content.parts[0].inlineData) {
        const base64ImageBytes = result.candidates[0].content.parts[0].inlineData.data;
        return `data:image/png;base64,${base64ImageBytes}`;
    } else {
        throw new Error("No image was generated. The response might have been blocked.");
    }

  } catch (error) {
    console.error("Error generating virtual try-on:", error);
    let errorMessage = "An unknown error occurred while generating the image.";
    if (error instanceof Error) {
        errorMessage = error.message;
        if (errorMessage.includes('SAFETY')) {
            errorMessage = "The request was blocked due to safety settings. Please try a different image or description.";
        }
    }
    throw new Error(errorMessage);
  }
};
