import debug from "debug";
import download from "download";
import Replicate from "replicate";

export const generateImage = async (
  source: any,
  target: any,
  username: string
) => {
  const log = debug("workflow");

  const replicateAPIKey = process.env.REPLICATE_API_TOKEN as string;
  if (!replicateAPIKey) {
    throw new Error("REPLICATE_API_KEY is not set");
  }
  console.log("inside generateImage: ");

  log("Replicate API key found");

  const replicate = new Replicate({
    auth: replicateAPIKey,
  });

  log(`source and target running`);

  const mimeType = "image/png";

  log("Running faceswap...");

  const swappedUrl = (await replicate.run(
    "lucataco/faceswap:9a4298548422074c3f57258c5d544497314ae4112df80d116f0d2109e843d20d",
    {
      input: {
        target_image: `data:${mimeType};base64,${target}`,
        swap_image: `data:${mimeType};base64,${source}`,
      },
    }
  )) as unknown as string;
  log("Faceswap run complete");
  console.log("Faceswap run complete");

  const swappedFilename = `${username}.png`;
  const dlDir = "./public/generated";
  console.log("dl: ", swappedFilename, dlDir);
  await download(swappedUrl, dlDir, { filename: swappedFilename });

  console.log("swappedUrl: ", swappedUrl);
  log(`File ${swappedFilename} downloaded`);
  return swappedUrl;
};
