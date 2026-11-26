// shared/ui/avatarPresets.ts — built-in illustrated avatars for users without
// a photo. Simple generated SVGs (no image files), returned as data URIs.

type Preset = { id: string; label: string; bg: string; skin: string; hair: string; shirt: string; style: "short" | "long" | "bun" | "bald" };

const PRESETS: Preset[] = [
	{ id: "a1", label: "Short dark hair, green background", bg: "#dcfce7", skin: "#f1c27d", hair: "#3b2a1a", shirt: "#16a34a", style: "short" },
	{ id: "a2", label: "Short black hair, blue background", bg: "#dbeafe", skin: "#8d5524", hair: "#111827", shirt: "#2563eb", style: "short" },
	{ id: "a3", label: "Long brown hair, amber background", bg: "#fef3c7", skin: "#ffdbac", hair: "#7c4a1e", shirt: "#d97706", style: "long" },
	{ id: "a4", label: "Hair bun, violet background", bg: "#ede9fe", skin: "#c68642", hair: "#1f1308", shirt: "#7c3aed", style: "bun" },
	{ id: "a5", label: "Long red hair, rose background", bg: "#ffe4e6", skin: "#f1c27d", hair: "#b45309", shirt: "#e11d48", style: "long" },
	{ id: "a6", label: "Bald, slate background", bg: "#e2e8f0", skin: "#e0ac69", hair: "#e0ac69", shirt: "#475569", style: "bald" },
	{ id: "a7", label: "Short blond hair, teal background", bg: "#ccfbf1", skin: "#ffdbac", hair: "#d4a017", shirt: "#0d9488", style: "short" },
	{ id: "a8", label: "Long black hair, sky background", bg: "#e0f2fe", skin: "#c68642", hair: "#111827", shirt: "#0284c7", style: "long" },
	{ id: "a9", label: "Hair bun, lime background", bg: "#ecfccb", skin: "#ffdbac", hair: "#5b3a1a", shirt: "#65a30d", style: "bun" },
	{ id: "a10", label: "Short gray hair, stone background", bg: "#f5f5f4", skin: "#f1c27d", hair: "#9ca3af", shirt: "#57534e", style: "short" },
	{ id: "a11", label: "Long dark hair, fuchsia background", bg: "#fae8ff", skin: "#8d5524", hair: "#1f1308", shirt: "#c026d3", style: "long" },
	{ id: "a12", label: "Bald, orange background", bg: "#ffedd5", skin: "#8d5524", hair: "#8d5524", shirt: "#ea580c", style: "bald" },
	{ id: "a13", label: "Short brown hair, indigo background", bg: "#e0e7ff", skin: "#e0ac69", hair: "#5b3a1a", shirt: "#4f46e5", style: "short" },
	{ id: "a14", label: "Hair bun, emerald background", bg: "#d1fae5", skin: "#c68642", hair: "#3b2a1a", shirt: "#059669", style: "bun" },
	{ id: "a15", label: "Long blond hair, pink background", bg: "#fce7f3", skin: "#ffdbac", hair: "#d4a017", shirt: "#db2777", style: "long" },
];

function svg(p: Preset) {
	const hair = {
		short: `<path d="M20 28c0-8 5-13 12-13s12 5 12 13c-2-4-6-6-12-6s-10 2-12 6z" fill="${p.hair}"/>`,
		long: `<path d="M18 30c0-10 6-16 14-16s14 6 14 16v14h-5V30c-2-5-5-7-9-7s-7 2-9 7v14h-5z" fill="${p.hair}"/>`,
		bun: `<circle cx="32" cy="12" r="5" fill="${p.hair}"/><path d="M20 28c0-8 5-13 12-13s12 5 12 13c-2-4-6-6-12-6s-10 2-12 6z" fill="${p.hair}"/>`,
		bald: "",
	}[p.style];
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="${p.bg}"/><path d="M12 64c0-12 9-19 20-19s20 7 20 19z" fill="${p.shirt}"/><rect x="28" y="38" width="8" height="9" fill="${p.skin}"/><circle cx="32" cy="29" r="12" fill="${p.skin}"/>${hair}<circle cx="27.5" cy="30" r="1.4" fill="#1f2937"/><circle cx="36.5" cy="30" r="1.4" fill="#1f2937"/><path d="M28.5 35c2 1.6 5 1.6 7 0" stroke="#1f2937" stroke-width="1.4" fill="none" stroke-linecap="round"/></svg>`;
}

export type AvatarPreset = { id: string; label: string; src: string };

export const AVATAR_PRESETS: AvatarPreset[] = PRESETS.map((p) => ({
	id: p.id,
	label: p.label,
	src: `data:image/svg+xml;utf8,${encodeURIComponent(svg(p))}`,
}));
