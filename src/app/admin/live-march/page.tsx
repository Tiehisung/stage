import { FaEdit } from "react-icons/fa";
import { ScrollToPointBtn } from "@/components/ScrollToPoint";
import { CgPerformance } from "react-icons/cg";
import { FcGallery } from "react-icons/fc";
import PlayerActivation from "./Activation";
import Performance from "./Performance";
import UpdatePlayerFitness from "./FitnessUpdate";
import { GiHealthNormal, GiPresent } from "react-icons/gi";
import { GetPlayers } from "../page";
import { RiDeleteBin2Line } from "react-icons/ri";
import DeletePlayer from "./DeletePlayer";
import CardAndFit from "./CardAndFit";
import PlayerProfileForm from "../../player-signing/Forms";
import UpdatePlayerGallery, { PlayerGalleriesAdm } from "./GalleryForm";

export default async function PlayerProfilePage({ params }:{params:{playerId:string}}) {
  const playerId = params.playerId;
  const player = await GetPlayers(playerId);

  return (
    <main className="relative bg-cover  ">
      {/* Cover image  */}

      <div
        className="h-full w-full rounded-t-md z-[-1] fixed inset-0 bottom-0 bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${player?.image?.secure_url})` }}
      ></div>

      {/*Nav Scroll controllers */}
      <div className="bg-[#000000ac] text-white w-full px-1 flex gap-2 overflow-x-auto sticky z-10 top-0 hidden__scrollbar">
        <ScrollToPointBtn
          sectionId={"edit-player"}
          className="flex gap-1 items-center shadow p-1 hover:text-blue-400 transition-transform"
          label={"Edit"}
        >
          <FaEdit />
        </ScrollToPointBtn>

        <ScrollToPointBtn
          sectionId={"player-performance"}
          className="flex gap-1 items-center shadow p-1 hover:text-blue-400 transition-transform"
          label={"Performance"}
        >
          <CgPerformance />
        </ScrollToPointBtn>

        <ScrollToPointBtn
          sectionId={"fitness-update"}
          className="flex gap-1 items-center shadow p-1 hover:text-blue-400 transition-transform"
          label={"Fitness"}
        >
          <GiHealthNormal />
        </ScrollToPointBtn>

        <ScrollToPointBtn
          sectionId={"gallery"}
          className="flex gap-1 items-center shadow p-1 hover:text-blue-400 transition-transform"
          label={"Gallery"}
        >
          <FcGallery />
        </ScrollToPointBtn>

        <ScrollToPointBtn
          sectionId={"activate-player"}
          className="flex gap-1 items-center shadow p-1 hover:text-blue-400 transition-transform"
          label={player?.isActive ? "Deactivate" : "Activate"}
        >
          <GiPresent />
        </ScrollToPointBtn>

        <ScrollToPointBtn
          sectionId={"delete-player"}
          className="flex gap-1 items-center shadow p-1 hover:text-blue-400 transition-transform"
          label={"Delete"}
        >
          <RiDeleteBin2Line />
        </ScrollToPointBtn>
      </div>

      {/* Sections */}
      <ul className="space-y-36 px-[2vw] pb-24 pt-7">
        <li className="">
          <CardAndFit player={player} />
        </li>

        {/* Fitness */}
        <li id="fitness-update" className="my-9 bg-arsh px-[1vw]">
          <h1 className="__h1 mt-3 text-[#f7bd53] __gradient1">
            Fitness updates
          </h1>
          <p className=" __h2 font-light ">
            <small>[{player?.firstName + " " + player?.lastName}]</small>
            {player?.medicals?.pop()?.fitness}
          </p>
          <br />
          <br />
          <UpdatePlayerFitness playerId={playerId} />
        </li>

        {/* Performance stats */}
        <li id="player-performance" className="space-y-3">
          <br />

          <h1 className="__h1 mt-3 text-[#f7bd53] __gradient1">
            Performance statistics updates
          </h1>

          <Performance playerId={playerId} />
        </li>

        <li id="edit-player">
          <br />

          <div className="pb-5">
            <p className="__h1 mt-3 text-[#f7bd53] __gradient1">
              Editable form
            </p>

            <PlayerProfileForm player={player} />
          </div>
        </li>

        {/* Scenes and moments */}
        <li id="gallery">
          <br />
          <p className="__h1 mt-3 text-[#f7bd53] __gradient1">
            Electric moments and scenes
          </p>
          <PlayerGalleriesAdm player={player} />
          <UpdatePlayerGallery
            player={player}
            folder={
              `players/${new Date().getFullYear()}/${player?.firstName}_${player?.lastName}`
            }
          />
        </li>

        {/* Activate */}
        <li id="activate-player">
          <br />

          <h1 className="__h1 mt-3 text-[#f7bd53] __gradient1">
            Player activation
          </h1>
          <PlayerActivation playerId={playerId} isActive={player?.isActive} />
        </li>

        {/* Delete */}
        <li id="delete-player">
          <br />
          <h1 className="__h1 text-red-800 __gradient1">
            Delete {player?.firstName}
          </h1>
          <DeletePlayer playerId={playerId} />
        </li>
      </ul>
    </main>
  );
}
