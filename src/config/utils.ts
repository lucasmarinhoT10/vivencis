import { Buffer } from 'buffer';
import * as FileSystem from 'expo-file-system';
import pako from 'pako';

export const limitChars = (source: string, size: number) => {
  return source.trim().length > size ? source.trim().slice(0, size - 1) + "…" : source.trim();
}

export const cpfMask = (cpf: string): string =>
  cpf
    .replace(/\D/g, '') 
    .replace(/(\d{3})(\d)/, '$1.$2') 
    .replace(/(\d{3})(\d)/, '$1.$2') 
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); 
        
export const removingSpecialChars = (texto: string) =>  {
  const regex = /[^\w\s]/gi;
  const novoTexto = texto.replace(regex, '');
  return novoTexto;
}

export const bytosToMb = (bytes: number): string => (bytes / 1048576).toFixed(2);


// eslint-disable-next-line promise/param-names, @typescript-eslint/no-implied-eval
export const delay = async (ms: number) => await new Promise((res: any) => setTimeout(res, ms))

export function base64ToByteString(base64: string) {
  try {
    const buffer = Buffer.from(base64, 'base64');
    const compressed = pako.deflate(buffer);
    return Buffer.from(compressed).toString('base64');
  } catch (er) {
    console.log(er)
    return ''
  }
}

export function byteStringToBase64(byteString: string) {
  const compressedBuffer = Buffer.from(byteString, 'base64');
  const decompressed = pako.inflate(compressedBuffer);
  return Buffer.from(decompressed).toString('base64');
}

export async function uriToBase64(imageUri: string) {
  const data = await FileSystem.readAsStringAsync(imageUri, { encoding: FileSystem.EncodingType.Base64 });

  return data;
}