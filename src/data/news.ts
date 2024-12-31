import {  INewsProps } from "@/app/news/page";
import _players from "./players";

const newsItems: INewsProps[] = [
  {
    _id: "1",
    headline: {
      text: "Lionel Messi Wins 8th Ballon d'Or",
      wallImage: {
        _id: "img1",
        secure_url: _players[0].avatar.secure_url,
      },
      hasVideo: true,
      sponsor: {
        name: "Adidas",
        _id: "logo1",
        secure_url: _players[1].avatar.secure_url,
      },
    },
    details: [
      {
        content:
          "Lionel Messi made history by winning his 8th Ballon d'Or in Paris.",
      },
      {
        content: {
          _id: "vid1",
          secure_url: _players[2].avatar.secure_url,
          resource_type: "video",
        },
      },
    ],
    reporter: {
      name: "John Doe",
      avatar: {
        _id: "avatar1",
        secure_url: _players[3].avatar.secure_url,
      },
    },
    createdAt: "2024-12-29T10:30:00Z",
    updatedAt: "2024-12-29T12:00:00Z",
  },
  {
    _id: "2",
    headline: {
      text: "Chelsea Announces New Manager",
      wallImage: {
        _id: "img2",
        secure_url: _players[4].avatar.secure_url,
      },
      hasVideo: false,
    },
    details: [
      {
        content:
          "Chelsea FC has officially announced their new manager, who promises a fresh start for the team.",
      },
    ],
    reporter: {
      name: "Jane Smith",
      avatar: {
        _id: "avatar2",
        secure_url: _players[5].avatar.secure_url,
      },
    },
    createdAt: "2024-12-28T09:00:00Z",
    updatedAt: "2024-12-28T10:30:00Z",
  },
  {
    _id: "3",
    headline: {
      text: "Cristiano Ronaldo Scores Record-Breaking Goal",
      wallImage: {
        _id: "img3",
        secure_url: _players[0].avatar.secure_url,
      },
      hasVideo: true,
    },
    details: [
      {
        content:
          "Cristiano Ronaldo scored his 850th career goal in a thrilling match last night.",
      },
      {
        content: {
          _id: "vid2",
          secure_url: _players[6].avatar.secure_url,
          resource_type: "video",
        },
      },
    ],
    reporter: {
      name: "Michael Brown",
      avatar: {
        _id: "avatar3",
        secure_url: _players[2].avatar.secure_url,
      },
    },
    createdAt: "2024-12-27T18:00:00Z",
    updatedAt: "2024-12-27T19:00:00Z",
  },
  {
    _id: "4",
    headline: {
      text: "Champions League Final Set",
      wallImage: {
        _id: "img4",
        secure_url: _players[4].avatar.secure_url,
      },
      hasVideo: false,
      sponsor: {
        name: "Heineken",
        _id: "logo2",
        secure_url: _players[1].avatar.secure_url,
      },
    },
    details: [
      {
        content:
          "The Champions League final will feature Manchester City and Real Madrid.",
      },
    ],
    createdAt: "2024-12-26T15:30:00Z",
    updatedAt: "2024-12-26T16:00:00Z",
  },
  {
    _id: "5",
    headline: {
      text: "New Stadium Unveiled for 2025 Season",
      wallImage: {
        _id: "img5",
        secure_url: _players[3].avatar.secure_url,
      },
      hasVideo: true,
    },
    details: [
      {
        content:
          "The state-of-the-art stadium promises to be a game changer for fans and players alike.",
      },
      {
        content: {
          _id: "vid3",
          secure_url: _players[0].avatar.secure_url,
          resource_type: "video",
        },
      },
    ],
    reporter: {
      name: "Sarah Lee",
      avatar: {
        _id: "avatar4",
        secure_url: _players[2].avatar.secure_url,
      },
    },
    createdAt: "2024-12-25T11:00:00Z",
    updatedAt: "2024-12-25T12:00:00Z",
  },
];

export default newsItems;

export const newsHeadlines = newsItems.map((n) => ({
  ...n.headline,
  _id: n._id,
}));
