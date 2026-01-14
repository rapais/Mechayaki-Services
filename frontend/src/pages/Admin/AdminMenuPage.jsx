import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { stallsApi } from "../../api/stalls.api";
import { useStalls } from "../../features/stalls/useStalls";

export default function AdminMenuPage() {
  const qc = useQueryClient();
  const stalls = useStalls();

  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [busyId, setBusyId] = useState(null);
  const [err, setErr] = useState("");

  const list = useMemo(() => {
    const data = stalls.data || [];
    return [...data].sort((a, b) => a.id - b.id);
  }, [stalls.data]);

  const refresh = async () => qc.invalidateQueries({ queryKey: ["stalls"] });

  const create = async () => {
    setErr("");
    const n = name.trim();
    if (!n) return;
    try {
      await stallsApi.create({ name: n, active: true });
      setName("");
      await refresh();
    } catch (e) {
      setErr(e?.response?.data?.error || e?.response?.data?.message || "Create failed");
    }
  };

  const startEdit = (stall) => {
    setEditId(stall.id);
    setEditName(stall.name);
    setErr("");
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditName("");
    setErr("");
  };

  const saveEdit = async (id) => {
    setErr("");
    const n = editName.trim();
    if (!n) return;
    setBusyId(id);
    try {
      await stallsApi.update(id, { name: n });
      cancelEdit();
      await refresh();
    } catch (e) {
      setErr(e?.response?.data?.error || e?.response?.data?.message || "Update failed");
    } finally {
      setBusyId(null);
    }
  };

  const toggle = async (id) => {
    setErr("");
    setBusyId(id);
    try {
      await stallsApi.toggle(id);
      await refresh();
    } catch (e) {
      setErr(e?.response?.data?.error || e?.response?.data?.message || "Toggle failed");
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (id) => {
    setErr("");
    const ok = confirm("Delete this stall?");
    if (!ok) return;

    setBusyId(id);
    try {
      await stallsApi.remove(id);
      await refresh();
    } catch (e) {
      setErr(e?.response?.data?.error || e?.response?.data?.message || "Delete failed");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <h1>Manage Stalls</h1>
      <p style={{ color: "#666", marginTop: -10 }}>
        Minimal CRUD to satisfy assignment requirements under time constraints.
      </p>

      <section style={{ padding: 16, border: "1px solid #eee", borderRadius: 10, display: "grid", gap: 10 }}>
        <h2 style={{ margin: 0 }}>Create Stall</h2>
        <div style={{ display: "flex", gap: 10 }}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Stall name (e.g., Stall C)"
            style={{ flex: 1, padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
          />
          <button
            onClick={create}
            style={{ padding: "10px 14px", borderRadius: 10, border: "none", background: "#111", color: "white", fontWeight: 800 }}
          >
            Add
          </button>
        </div>
        {err && <div style={{ color: "crimson" }}>{err}</div>}
      </section>

      <section style={{ padding: 16, border: "1px solid #eee", borderRadius: 10 }}>
        <h2 style={{ marginTop: 0 }}>Stalls</h2>

        {stalls.isLoading && <p>Loading...</p>}
        {stalls.isError && <p style={{ color: "crimson" }}>Failed to load stalls</p>}

        {!stalls.isLoading && list.length === 0 && <p>No stalls yet. Create one above.</p>}

        {list.length > 0 && (
          <table cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th align="left">ID</th>
                <th align="left">Name</th>
                <th align="left">Active</th>
                <th align="left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((s) => (
                <tr key={s.id} style={{ borderTop: "1px solid #eee" }}>
                  <td>{s.id}</td>

                  <td>
                    {editId === s.id ? (
                      <input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        style={{ padding: 8, borderRadius: 10, border: "1px solid #ddd", width: "100%" }}
                      />
                    ) : (
                      s.name
                    )}
                  </td>

                  <td>{s.active ? "Yes" : "No"}</td>

                  <td style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <button
                      onClick={() => toggle(s.id)}
                      disabled={busyId === s.id}
                      style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid #ddd", background: "white", fontWeight: 700 }}
                    >
                      {busyId === s.id ? "..." : "Toggle"}
                    </button>

                    {editId === s.id ? (
                      <>
                        <button
                          onClick={() => saveEdit(s.id)}
                          disabled={busyId === s.id}
                          style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid #ddd", background: "white", fontWeight: 700 }}
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid #ddd", background: "white", fontWeight: 700 }}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => startEdit(s)}
                        style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid #ddd", background: "white", fontWeight: 700 }}
                      >
                        Edit
                      </button>
                    )}

                    <button
                      onClick={() => remove(s.id)}
                      disabled={busyId === s.id}
                      style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid #ddd", background: "white", fontWeight: 700 }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
