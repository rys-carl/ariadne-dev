"use client";

import { Building2, Calendar, CircleUserRound, IdCard, ImagePlus, KeyRound, LogOut, Phone, Settings } from "lucide-react";
import { IconButton } from "@/shared/ui/Button";
import { ProfileCard } from "@/shared/ui/ProfileCard";

export default function ProfileCardDemo() {
	return (
		<ProfileCard
			className="text-left"
			name="John Dela Cruz"
			handle="@202309-46832"
			bannerAction={<IconButton variant="neutral" size="sm" icon={<ImagePlus />} aria-label="Change cover" />}
			details={[
				{ icon: IdCard, label: "Role", value: "Super Admin" },
				{ icon: Building2, label: "Institution", value: "Bakawan Data Analytics, Inc." },
				{ icon: Calendar, label: "Birthday", value: "1997-09-20" },
				{ icon: CircleUserRound, label: "Gender", value: "Male" },
				{ icon: Phone, label: "Contact Number", value: "09569549748" },
			]}
			actions={[
				{ icon: Settings, label: "Profile settings", href: "/components/profile-card", chevron: true },
				{ icon: KeyRound, label: "Change password", onClick: () => {} },
				{ icon: LogOut, label: "Sign Out", onClick: () => {} },
			]}
		/>
	);
}
