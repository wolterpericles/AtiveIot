import * as Crypto from "expo-crypto";

// Gera UUID v4 usando bytes aleatórios e formata conforme RFC 4122
export function makeUUID(): string {
  // Se a versão do expo-crypto tiver randomUUID, use direto
  // (SDKs mais novos expõem Crypto.randomUUID)
  // @ts-ignore
  if (typeof (Crypto as any).randomUUID === "function") {
    // @ts-ignore
    return (Crypto as any).randomUUID();
  }

  const bytes = Crypto.getRandomValues(new Uint8Array(16));
  // Ajusta bits para versão (4) e variante (RFC 4122)
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const toHex = (b: number) => b.toString(16).padStart(2, "0");
  const hex = Array.from(bytes, toHex).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}
