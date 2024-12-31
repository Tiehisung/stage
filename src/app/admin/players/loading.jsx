import LoadingSpinner from "@/components/loading/icon-loaders";

export default function Loading(){
    return (
      <LoadingSpinner
        message="Loading players..."
        loaderNumber={1}
        iconStyle={"text-3xl"}
        contStyle="flex flex-col justify-center items-center h-full text-teal-400"
      />
    );
}