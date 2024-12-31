import LoadingSpinner from "@/components/loading/icon-loaders";

export default function LoadingMessages() {
  return (
    <LoadingSpinner
      message="Loading messages..."
      loaderNumber={1}
      iconStyle={"text-4xl"}
      contStyle="flex flex-col justify-center items-center h-full text-teal-400"
    />
  );
}
