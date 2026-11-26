"use client";

import { useState } from "react";
import { Briefcase, CircleUserRound, ImageIcon } from "lucide-react";
import { ReviewField } from "@/shared/ui/DetailsCard";
import { AvatarPicker, ProfileHero, SettingsLayout, SettingsSection } from "@/shared/ui/ProfileSettings";

export default function ProfileSettingsDemo() {
	const [avatar, setAvatar] = useState<string>();

	return (
		<div className="w-full space-y-4 text-left">
			<ProfileHero name="Juan Dela Cruz" id="202508-78900" avatarSrc={avatar} onBack={() => {}} />
			<SettingsLayout
				sections={[
					{ id: "demo-personal", label: "Personal Information", icon: CircleUserRound },
					{ id: "demo-work", label: "Work Information", icon: Briefcase },
					{ id: "demo-avatar", label: "Change Avatar", icon: ImageIcon },
				]}
			>
				<SettingsSection id="demo-personal" title="Personal Information">
					<ReviewField label="Full name" value="Juan Dela Cruz" />
					<ReviewField label="Staff ID" value="202508-78900" />
				</SettingsSection>
				<SettingsSection id="demo-work" title="Work Information">
					<ReviewField label="Role" value="Super Admin" />
					<ReviewField label="Branch" value="Head Office" />
				</SettingsSection>
				<SettingsSection id="demo-avatar" title="Profile Avatar" raw>
					<AvatarPicker name="Juan Dela Cruz" value={avatar} onChange={setAvatar} />
				</SettingsSection>
			</SettingsLayout>
		</div>
	);
}
