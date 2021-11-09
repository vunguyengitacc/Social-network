enum fileTypeSize {
  KILOBYTE = 1024,
  MEGABYTE = 1024 * 1024,
  GIGABYTE = 1024 * 1024 * 1024,
}

export type fileTypeName = "MB" | "KB" | "GB";

const getSize = (file: File, type: fileTypeName): number => {
  let result: number;
  switch (type) {
    case "MB":
      result = file.size / (1024 * 1024);
      break;
    case "GB":
      result = file.size / (1024 * 1024 * 1024);
      break;
    case "KB":
      result = file.size / 1024;
      break;
    default:
      result = file.size;
      break;
  }
  return Math.round(result);
};

const getSizeDynamic = (file: File): string => {
  let size = file.size / 1024;
  if (size < fileTypeSize.MEGABYTE) return `${size} KB`;
  if (size >= fileTypeSize.MEGABYTE && size < fileTypeSize.GIGABYTE)
    return `${getSize(file, "MB")} MB`;
  if (size >= fileTypeSize.GIGABYTE) return `${getSize(file, "GB")} GB`;
  else return `${size}`;
};

export { getSize, fileTypeSize, getSizeDynamic };
