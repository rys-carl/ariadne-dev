"use client";

// Heavy demos (editor, drag and drop), loaded on demand. Every doc page shares the /components/[slug]
// route, so a static import here would ship the editor (Tiptap/ProseMirror,
// ~500 KB) to all doc pages. With next/dynamic it's fetched only on pages
// that render these demos.
import dynamic from "next/dynamic";

const Loading = () => <div aria-busy="true" aria-label="Loading demo" className="h-64 w-full animate-pulse rounded-lg bg-text-100" />;

export const RichTextEditorDemo = dynamic(() => import("./rich-text-editor-demo"), { ssr: false, loading: Loading });
export const DraggableCardDemo = dynamic(() => import("./draggable-card-demo"), { ssr: false, loading: Loading });
export const DraggableCardGrid = dynamic(() => import("./draggable-card-grid"), { ssr: false, loading: Loading });
export const DraggableCardStates = dynamic(() => import("./draggable-card-states"), { ssr: false, loading: Loading });
export const RichTextEditorForm = dynamic(() => import("./rich-text-editor-form"), { ssr: false, loading: Loading });
