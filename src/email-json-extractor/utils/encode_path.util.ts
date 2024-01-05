export function encodeFilePath(filePath: string) {
  return filePath.replace(/\\ /g, '%20').replace(/ /g, '%20');
}
