import ComponentPreview from "../_components/ComponentPreview";
import CodeBlock from "../_components/CodeBlock";
import { DocSection, PropsTable, type TocItem } from "../_components/DocPrimitives";

const code = (text: string) => <code className="font-mono text-sm">{text}</code>;

export const toc: TocItem[] = [
	{ id: "usage", title: "Usage" },
	{ id: "avatar-picker", title: "Avatar picker" },
	{ id: "behavior", title: "Behavior" },
	{ id: "props", title: "Props" },
];

const USAGE = `import { AvatarPicker, ProfileHero, SettingsLayout, SettingsSection } from "@/shared/ui/ProfileSettings";
import { ReviewField } from "@/shared/ui/DetailsCard";

<ProfileHero name={user.name} id={user.staffId} avatarSrc={avatar} onBack={() => router.back()} />

<SettingsLayout sections={[
  { id: "personal", label: "Personal Information", icon: CircleUserRound },
  { id: "avatar", label: "Change Avatar", icon: ImageIcon },
]}>
  <SettingsSection id="personal" title="Personal Information">
    <ReviewField label="Full name" value={user.name} />
  </SettingsSection>
  <SettingsSection id="avatar" title="Profile Avatar" raw>
    <AvatarPicker name={user.name} value={avatar} onChange={setAvatar} />
  </SettingsSection>
</SettingsLayout>`;

export default function ProfileSettingsDoc() {
	return (
		<>
			<ComponentPreview name="profile-settings-demo" />
			<DocSection
				id="usage"
				title="Usage"
				description={
					<>
						The pieces of the profile settings page: {code("ProfileHero")}{" "}(banner, avatar, name and ID),{" "}
						{code("SettingsLayout")}{" "}(section nav + content), {code("SettingsSection")}{" "}(a titled two-column group of
						review fields) and {code("AvatarPicker")}. The full page is at{" "}
						<a href="/profile" className="text-brand-fg underline-offset-4 hover:underline">
							/profile
						</a>
						, opened from &ldquo;Profile settings&rdquo; in the header&apos;s profile card.
					</>
				}
			>
				<CodeBlock code={USAGE} title="Usage" />
			</DocSection>
			<DocSection
				id="avatar-picker"
				title="Avatar picker"
				description="Upload a JPG or PNG up to 2 MB, remove it, or choose one of the built-in avatars. Wrong types and oversized files show an error instead of uploading."
			>
				<ComponentPreview name="avatar-picker-demo" />
			</DocSection>
			<DocSection
				id="behavior"
				title="Behavior"
				description={
					<>
						The section nav highlights the section in view as you scroll, and clicking an item scrolls to it. On narrow
						screens it becomes a scrollable row above the content. In the app, the chosen avatar is kept in{" "}
						{code("useProfileStore")}, so the header and profile card update right away. It&apos;s in memory only,
						so wire {code("onChange")}{" "}to an upload API to save it.
					</>
				}
			/>
			<DocSection id="props" title="Props">
				<p className="text-sm font-semibold text-text-900">ProfileHero</p>
				<PropsTable
					rows={[
						{ name: "name", type: "string", description: "Full name; also the avatar's initials." },
						{ name: "avatarSrc", type: "string", description: "Photo or avatar URL." },
						{ name: "idLabel / id", type: "string", default: '"Staff ID"', description: "Shown under the name." },
						{ name: "onBack", type: "() => void", description: "Shows the Back button." },
						{ name: "action", type: "ReactNode", description: "Right side of the name row." },
					]}
				/>
				<p className="pt-2 text-sm font-semibold text-text-900">SettingsLayout / SettingsSection</p>
				<PropsTable
					rows={[
						{ name: "sections", type: "{ id, label, icon }[]", description: "Nav items; ids must match the sections." },
						{ name: "id / title", type: "string", description: "Section anchor and heading." },
						{ name: "raw", type: "boolean", default: "false", description: "Render children as-is instead of a field grid." },
					]}
				/>
				<p className="pt-2 text-sm font-semibold text-text-900">AvatarPicker</p>
				<PropsTable
					rows={[
						{ name: "name", type: "string", description: "For the initials fallback." },
						{ name: "value", type: "string", description: "Current photo or avatar URL." },
						{ name: "onChange", type: "(src?: string) => void", description: "undefined when removed." },
						{ name: "presets", type: "AvatarPreset[]", default: "AVATAR_PRESETS", description: "Built-in avatars." },
					]}
				/>
			</DocSection>
		</>
	);
}
