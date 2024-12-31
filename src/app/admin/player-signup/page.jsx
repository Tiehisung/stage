import Image from "next/image";
import playerImage from "@/public/images/breakfast2.jpg";
import PlayerProfileForm from "./Forms";

export default function AdminPlayer() {
  return (
    <div className="pb-5">
      <div className="flex max-md:flex-wrap gap-2 md:gap-5 items-center">
        <Image
          src={playerImage}
          width={300}
          height={300}
          alt="desc image"
          className="max-md:w-full"
        />
        <p className=" font-bold text-2xl md:text-4xl ">
          Sign up a new player into KonjiehiFC
        </p>
      </div>

      <PlayerProfileForm isEditing={false} />
    </div>
  );
}
