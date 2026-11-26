// shared/ui/RichTextEditor.tsx — formatted text input (Tiptap / ProseMirror).
// Spec: "Rich Text Editor" Figma (font, size, B / I / U / S, lists,
// alignment; default, focus and disabled states). Documented at /components/rich-text-editor.
//
//   <Field label="Remarks">
//     <RichTextEditor value={html} onChange={setHtml} />
//   </Field>
//
// The value is an HTML string. Sanitize it on the server before rendering it
// anywhere else (it's user input).
"use client";

import { useEffect, type ReactNode } from "react";
import { EditorContent, useEditor, useEditorState, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { FontFamily, FontSize, TextStyle } from "@tiptap/extension-text-style";
import { CharacterCount, Placeholder } from "@tiptap/extensions";
import {
	AlignCenter,
	AlignJustify,
	AlignLeft,
	AlignRight,
	Bold,
	ChevronDown,
	Italic,
	List,
	ListOrdered,
	Strikethrough,
	Underline,
} from "lucide-react";
import { geist, inter, poppins } from "@/shared/fonts";
import { cn } from "@/shared/lib/cn";
import { useFieldControl } from "./Field";

export type EditorFont = { label: string; value: string };

/** The app's three fonts (shared/fonts.ts) plus common system fonts. */
export const EDITOR_FONTS: EditorFont[] = [
	{ label: "Inter", value: inter.style.fontFamily },
	{ label: "Poppins", value: poppins.style.fontFamily },
	{ label: "Geist", value: geist.style.fontFamily },
	{ label: "Arial", value: "Arial, sans-serif" },
	{ label: "Georgia", value: "Georgia, serif" },
	{ label: "Courier New", value: "'Courier New', monospace" },
];

export const EDITOR_SIZES = [12, 14, 16, 18, 20, 24, 28, 32];
const DEFAULT_SIZE = 14;

export type RichTextEditorProps = {
	/** HTML. Controlled: the editor updates when this changes from outside. */
	value?: string;
	defaultValue?: string;
	onChange?: (html: string) => void;
	placeholder?: string;
	disabled?: boolean;
	invalid?: boolean;
	/** Show a character count; with a number, also a limit. */
	maxLength?: number;
	showCount?: boolean;
	/** Editing area height. */
	minHeight?: string;
	fonts?: EditorFont[];
	id?: string;
	"aria-label"?: string;
	className?: string;
};

// ── Toolbar pieces ───────────────────────────────────────────────────────────

function ToolButton({
	label,
	active,
	disabled,
	onClick,
	children,
}: {
	label: string;
	active?: boolean;
	disabled?: boolean;
	onClick: () => void;
	children: ReactNode;
}) {
	return (
		<button
			type="button"
			aria-label={label}
			title={label}
			aria-pressed={active}
			disabled={disabled}
			// Keep the selection in the editor when clicking a toolbar button.
			onMouseDown={(e) => e.preventDefault()}
			onClick={onClick}
			className={cn(
				"flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-text-700 transition-colors [&_svg]:size-4",
				"focus-visible:outline-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-50",
				active ? "bg-brand-subtle text-brand-fg" : "hover:bg-text-100",
			)}
		>
			{children}
		</button>
	);
}

function ToolSelect({
	label,
	value,
	options,
	disabled,
	onChange,
	className,
}: {
	label: string;
	value: string;
	options: { label: string; value: string }[];
	disabled?: boolean;
	onChange: (value: string) => void;
	className?: string;
}) {
	return (
		<span className={cn("relative shrink-0", className)}>
			<select
				aria-label={label}
				title={label}
				value={value}
				disabled={disabled}
				onChange={(e) => onChange(e.target.value)}
				className="h-7 w-full cursor-pointer appearance-none rounded-md border border-text-200 bg-surface pl-2 pr-7 text-xs text-text-900 outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:cursor-not-allowed"
			>
				{options.map((o) => (
					<option key={o.value} value={o.value}>
						{o.label}
					</option>
				))}
			</select>
			<ChevronDown aria-hidden className="pointer-events-none absolute right-2 top-1/2 size-3.5 -translate-y-1/2 text-text-500" />
		</span>
	);
}

const Divider = () => <span aria-hidden className="mx-1 h-5 w-px shrink-0 bg-text-200" />;

function Toolbar({ editor, fonts, disabled }: { editor: Editor; fonts: EditorFont[]; disabled: boolean }) {
	// Re-render the toolbar only when these values change, not on every keystroke.
	const state = useEditorState({
		editor,
		selector: ({ editor: e }) => ({
			font: (e.getAttributes("textStyle").fontFamily as string | undefined) ?? fonts[0].value,
			size: ((e.getAttributes("textStyle").fontSize as string | undefined) ?? `${DEFAULT_SIZE}px`).replace("px", ""),
			bold: e.isActive("bold"),
			italic: e.isActive("italic"),
			underline: e.isActive("underline"),
			strike: e.isActive("strike"),
			bullet: e.isActive("bulletList"),
			ordered: e.isActive("orderedList"),
			align: (["left", "center", "right", "justify"] as const).find((a) => e.isActive({ textAlign: a })) ?? "left",
		}),
	});
	const chain = () => editor.chain().focus();
	const fontOptions = fonts.some((f) => f.value === state.font) ? fonts : [...fonts, { label: "Custom", value: state.font }];

	return (
		<div role="toolbar" aria-label="Formatting" className="flex flex-wrap items-center gap-1 border-b border-text-200 px-2 py-1.5">
			<ToolSelect
				label="Font"
				className="w-28"
				value={state.font}
				options={fontOptions}
				disabled={disabled}
				onChange={(v) => (v === fonts[0].value ? chain().unsetFontFamily().run() : chain().setFontFamily(v).run())}
			/>
			<ToolSelect
				label="Font size"
				className="w-16"
				value={state.size}
				options={EDITOR_SIZES.map((n) => ({ label: String(n), value: String(n) }))}
				disabled={disabled}
				onChange={(v) => (Number(v) === DEFAULT_SIZE ? chain().unsetFontSize().run() : chain().setFontSize(`${v}px`).run())}
			/>
			<Divider />
			<ToolButton label="Bold (Ctrl+B)" active={state.bold} disabled={disabled} onClick={() => chain().toggleBold().run()}>
				<Bold />
			</ToolButton>
			<ToolButton label="Italic (Ctrl+I)" active={state.italic} disabled={disabled} onClick={() => chain().toggleItalic().run()}>
				<Italic />
			</ToolButton>
			<ToolButton label="Underline (Ctrl+U)" active={state.underline} disabled={disabled} onClick={() => chain().toggleUnderline().run()}>
				<Underline />
			</ToolButton>
			<ToolButton label="Strikethrough" active={state.strike} disabled={disabled} onClick={() => chain().toggleStrike().run()}>
				<Strikethrough />
			</ToolButton>
			<Divider />
			<ToolButton label="Bulleted list" active={state.bullet} disabled={disabled} onClick={() => chain().toggleBulletList().run()}>
				<List />
			</ToolButton>
			<ToolButton label="Numbered list" active={state.ordered} disabled={disabled} onClick={() => chain().toggleOrderedList().run()}>
				<ListOrdered />
			</ToolButton>
			<Divider />
			{(
				[
					["left", "Align left", AlignLeft],
					["center", "Align center", AlignCenter],
					["right", "Align right", AlignRight],
					["justify", "Justify", AlignJustify],
				] as const
			).map(([align, label, Icon]) => (
				<ToolButton key={align} label={label} active={state.align === align} disabled={disabled} onClick={() => chain().setTextAlign(align).run()}>
					<Icon />
				</ToolButton>
			))}
		</div>
	);
}

// ── Editor ───────────────────────────────────────────────────────────────────

export function RichTextEditor({
	value,
	defaultValue,
	onChange,
	placeholder = "Start typing here. Use the toolbar to format your text, add lists and change the alignment.",
	disabled: disabledProp,
	invalid: invalidProp,
	maxLength,
	showCount = !!maxLength,
	minHeight = "12rem",
	fonts = EDITOR_FONTS,
	id: idProp,
	"aria-label": ariaLabel,
	className,
}: RichTextEditorProps) {
	const { id, invalid, disabled, describedBy } = useFieldControl({ id: idProp, invalid: invalidProp, disabled: disabledProp });

	const editor = useEditor({
		// Next.js renders on the server first: create the editor after hydration.
		immediatelyRender: false,
		editable: !disabled,
		content: value ?? defaultValue ?? "",
		extensions: [
			StarterKit.configure({ heading: false, code: false, codeBlock: false, blockquote: false, horizontalRule: false, link: false }),
			TextStyle,
			FontFamily,
			FontSize,
			TextAlign.configure({ types: ["paragraph"] }),
			// Shown in the disabled state too, as in the spec.
			Placeholder.configure({ placeholder, showOnlyWhenEditable: false }),
			CharacterCount.configure({ limit: maxLength }),
		],
		editorProps: {
			attributes: {
				...(id ? { id } : {}),
				role: "textbox",
				"aria-multiline": "true",
				...(ariaLabel ? { "aria-label": ariaLabel } : {}),
				...(describedBy ? { "aria-describedby": describedBy } : {}),
				...(invalid ? { "aria-invalid": "true" } : {}),
				class: "rte-content outline-none",
				style: `min-height:${minHeight}`,
			},
		},
		onUpdate: ({ editor: e }) => onChange?.(e.isEmpty ? "" : e.getHTML()),
	});

	// Field labels point at the editor via id; clicking a <label> focuses it.
	useEffect(() => {
		if (!editor || !id) return;
		const label = document.querySelector<HTMLLabelElement>(`label[for="${CSS.escape(id)}"]`);
		if (!label) return;
		const focus = (e: MouseEvent) => {
			e.preventDefault();
			editor.commands.focus();
		};
		label.addEventListener("click", focus);
		return () => label.removeEventListener("click", focus);
	}, [editor, id]);

	// Controlled value changed from outside (e.g. form reset): sync without moving the cursor needlessly.
	useEffect(() => {
		if (!editor || value === undefined) return;
		const current = editor.isEmpty ? "" : editor.getHTML();
		if (value !== current) editor.commands.setContent(value || "", { emitUpdate: false });
	}, [editor, value]);

	useEffect(() => {
		editor?.setEditable(!disabled);
	}, [editor, disabled]);

	const count = useEditorState({
		editor,
		selector: ({ editor: e }) => (e ? (e.storage.characterCount.characters() as number) : 0),
	});

	return (
		<div
			className={cn(
				"overflow-hidden rounded-lg border transition-colors",
				disabled
					? "cursor-not-allowed border-text-200 bg-text-50 opacity-70"
					: invalid
						? "border-input-border-danger bg-surface focus-within:border-danger focus-within:ring-1 focus-within:ring-danger"
						: "border-input-border bg-surface focus-within:border-brand focus-within:ring-1 focus-within:ring-brand",
				className,
			)}
		>
			{editor ? (
				<Toolbar editor={editor} fonts={fonts} disabled={!!disabled} />
			) : (
				// Same height as the toolbar, so there's no layout jump when the editor loads.
				<div aria-hidden className="h-10.5 border-b border-text-200" />
			)}
			<EditorContent
				editor={editor}
				className="cursor-text px-3 py-2.5 text-sm leading-6 text-text-900"
				style={{ minHeight }}
			/>
			{showCount && (
				<p className="border-t border-text-100 px-3 py-1.5 text-right text-xs text-text-500" aria-live="polite">
					{count}
					{maxLength ? ` / ${maxLength}` : ""} characters
				</p>
			)}
		</div>
	);
}
