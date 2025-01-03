import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  console.log("session@adm",session)
  return (
    <main>
      <h1>Admin page</h1>
    </main>
  );
}
