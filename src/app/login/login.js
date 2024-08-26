"use server";

// import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/app/utils/supabase/server";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

export async function login(formData) {
  const rawLoginData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { data: loginData, error: validateLoginError } =
    loginSchema.safeParse(rawLoginData);

  if (validateLoginError) {
    return { error: "Los datos ingresados no se pudieron validar." };
  }

  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword(loginData);

  if (error) {
    console.error("Error durante el login:", error.message);
    return { error: "Email y/o contraseñas incorrectos." };
  }

  // revalidatePath("/", "layout");
  redirect("/dashboard");
}
