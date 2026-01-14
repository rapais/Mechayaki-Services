import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { authApi } from "../../api/auth.api";
import { setAuthUser } from "../../auth/auth.store";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

const registerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Min 6 characters"),
  role: z.enum(["ADMIN", "VENDOR", "CUSTOMER"]).default("ADMIN"),
});

export default function AdminLoginPage() {
  const nav = useNavigate();
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [serverMsg, setServerMsg] = useState({ type: "", text: "" });

  const schema = useMemo(() => (mode === "login" ? loginSchema : registerSchema), [mode]);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues:
      mode === "login"
        ? { email: "", password: "" }
        : { name: "", email: "", password: "", role: "ADMIN" },
  });

  // When switching modes, reset fields so the resolver matches fields
  const switchMode = (next) => {
    setServerMsg({ type: "", text: "" });
    setMode(next);
    if (next === "login") form.reset({ email: "", password: "" });
    else form.reset({ name: "", email: "", password: "", role: "ADMIN" });
  };

  const onSubmit = async (values) => {
    setServerMsg({ type: "", text: "" });
    try {
      if (mode === "register") {
        const created = await authApi.register(values); // returns AuthResponse
        setServerMsg({ type: "ok", text: `Registered: ${created.email} (${created.role}). Now login.` });
        switchMode("login");
        form.reset({ email: values.email, password: values.password });
        return;
      }

      const user = await authApi.login(values);
      setAuthUser(user);
      nav("/admin", { replace: true });
    } catch (err) {
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Request failed. Check backend logs / credentials.";
      setServerMsg({ type: "err", text: msg });
    }
  };

  return (
    <div style={{ maxWidth: 460, margin: "60px auto", padding: 24, border: "1px solid #eee", borderRadius: 10 }}>
      <h1 style={{ marginBottom: 6 }}>Admin Access</h1>
      <p style={{ marginTop: 0, color: "#666" }}>Register an admin once, then login.</p>

      <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
        <button
          onClick={() => switchMode("login")}
          style={{
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #ddd",
            background: mode === "login" ? "#111" : "white",
            color: mode === "login" ? "white" : "#111",
            fontWeight: 800,
            cursor: "pointer",
          }}
          type="button"
        >
          Login
        </button>

        <button
          onClick={() => switchMode("register")}
          style={{
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #ddd",
            background: mode === "register" ? "#111" : "white",
            color: mode === "register" ? "white" : "#111",
            fontWeight: 800,
            cursor: "pointer",
          }}
          type="button"
        >
          Register Admin
        </button>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} style={{ display: "grid", gap: 12, marginTop: 16 }}>
        {mode === "register" && (
          <>
            <div style={{ display: "grid", gap: 6 }}>
              <label>Name</label>
              <input
                {...form.register("name")}
                placeholder="Admin Name"
                style={{ padding: 10, border: "1px solid #ddd", borderRadius: 8 }}
              />
              {form.formState.errors.name && <small style={{ color: "crimson" }}>{form.formState.errors.name.message}</small>}
            </div>

            <div style={{ display: "grid", gap: 6 }}>
              <label>Role</label>
              <select {...form.register("role")} style={{ padding: 10, border: "1px solid #ddd", borderRadius: 8 }}>
                <option value="ADMIN">ADMIN</option>
                <option value="VENDOR">VENDOR</option>
                <option value="CUSTOMER">CUSTOMER</option>
              </select>
              {form.formState.errors.role && <small style={{ color: "crimson" }}>{form.formState.errors.role.message}</small>}
            </div>
          </>
        )}

        <div style={{ display: "grid", gap: 6 }}>
          <label>Email</label>
          <input
            type="email"
            {...form.register("email")}
            placeholder="admin@mechayaki.com"
            style={{ padding: 10, border: "1px solid #ddd", borderRadius: 8 }}
          />
          {form.formState.errors.email && <small style={{ color: "crimson" }}>{form.formState.errors.email.message}</small>}
        </div>

        <div style={{ display: "grid", gap: 6 }}>
          <label>Password</label>
          <input
            type="password"
            {...form.register("password")}
            placeholder="••••••••"
            style={{ padding: 10, border: "1px solid #ddd", borderRadius: 8 }}
          />
          {form.formState.errors.password && <small style={{ color: "crimson" }}>{form.formState.errors.password.message}</small>}
        </div>

        {serverMsg.text && (
          <div
            style={{
              background: serverMsg.type === "ok" ? "#f2fff5" : "#fff5f5",
              border: `1px solid ${serverMsg.type === "ok" ? "#c8f2d0" : "#ffd6d6"}`,
              padding: 10,
              borderRadius: 8,
              color: serverMsg.type === "ok" ? "#156a2a" : "crimson",
            }}
          >
            {serverMsg.text}
          </div>
        )}

        <button
          type="submit"
          disabled={form.formState.isSubmitting}
          style={{ padding: 12, borderRadius: 8, border: "none", cursor: "pointer", background: "#111", color: "white", fontWeight: 900 }}
        >
          {form.formState.isSubmitting ? "Working..." : mode === "login" ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
}
