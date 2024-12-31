import store from "@/features/store";
import { Provider } from "react-redux";

import { ReactNode } from "react";

export default function RTKStoreProvider({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
