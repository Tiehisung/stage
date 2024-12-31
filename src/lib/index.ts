export function getErrorMessage(
  error: unknown,
  customMessage?: string
): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  if (error && typeof error === "object" && "message" in error) {
    return (error as { message: string }).message;
  }

  return customMessage ?? "Error occurred!";
}
export const getFilePath = (file: File) => URL.createObjectURL(file);
