import { IFileProps } from "@/types";
import React from "react";

const NewsPage = () => {
  return <div>NewsPage</div>;
};

export default NewsPage;

export interface INewsProps {
  stats: {
    isTrending: boolean;isLatest:boolean
};
  _id: string;
  headline: {
    text: string;
    wallImage: Partial<IFileProps>;
    hasVideo?: boolean;
    sponsor?: Partial<IFileProps>;
  };
  details: {
    content: string | Partial<IFileProps>;
  }[];
  reporter?: {
    name: string;
    avatar: Partial<IFileProps>;
  };
  createdAt: string;
  updatedAt: string;
}
