// Single source of truth for the component docs.
// The sidebar, the /components overview, the header search, prev/next links
// and generateStaticParams all read from this list. To document a new
// component: add an entry here (with its category), then a matching doc in
// ../_docs/index.ts. (Data only: no JSX, so client components can import it.)

/** Sidebar / overview groups, in display order. */
export const CATEGORIES = [
	"Foundations",
	"Actions",
	"Forms",
	"Navigation",
	"Data Display",
	"Feedback",
	"Overlays",
] as const;

export type ComponentCategory = (typeof CATEGORIES)[number];

/** "Data Display" → "data-display", for overview section anchors. */
export const categorySlug = (category: ComponentCategory) => category.toLowerCase().replace(/\s+/g, "-");

export type RegistryEntry = {
	slug: string;
	title: string;
	category: ComponentCategory;
	description: string;
	/** Extra words the header search matches (synonyms, related terms). */
	keywords?: string[];
	/** Path to the implementation, shown on the doc page. */
	source: string;
};

const entries: RegistryEntry[] = [
	{
		slug: "header",
		title: "Header",
		category: "Navigation",
		description: "Page header with title, breadcrumb, notifications and the user menu.",
		keywords: ["navbar", "top bar", "notifications", "bell", "user menu"],
		source: "shared/ui/AppHeader.tsx",
	},
	{
		slug: "breadcrumb",
		title: "Breadcrumb",
		category: "Navigation",
		description: "Home › Parent › Section › Current page.",
		keywords: ["trail", "path"],
		source: "shared/ui/Breadcrumb.tsx",
	},
	{
		slug: "meta-bar",
		title: "Meta Bar",
		category: "Data Display",
		description: "A row of short facts about a record, separated by dividers.",
		keywords: ["metadata", "dates", "status"],
		source: "shared/ui/MetaBar.tsx",
	},
	{
		slug: "profile-card",
		title: "Profile Card",
		category: "Navigation",
		description: "Signed-in user's profile summary and account actions.",
		keywords: ["account", "user menu", "sign out", "logout", "change password"],
		source: "shared/ui/ProfileCard.tsx",
	},
	{
		slug: "profile-settings",
		title: "Profile Settings",
		category: "Navigation",
		description: "Profile page building blocks: banner, section nav, field sections and an avatar picker.",
		keywords: ["account", "settings", "avatar", "upload photo", "profile page", "user details"],
		source: "shared/ui/ProfileSettings.tsx",
	},
	{
		slug: "tabs",
		title: "Tabs",
		category: "Navigation",
		description: "Switch between views, in plain, track and dark styles.",
		keywords: ["segmented", "switch", "tab navigation"],
		source: "shared/ui/Tabs.tsx",
	},
	{
		slug: "pagination",
		title: "Pagination",
		category: "Navigation",
		description: "Page size, record range and page buttons for tables and lists.",
		keywords: ["pager", "page size", "records"],
		source: "shared/ui/Pagination.tsx",
	},
	{
		slug: "table",
		title: "Table",
		category: "Data Display",
		description: "Column-driven data table with formatted cells, selection, loading and empty states.",
		keywords: ["data grid", "datatable", "list", "rows", "columns", "amount", "peso"],
		source: "shared/ui/Table.tsx",
	},
	{
		slug: "status-badge",
		title: "Status Badge",
		category: "Data Display",
		description: "Business statuses mapped to colors: 21 statuses in 5 categories.",
		keywords: ["paid", "overdue", "pending", "approved", "rejected", "cancelled", "draft", "status"],
		source: "shared/ui/StatusBadge.tsx",
	},
	{
		slug: "approval-stage",
		title: "Approval Stage",
		category: "Data Display",
		description: "Where a record is in an approval chain (AO → UM → AM → RD).",
		keywords: ["workflow", "approver", "approval chain"],
		source: "shared/ui/ApprovalStage.tsx",
	},
	{
		slug: "avatar",
		title: "Avatar",
		category: "Data Display",
		description: "Initials avatar and the client-with-avatar cell.",
		keywords: ["initials", "client", "user", "profile picture"],
		source: "shared/ui/Avatar.tsx",
	},
	{
		slug: "readiness",
		title: "Readiness",
		category: "Data Display",
		description: "Labelled completion bar, from Not Ready to Ready.",
		keywords: ["progress bar", "percentage", "completion"],
		source: "shared/ui/Readiness.tsx",
	},
	{
		slug: "draggable-card",
		title: "Draggable Card",
		category: "Data Display",
		description: "Cards you can reorder by dragging, such as approval steps, with keyboard and touch support.",
		keywords: ["drag and drop", "sortable", "reorder", "kanban", "approval steps", "workflow", "dnd"],
		source: "shared/ui/DraggableCard.tsx",
	},
	{
		slug: "empty-state",
		title: "Empty State",
		category: "Data Display",
		description: "Illustration and message for when there's nothing to show.",
		keywords: ["no data", "no results", "blank"],
		source: "shared/ui/EmptyState.tsx",
	},
	{
		slug: "alert-dialog",
		title: "Alert Dialog",
		category: "Overlays",
		description: "Centered status dialog for timeouts, failures and work in progress.",
		keywords: ["modal", "error", "timeout", "session expired"],
		source: "shared/ui/AlertDialog.tsx",
	},
	{
		slug: "alert-icon",
		title: "Alert Icon",
		category: "Feedback",
		description: "Tinted icon tile for warning, danger, success and info.",
		keywords: ["warning", "error", "success", "info"],
		source: "shared/ui/AlertIcon.tsx",
	},
	{
		slug: "badge",
		title: "Badge",
		category: "Data Display",
		description: "Small status pill.",
		keywords: ["pill", "tag", "chip", "label"],
		source: "shared/ui/Badge.tsx",
	},
	{
		slug: "callout",
		title: "Callout",
		category: "Feedback",
		description: "Tinted notice box for consequences and context.",
		keywords: ["alert", "notice", "banner", "info box"],
		source: "shared/ui/Callout.tsx",
	},
	{
		slug: "check-indicator",
		title: "Check Indicator",
		category: "Data Display",
		description: "Small check marks for completed items, in five styles.",
		keywords: ["checkmark", "done", "complete", "tick"],
		source: "shared/ui/CheckIndicator.tsx",
	},
	{
		slug: "confirm-dialog",
		title: "Confirm Dialog",
		category: "Overlays",
		description: "Asks for confirmation before a consequential action, with details, notices, remarks and async loading.",
		keywords: ["modal", "are you sure", "confirmation", "delete", "reject"],
		source: "shared/ui/ConfirmDialog.tsx",
	},
	{
		slug: "details-card",
		title: "Details Card",
		category: "Data Display",
		description: "Read-only label and value pairs, alone or grouped in a card.",
		keywords: ["review field", "key value", "summary", "read only"],
		source: "shared/ui/DetailsCard.tsx",
	},
	{
		slug: "dialog",
		title: "Dialog",
		category: "Overlays",
		description: "Modal container with title, description, close button, body and footer.",
		keywords: ["modal", "popup", "overlay"],
		source: "shared/ui/Dialog.tsx",
	},
	{
		slug: "slide-drawer",
		title: "Slide Drawer",
		category: "Overlays",
		description: "Full-height panel that slides in from the side for record details, with a pinned header and footer.",
		keywords: ["drawer", "sheet", "side panel", "slide over", "off-canvas", "details panel"],
		source: "shared/ui/SlideDrawer.tsx",
	},
	{
		slug: "stepper",
		title: "Stepper",
		category: "Navigation",
		description: "Progress through a multi-step flow.",
		keywords: ["wizard", "steps", "multi-step"],
		source: "shared/ui/Stepper.tsx",
	},
	{
		slug: "timeline",
		title: "Timeline",
		category: "Data Display",
		description: "Dated sequence of events, such as an escalation schedule.",
		keywords: ["history", "escalation", "schedule", "events"],
		source: "shared/ui/Timeline.tsx",
	},
	{
		slug: "toast",
		title: "Toast",
		category: "Feedback",
		description: "Brief, auto-dismissing notifications with a countdown bar.",
		keywords: ["notification", "snackbar", "message", "flash"],
		source: "shared/ui/ToastContainer.tsx",
	},
	{
		slug: "upload-progress",
		title: "Upload Progress",
		category: "Feedback",
		description: "Floating card for batch upload status, full or minimized.",
		keywords: ["file", "batch", "progress bar"],
		source: "shared/ui/UploadProgress.tsx",
	},
	{
		slug: "button",
		title: "Button",
		category: "Actions",
		description:
			"Triggers an action. Five variants, a destructive tone, three sizes, and optional leading or trailing icons.",
		keywords: ["cta", "action", "link button", "submit"],
		source: "shared/ui/Button.tsx",
	},
	{
		slug: "icon-button",
		title: "Icon Button",
		category: "Actions",
		description:
			"A square, icon-only button for toolbars and compact actions. Requires an accessible label.",
		keywords: ["toolbar", "icon only"],
		source: "shared/ui/Button.tsx",
	},
	{
		slug: "icons",
		title: "Icons",
		category: "Foundations",
		description:
			"The Lucide icon set with standard sizes and colors, plus a searchable browser of every icon.",
		keywords: ["lucide", "svg", "glyph"],
		source: "shared/ui/Icon.tsx",
	},
	{
		slug: "calendar",
		title: "Calendar",
		category: "Forms",
		description: "Month grid for picking a date or a date range, with month and year pickers.",
		keywords: ["date", "month", "date range", "schedule"],
		source: "shared/ui/Calendar.tsx",
	},
	{
		slug: "checkbox",
		title: "Checkbox",
		category: "Forms",
		description: "Checked / unchecked box with label, description and a “some selected” state.",
		keywords: ["tick", "select all", "terms", "consent", "multi select"],
		source: "shared/ui/Checkbox.tsx",
	},
	{
		slug: "radio-group",
		title: "Radio Group",
		category: "Forms",
		description: "Pick exactly one option from a short list.",
		keywords: ["radio", "radio button", "option", "single choice"],
		source: "shared/ui/RadioGroup.tsx",
	},
	{
		slug: "toggle",
		title: "Toggle",
		category: "Forms",
		description: "On / off switch for settings that apply immediately.",
		keywords: ["switch", "on off", "active inactive", "setting"],
		source: "shared/ui/Toggle.tsx",
	},
	{
		slug: "date-picker",
		title: "Date Picker",
		category: "Forms",
		description: "Form field that opens a calendar for a date, a date range, or a date with time.",
		keywords: ["date", "datetime", "date range", "calendar", "due date", "birthday"],
		source: "shared/ui/DatePicker.tsx",
	},
	{
		slug: "time-picker",
		title: "Time Picker",
		category: "Forms",
		description: "Hour and minute columns with AM / PM.",
		keywords: ["time", "clock", "hour", "minute", "am pm"],
		source: "shared/ui/TimePicker.tsx",
	},
	{
		slug: "input",
		title: "Input",
		category: "Forms",
		description:
			"Text and file inputs with label, helper text and error message, in default, focus, filled, disabled and destructive states.",
		keywords: ["text field", "textbox", "form", "textarea", "file upload", "label", "validation"],
		source: "shared/ui/Input.tsx",
	},
	{
		slug: "input-otp",
		title: "Input OTP",
		category: "Forms",
		description: "Boxes for one-time passwords and PINs, with auto-advance, paste and SMS autofill.",
		keywords: ["pin", "verification code", "one-time password", "2fa"],
		source: "shared/ui/OtpInput.tsx",
	},
	{
		slug: "phone-input",
		title: "Phone Input",
		category: "Forms",
		description: "Phone number with a country picker and mask. Defaults to the Philippines (+63).",
		keywords: ["mobile number", "contact number", "telephone", "+63"],
		source: "shared/ui/PhoneInput.tsx",
	},
	{
		slug: "rich-text-editor",
		title: "Rich Text Editor",
		category: "Forms",
		description: "Formatted text with font, size, bold / italic / underline / strike, lists and alignment.",
		keywords: ["wysiwyg", "editor", "formatting", "html", "remarks", "notes", "tiptap"],
		source: "shared/ui/RichTextEditor.tsx",
	},
	{
		slug: "search-input",
		title: "Search Input",
		category: "Forms",
		description: "Search box with a clear button.",
		keywords: ["filter", "find"],
		source: "shared/ui/SearchInput.tsx",
	},
	{
		slug: "theme-toggle",
		title: "Theme Toggle",
		category: "Foundations",
		description: "Light and dark mode: the toggle, and how the color tokens switch between themes.",
		keywords: ["dark mode", "light mode", "theme", "night"],
		source: "shared/ui/ThemeToggle.tsx",
	},
	{
		slug: "typography",
		title: "Typography",
		category: "Foundations",
		description:
			"Headings, paragraphs, lists and other text styles, plus the type scale and the app font.",
		keywords: ["font", "text", "heading", "inter", "type scale"],
		source: "shared/ui/Typography.tsx",
	},
];

// Sidebar order: by category, then alphabetical. Prev/next links follow it.
export const registry = [...entries].sort(
	(a, b) =>
		CATEGORIES.indexOf(a.category) - CATEGORIES.indexOf(b.category) || a.title.localeCompare(b.title),
);

/** Entries grouped by category, in display order (empty categories skipped). */
export const registryByCategory = CATEGORIES.map((category) => ({
	category,
	entries: registry.filter((e) => e.category === category),
})).filter((group) => group.entries.length > 0);

export function getEntry(slug: string) {
	return registry.find((entry) => entry.slug === slug);
}

export function getNeighbours(slug: string) {
	const index = registry.findIndex((entry) => entry.slug === slug);
	return {
		prev: index > 0 ? registry[index - 1] : undefined,
		next: index >= 0 && index < registry.length - 1 ? registry[index + 1] : undefined,
	};
}
