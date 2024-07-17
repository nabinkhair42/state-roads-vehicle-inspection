import DataUriParser from "datauri/parser";
import path from "path";

const getDataUri = (file: Express.Multer.File) => {
  if (!file || !file.originalname || !file.buffer) {
    throw new Error(
      "Invalid file object. Expected properties: originalname, buffer."
    );
  }

  const parser = new DataUriParser();
  const extName = path.extname(file.originalname);

  if (!extName) {
    throw new Error("Invalid file extension.");
  }

  // `parser.format` returns an object. Access `.content` for the Data URI.
  const result = parser.format(extName, file.buffer);

  if (!result || !result.content) {
    throw new Error("Failed to generate Data URI.");
  }

  return {
    fileName: file.originalname,
    content: result.content,
  };
};

export default getDataUri;
