import { get as getEnv } from 'env-var';

const config = {
  huggingFaceAPIKey: getEnv("HUGGING_FACE_API_KEY").required().asString(),
}

export default config;
