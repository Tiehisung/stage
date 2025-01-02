import PlayerProfileForm from "./Forms";

export default function AdminPlayer() {
  return (
    <div className="pb-5">
      <div className="flex max-md:flex-wrap gap-2 md:gap-5 items-center p-4">
        <h1 className=" font-bold text-2xl md:text-4xl ">
          Sign up a new player for KonjiehiFC
        </h1>
      </div>

      <PlayerProfileForm />
    </div>
  );
}
