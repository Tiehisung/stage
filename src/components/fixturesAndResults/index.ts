import { IPlayer } from "@/app/players/page";
import { IFileProps } from "@/types/interface";

export type MatchStatus =
  | "FT" // Full Time
  | "HT" // Half Time
  | "LIVE" // Live Match
  | "SCHEDULED" //  The match is scheduled to take place in the future.
  | "POSTPONED" //  The match has been postponed to a later date.
  | "CANCELED"; //  The match has been canceled.
 
export interface IMatchProps {
  challenge?: {tag:'Weather issues'|string;  reason?:string};
  _id: string;
  title: string;
  date: string;
  time: string;
  oponent: ITeamProps;
  broadcaster?: string;
  status: MatchStatus;
  scores: { kfc: IGoal[]; oponent: IGoal[] };
  isHome:boolean
  location?:string
  
}

export interface ITeamProps {
  _id: string;
  name: string;
  alias: string;
  logo: IFileProps;
  createdAt: string;
  updatedAt: string;
}

export interface IGoal {
  _id: string;
  team: string;
  time: string;
  timestamp: number;
  player: Partial<IPlayer>;
}

 