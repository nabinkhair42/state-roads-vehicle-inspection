import ImageKit from "imagekit";
import ENV_CONFIG from "./env.config";

const imageKit = new ImageKit({
  publicKey: ENV_CONFIG.IMAGE_KIT_PUBLIC_KEY || "",
  privateKey: ENV_CONFIG.IMAGE_KIT_PRIVATE_KEY || "",
  urlEndpoint: ENV_CONFIG.IMAGE_KIT_ENDPOINT || "",
});

export default imageKit;
