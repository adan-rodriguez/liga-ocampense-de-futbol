"use server";

import { createClient } from "@/app/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function logout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}

// export async function logout() {
//   const supabase = createClient();

//   // Check if a user's logged in
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (user) {
//     await supabase.auth.signOut();
//   }

//   revalidatePath("/", "layout");
//   redirect("/login");
// }
