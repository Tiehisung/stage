import PlayerProfileForm from "./Forms";

export default function AdminPlayer() {
  return (
    <div className="p-5">
      <div className="flex max-md:flex-wrap gap-2 md:gap-5 items-center p-4">
        <h1 className=" font-bold text-2xl md:text-4xl uppercase ">
          KonjiehiFC player signing
        </h1>
      </div>

      <PlayerProfileForm />
    </div>
  );
}
