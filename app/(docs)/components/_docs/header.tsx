import ComponentPreview from "../_components/ComponentPreview";
import CodeBlock from "../_components/CodeBlock";
import { DocSection, PropsTable, type TocItem } from "../_components/DocPrimitives";

const code = (text: string) => <code className="font-mono text-sm">{text}</code>;

export const toc: TocItem[] = [
	{ id: "usage", title: "Usage" },
	{ id: "user-menu", title: "User menu" },
	{ id: "notifications", title: "Notifications" },
	{ id: "props", title: "Props" },
];

const USAGE = `import { AppHeader } from "@/shared/ui/AppHeader";
import { NotificationBell } from "@/shared/ui/NotificationBell";
import { UserMenu } from "@/shared/ui/UserMenu";

<AppHeader
  title="Tab 1"
  breadcrumb={[{ label: "Parent", href: "/parent" }, { label: "Section" }, { label: "Tab 1" }]}
  actions={
    <>
      <NotificationBell unread={3} onClick={openNotifications} />
      <UserMenu name={user.name} role={user.role} handle={user.handle}
        details={[…]} actions={[…]} />
    </>
  }
/>`;

export default function HeaderDoc() {
	return (
		<>
			<ComponentPreview name="header-demo" />
			<DocSection
				id="usage"
				title="Usage"
				description={
					<>
						The page header: title and breadcrumb on the left, actions on the right. The title is the page&apos;s{" "}
						{code("<h1>")}. Add {code("sticky")}{" "}to keep it visible while the page scrolls.
					</>
				}
			>
				<CodeBlock code={USAGE} title="Usage" />
			</DocSection>
			<DocSection
				id="user-menu"
				title="User menu"
				description={
					<>
						{code("UserMenu")}{" "}is the spec&apos;s User Profile button. Clicking it opens the Profile Card underneath.
						Escape or a click outside closes the card and returns focus to the button. Choosing an action closes
						it too. On phones the button shrinks to the avatar. {code("UserProfile")}{" "}is the button on its own, if
						you need a different panel.
					</>
				}
			/>
			<DocSection
				id="notifications"
				title="Notifications"
				description={
					<>
						{code("NotificationBell")}{" "}shows a red dot when {code("unread")}{" "}is above 0. Screen readers hear the
						count (&ldquo;Notifications, 3 unread&rdquo;), since the dot alone is visual only.
					</>
				}
			/>
			<DocSection id="props" title="Props">
				<p className="text-sm font-semibold text-text-900">AppHeader</p>
				<PropsTable
					rows={[
						{ name: "title", type: "ReactNode", description: "Page title (<h1>)." },
						{ name: "breadcrumb", type: "{ label, href? }[]", description: "Trail after Home, ending with the current page." },
						{ name: "actions", type: "ReactNode", description: "Right side." },
						{ name: "sticky", type: "boolean", default: "false", description: "Stick to the top while scrolling." },
					]}
				/>
				<p className="pt-2 text-sm font-semibold text-text-900">UserMenu</p>
				<PropsTable
					rows={[
						{ name: "name / role", type: "string", description: "Shown on the button." },
						{ name: "handle, details, actions, bannerAction", type: "see Profile Card", description: "Passed to the card." },
						{ name: "align", type: '"start" | "end"', default: '"end"', description: "Card edge aligned to the button." },
					]}
				/>
				<p className="pt-2 text-sm font-semibold text-text-900">NotificationBell</p>
				<PropsTable rows={[{ name: "unread", type: "number", default: "0", description: "Shows the dot when above 0." }]} />
			</DocSection>
		</>
	);
}
