import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { authApi } from "../../api/auth.api";
import { setUser } from "../../auth/auth.store";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const defaultValues = useMemo(() => ({ email: "", password: "" }), []);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema), defaultValues });

  async function onSubmit(values) {
    setServerError("");
    try {
      const user = await authApi.login(values);
      // user = { id, name, email, role }
      setUser(user);
      navigate("/admin", { replace: true });
    } catch (err) {
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Login failed. Check your credentials.";
      setServerError(msg);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", padding: 24, border: "1px solid #eee", borderRadius: 8 }}>
      <h1 style={{ marginBottom: 16 }}>Admin Login</h1>

      {serverError && (
        <div style={{ background: "#ffecec", border: "1px solid #ffb3b3", padding: 12, borderRadius: 6, marginBottom: 12 }}>
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "grid", gap: 12 }}>
        <div>
          <label>Email</label>
          <input
            {...register("email")}
            placeholder="admin@mechayaki.com"
            style={{ width: "100%", padding: 10, border: "1px solid #ddd", borderRadius: 6 }}
          />
          {errors.email && <small style={{ color: "crimson" }}>{errors.email.message}</small>}
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            {...register("password")}
            placeholder="••••••••"
            style={{ width: "100%", padding: 10, border: "1px solid #ddd", borderRadius: 6 }}
          />
          {errors.password && <small style={{ color: "crimson" }}>{errors.password.message}</small>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{ padding: 10, borderRadius: 6, border: "1px solid #111", background: "#111", color: "#fff" }}
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>

        <small style={{ color: "#666" }}>
          Note: current backend returns user profile only (no token yet).
        </small>
      </form>
    </div>
  );
}
