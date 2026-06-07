import { useState } from "react";
import { updateMe } from "../api/auth";
import { useAuth } from "../hooks/useAuth";

export default function ProfilePage() {
  const { user, refreshUser, logout } = useAuth();

  const [form, setForm] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    username: user?.username || "",
    profile: {
      display_name: user?.profile?.display_name || "",
      bio: user?.profile?.bio || "",
    },
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleChange(key, value) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function handleProfileChange(key, value) {
    setForm((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [key]: value,
      },
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    try {
      await updateMe(form);
      await refreshUser();
      setMessage("Profile updated successfully.");
    } catch (err) {
      setError("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-violet-400">
            FlowTerp Profile
          </p>
          <h1 className="text-3xl font-semibold text-white md:text-4xl">
            Your Profile
          </h1>
          <p className="mt-3 text-zinc-400">
            Manage your account details and creator identity.
          </p>
        </div>

        <button
          type="button"
          onClick={logout}
          className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:bg-white/5"
        >
          Log out
        </button>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <div className="mb-6">
          <p className="text-sm text-zinc-400">Signed in as</p>
          <p className="mt-1 text-lg font-medium text-white">{user?.email}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                First name
              </label>
              <input
                type="text"
                value={form.first_name}
                onChange={(e) => handleChange("first_name", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-violet-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Last name
              </label>
              <input
                type="text"
                value={form.last_name}
                onChange={(e) => handleChange("last_name", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-violet-400"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Username
            </label>
            <input
              type="text"
              value={form.username}
              onChange={(e) => handleChange("username", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-violet-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Display name
            </label>
            <input
              type="text"
              value={form.profile.display_name}
              onChange={(e) => handleProfileChange("display_name", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-violet-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Bio
            </label>
            <textarea
              rows={4}
              value={form.profile.bio}
              onChange={(e) => handleProfileChange("bio", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-violet-400"
            />
          </div>

          {message ? <p className="text-sm text-emerald-400">{message}</p> : null}
          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-violet-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-violet-400 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
        </form>
      </div>
    </main>
  );
}