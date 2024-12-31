import { IFileProps } from "@/types/interface";
import React from "react";
import { IManager } from "../admin/leadership/page";

const PlayersPage = () => {
  return <div>PlayersPage</div>;
};

export default PlayersPage;

export interface IPlayer {
  card: 'yellow'|'red';
  isFit: unknown;
  captaincy: string;
  firstName: string;
  lastName: string;
  _id: string;
  image: IFileProps; //To be removed later
  avatar: IFileProps;
  jersey: string | number;
  manager: IManager;
  position: TPlayerPosition;
  
}

export type TPlayerPosition =
  | "goalkeeper"
  | "defender"
  | "midfielder"
  | "forward"
  | "striker"
  | "wingBack"
  | "centerBack"
  | "attackingMidfielder"
  | "defensiveMidfielder"
  | "winger"
  | "sweeper";
