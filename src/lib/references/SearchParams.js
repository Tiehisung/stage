const updateSearchParams = (model, manufacturer) => {
  const searchParams = new URLSearchParams(window.location.search);
  if (model) {
    searchParams.set("model", model);
  } else {
    searchParams.delete("model");
  }

  if (manufacturer) {
    searchParams.set("manufacturer", manufacturer);
  } else {
    searchParams.delete("manufacturer");
  }
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  console.log(newPathname);
  // router.push(newPathname);
};

 //Obtain facility name from searchParams
  // const [facilityName, setFacilityName] = useState("");
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const searchParams = new URLSearchParams(window.location.search);
  //     setFacilityName(searchParams.get("name"));
  //   }
  // }, []);
