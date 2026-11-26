import ComponentPreview from "../_components/ComponentPreview";
import CodeBlock from "../_components/CodeBlock";
import { DocSection, PropsTable, type TocItem } from "../_components/DocPrimitives";

const code = (text: string) => <code className="font-mono text-sm">{text}</code>;

export const toc: TocItem[] = [
	{ id: "usage", title: "Usage" },
	{ id: "props", title: "Props" },
];

const USAGE = `import { ProfileCard } from "@/shared/ui/ProfileCard";
import { IdCard, KeyRound, LogOut, Settings } from "lucide-react";

<ProfileCard
  name="John Dela Cruz"
  handle="@202309-46832"
  details={[{ icon: IdCard, label: "Role", value: "Super Admin" }, …]}
  actions={[
    { icon: Settings, label: "Profile settings", href: "/profile", chevron: true },
    { icon: KeyRound, label: "Change password", href: "/profile/password" },
    { icon: LogOut, label: "Sign Out", onClick: signOut },
  ]}
/>`;

export default function ProfileCardDoc() {
	return (
		<>
			<ComponentPreview name="profile-card-demo" />
			<DocSection
				id="usage"
				title="Usage"
				description={
					<>
						The signed-in user&apos;s summary and account actions. In the header, {code("UserMenu")}{" "}opens it for
						you. Actions with {code("href")}{" "}render as links, the rest as buttons. The spec&apos;s icons for
						Profile settings and the banner button are &ldquo;+&rdquo; placeholders, so the demo uses Settings and
						ImagePlus.
					</>
				}
			>
				<CodeBlock code={USAGE} title="Usage" />
			</DocSection>
			<DocSection id="props" title="Props">
				<PropsTable
					rows={[
						{ name: "name", type: "string", description: "Full name. The avatar's initials come from it." },
						{ name: "handle", type: "string", description: "Username or employee number." },
						{ name: "details", type: "{ icon, label, value }[]", description: "Profile facts." },
						{ name: "actions", type: "{ icon, label, href?, onClick?, chevron? }[]", description: "Account actions." },
						{ name: "bannerAction", type: "ReactNode", description: "Button on the banner's top-right." },
					]}
				/>
			</DocSection>
		</>
	);
}
