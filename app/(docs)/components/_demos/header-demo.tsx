"use client";

import { Building2, Calendar, CircleUserRound, IdCard, KeyRound, LogOut, Phone, Settings } from "lucide-react";
import { AppHeader } from "@/shared/ui/AppHeader";
import { NotificationBell } from "@/shared/ui/NotificationBell";
import { useAppToast } from "@/shared/ui/ToastContainer";
import { UserMenu } from "@/shared/ui/UserMenu";

export default function HeaderDemo() {
	const toast = useAppToast();

	return (
		<AppHeader
			className="w-full rounded-xl text-left"
			title="Tab 1"
			breadcrumb={[{ label: "Parent", href: "/components" }, { label: "Section" }, { label: "Tab 1" }]}
			actions={
				<>
					<NotificationBell unread={3} onClick={() => toast.info("You have 3 unread notifications.")} />
					<UserMenu
						name="John Dela Cruz"
						role="System Admin"
						handle="@202309-46832"
						details={[
							{ icon: IdCard, label: "Role", value: "Super Admin" },
							{ icon: Building2, label: "Institution", value: "Bakawan Data Analytics, Inc." },
							{ icon: Calendar, label: "Birthday", value: "1997-09-20" },
							{ icon: CircleUserRound, label: "Gender", value: "Male" },
							{ icon: Phone, label: "Contact Number", value: "09569549748" },
						]}
						actions={[
							{ icon: Settings, label: "Profile settings", chevron: true, onClick: () => toast.info("Open profile settings") },
							{ icon: KeyRound, label: "Change password", onClick: () => toast.info("Open change password") },
							{ icon: LogOut, label: "Sign Out", onClick: () => toast.success("Signed out.") },
						]}
					/>
				</>
			}
		/>
	);
}
