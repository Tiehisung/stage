import { IFileProps } from "@/types";
import React from "react";
import { IManager } from "../admin/leadership/page";

const PlayersPage = () => {
  return <div>PlayersPage</div>;
};

export default PlayersPage;

export type TPlayerGallery = {
  _id: string;
  date: string;
  timestamp: number;
  description: string;
  files: Array<IFileProps>;
};

export interface IPlayer {
  medicals: { fitness: string }[];
  galleries: TPlayerGallery[];
  card: "yellow" | "red";
  isFit: boolean;
  captaincy: string;
  firstName: string;
  lastName: string;
  dateSigned: string;
  phone: string;
  email: string;
  dob: string;
  height: string;
  _id: string;
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
