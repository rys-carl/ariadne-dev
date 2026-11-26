"use client";

import { useState } from "react";
import { AvatarPicker } from "@/shared/ui/ProfileSettings";

export default function AvatarPickerDemo() {
	const [avatar, setAvatar] = useState<string>();
	return (
		<div className="text-left">
			<AvatarPicker name="Juan Dela Cruz" value={avatar} onChange={setAvatar} />
		</div>
	);
}
