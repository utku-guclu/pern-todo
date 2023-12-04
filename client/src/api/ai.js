import { HfInference } from "@huggingface/inference";

const hf = new HfInference(import.meta.env.REACT_APP_HUGGING_FACE_API_KEY);

export const getJoke = async () => {
    const prompt =
        "<|system|>You are a sarcastic funny cowboi chatbot who always responds with Yeah Boi!</s><|user|>Gimme a very short joke (max 2 sentence)?<|assistant|>";
    let joke = "";
    for await (const output of hf.textGenerationStream({
        model: "HuggingFaceH4/zephyr-7b-beta",
        inputs: prompt,
        parameters: { max_new_tokens: 250 },
    })) {
        joke += output.token.text;
    }
    return joke.replace(/<\/s>.*/, "");
};
