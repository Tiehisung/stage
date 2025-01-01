import { IMatchProps } from "@/components/fixturesAndResults";
import { teamKFC } from "@/data/teams";

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

export const getTeams = (match: IMatchProps) => ({
  home: match?.isHome ? teamKFC : match?.oponent,
  away: match?.isHome ? match?.oponent : teamKFC,
});
