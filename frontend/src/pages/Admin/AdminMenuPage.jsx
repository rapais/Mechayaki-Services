import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { menuItemsApi } from "../../api/menuItems.api.js";
import { useMenuItems } from "../../features/menuItems/useMenuItems.js";

const CATEGORIES = ["Beverages", "Dessert", "Main Dish", "Snacks"];

function asInt(v) {
  const n = Number(String(v).replace(/[^\d]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export default function AdminMenuPage() {
  const qc = useQueryClient();
  const menu = useMenuItems(false); // admin sees ALL including inactive

  // Create form
  const [name, setName] = useState("");
  const [price, setPrice] = useState("7");
  const [category, setCategory] = useState("Beverages");
  const [spicy, setSpicy] = useState("0");
  const [imagePath, setImagePath] = useState("");
  const [active, setActive] = useState(true);

  // Edit state
  const [editId, setEditId] = useState(null);
  const [edit, setEdit] = useState({
    name: "",
    price: "7",
    category: "Beverages",
    spicy: "0",
    imagePath: "",
    active: true,
  });

  const [busyId, setBusyId] = useState(null);
  const [err, setErr] = useState("");

  const refresh = async () => {
    await qc.invalidateQueries({ queryKey: ["menu-items"] });
  };

  const list = useMemo(() => {
    const data = menu.data || [];
    return [...data].sort((a, b) => (a.id || 0) - (b.id || 0));
  }, [menu.data]);

  const startEdit = (m) => {
    setEditId(m.id);
    setEdit({
      name: m.name || "",
      price: String(m.price ?? 7),
      category: m.category || "Beverages",
      spicy: String(m.spicy ?? 0),
      imagePath: m.imagePath || "",
      active: !!m.active,
    });
    setErr("");
  };

  const cancelEdit = () => {
    setEditId(null);
    setErr("");
  };

  const create = async () => {
    setErr("");
    const payload = {
      name: name.trim(),
      price: asInt(price),
      category,
      spicy: asInt(spicy),
      imagePath: imagePath.trim() || null,
      active,
    };

    if (!payload.name) return setErr("Name is required");
    if (!payload.category) return setErr("Category is required");
    if (!payload.price || payload.price <= 0) return setErr("Price must be > 0");

    try {
      await menuItemsApi.create(payload);
      setName("");
      setPrice("7");
      setSpicy("0");
      setImagePath("");
      setActive(true);
      await refresh();
    } catch (e) {
      setErr(e?.response?.data?.message || "Create failed");
    }
  };

  const save = async (id) => {
    setErr("");
    setBusyId(id);
    const payload = {
      name: edit.name.trim(),
      price: asInt(edit.price),
      category: edit.category,
      spicy: asInt(edit.spicy),
      imagePath: edit.imagePath.trim() || null,
      active: !!edit.active,
    };

    if (!payload.name) {
      setBusyId(null);
      return setErr("Name is required");
    }

    try {
      await menuItemsApi.update(id, payload);
      cancelEdit();
      await refresh();
    } catch (e) {
      setErr(e?.response?.data?.message || "Update failed");
    } finally {
      setBusyId(null);
    }
  };

  const toggleActive = async (m) => {
    setErr("");
    setBusyId(m.id);
    try {
      await menuItemsApi.update(m.id, { active: !m.active });
      await refresh();
    } catch (e) {
      setErr(e?.response?.data?.message || "Toggle failed");
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (id) => {
    setErr("");
    const ok = confirm("Delete this menu item?");
    if (!ok) return;

    setBusyId(id);
    try {
      await menuItemsApi.remove(id);
      await refresh();
    } catch (e) {
      setErr(e?.response?.data?.message || "Delete failed");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="adminGrid">
      <div>
        <h1 style={{ margin: 0 }}>Menu Management</h1>
        <p style={{ margin: "6px 0 0", color: "var(--muted)", fontWeight: 800 }}>
          Create / update menu items shown on Tablet + Public pages.
        </p>
      </div>

      <div className="adminCard" style={{ padding: 16 }}>
        <h2 style={{ margin: 0, marginBottom: 12 }}>Add Menu Item</h2>

        <div style={{ display: "grid", gap: 10 }}>
          <div style={{ display: "grid", gap: 8, gridTemplateColumns: "2fr 1fr" }}>
            <input
              className="adminInput"
              placeholder="Item name (e.g., Matcha Kaze)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="adminInput"
              placeholder="Price (RM)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div style={{ display: "grid", gap: 8, gridTemplateColumns: "1fr 1fr 1fr" }}>
            <select className="adminInput" value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <input
              className="adminInput"
              placeholder="Spicy level (0-3)"
              value={spicy}
              onChange={(e) => setSpicy(e.target.value)}
            />

            <label
              className="adminInput"
              style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", userSelect: "none" }}
            >

              <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
              Active
            </label>
          </div>

          <input
            className="adminInput"
            placeholder='Image path in /public (e.g., /images/menu-images/Matcha.png)'
            value={imagePath}
            onChange={(e) => setImagePath(e.target.value)}
          />

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button className="adminBtn adminBtnPrimary" onClick={create} type="button">
              Add Item
            </button>
            <button className="adminBtn adminBtnSoft" onClick={refresh} type="button">
              Refresh
            </button>
            {err && <div style={{ color: "#b02a37", fontWeight: 900 }}>{err}</div>}
          </div>
        </div>
      </div>

      <div className="adminCard" style={{ padding: 16 }}>
        <h2 style={{ margin: 0, marginBottom: 12 }}>All Menu Items</h2>

        {menu.isLoading && <div>Loading…</div>}
        {menu.isError && <div style={{ color: "#b02a37", fontWeight: 900 }}>Failed to load menu items</div>}

        {!menu.isLoading && list.length === 0 && <div>No menu items yet.</div>}

        {list.length > 0 && (
          <div style={{ overflowX: "auto" }}>
            <table className="adminTable" cellPadding="10" style={{ width: "100%", borderCollapse: "separate" }}>
              <thead>
                <tr>
                  <th align="left">ID</th>
                  <th align="left">Name</th>
                  <th align="left">Category</th>
                  <th align="left">Price</th>
                  <th align="left">Spicy</th>
                  <th align="left">Active</th>
                  <th align="left">Image</th>
                  <th align="left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {list.map((m) => (
                  <tr key={m.id}>
                    <td>{m.id}</td>

                    <td>
                      {editId === m.id ? (
                        <input
                          className="adminInput"
                          value={edit.name}
                          onChange={(e) => setEdit((x) => ({ ...x, name: e.target.value }))}
                        />
                      ) : (
                        <b>{m.name}</b>
                      )}
                    </td>

                    <td>
                      {editId === m.id ? (
                        <select
                          className="adminInput"
                          value={edit.category}
                          onChange={(e) => setEdit((x) => ({ ...x, category: e.target.value }))}
                        >
                          {CATEGORIES.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      ) : (
                        m.category
                      )}
                    </td>

                    <td>
                      {editId === m.id ? (
                        <input
                          className="adminInput"
                          value={edit.price}
                          onChange={(e) => setEdit((x) => ({ ...x, price: e.target.value }))}
                        />
                      ) : (
                        `RM ${m.price}`
                      )}
                    </td>

                    <td>
                      {editId === m.id ? (
                        <input
                          className="adminInput"
                          value={edit.spicy}
                          onChange={(e) => setEdit((x) => ({ ...x, spicy: e.target.value }))}
                        />
                      ) : (
                        m.spicy ?? 0
                      )}
                    </td>

                    <td>
                      {editId === m.id ? (
                        <label style={{ display: "flex", gap: 10, alignItems: "center" }}>
                          <input
                            type="checkbox"
                            checked={!!edit.active}
                            onChange={(e) => setEdit((x) => ({ ...x, active: e.target.checked }))}
                          />
                          Active
                        </label>
                      ) : (
                        m.active ? "Yes" : "No"
                      )}
                    </td>

                    <td style={{ maxWidth: 260 }}>
                      {editId === m.id ? (
                        <input
                          className="adminInput"
                          value={edit.imagePath}
                          onChange={(e) => setEdit((x) => ({ ...x, imagePath: e.target.value }))}
                        />
                      ) : m.imagePath ? (
                        <img
                          className="adminImgThumb"
                          src={m.imagePath}
                          alt={m.name}
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (

                        <span style={{ color: "var(--muted)", fontWeight: 800 }}>—</span>
                      )}
                    </td>

                    <td>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <button
                          className="adminBtn adminBtnSoft"
                          onClick={() => toggleActive(m)}
                          disabled={busyId === m.id}
                          type="button"
                        >
                          {busyId === m.id ? "..." : m.active ? "Disable" : "Enable"}
                        </button>

                        {editId === m.id ? (
                          <>
                            <button
                              className="adminBtn adminBtnPrimary"
                              onClick={() => save(m.id)}
                              disabled={busyId === m.id}
                              type="button"
                            >
                              Save
                            </button>
                            <button className="adminBtn" onClick={cancelEdit} type="button">
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button className="adminBtn adminBtnSoft" onClick={() => startEdit(m)} type="button">
                            Edit
                          </button>
                        )}

                        <button
                          className="adminBtn adminBtnDelete"
                          onClick={() => remove(m.id)}
                          disabled={busyId === m.id}
                          type="button"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
