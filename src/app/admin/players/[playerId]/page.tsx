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

export default async function PlayerProfilePage({
  params,
}: {
  params: { playerId: string };
}) {
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
      <main className="space-y-36 px-[2vw] pb-24 pt-7">
        <CardAndFit player={player} />

        <UpdatePlayerFitness player={player} />

        <Performance playerId={playerId} />

        <section id="edit-player">
          <p className="_title mt-3 text-[#f7bd53] __gradient1">
            Editable form
          </p>
          <PlayerProfileForm player={player} />
        </section>

        {/* Scenes and moments */}
        <section id="gallery">
          <p className=" mt-3 text-gray-600 text-lg ">
            Electric moments and scenes
          </p>

          <div className="bg-white rounded-xl space-y-6">
            <PlayerGalleriesAdm player={player} />
            <UpdatePlayerGallery
              player={player}
              folder={`players/${new Date().getFullYear()}/${
                player?.firstName
              }_${player?.lastName}`}
            />
          </div>
        </section>

        <section>
          <h1 className="text-lg text-red-600 font-light mb-4">Danger zone</h1>
          <div className="grid items-start gap-10 md:flex flex-wrap  ">
            <PlayerActivation playerId={playerId} isActive={player?.isActive} />

            <DeletePlayer playerId={playerId} name={player?.firstName} />
          </div>
        </section>
      </main>
    </main>
  );
}
