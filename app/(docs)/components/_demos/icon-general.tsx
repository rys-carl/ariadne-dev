import {
	BookOpen,
	CircleCheck,
	CircleQuestionMark,
	Globe,
	Mail,
	Menu,
	Play,
	Send,
	Star,
} from "lucide-react";
import { Icon } from "@/shared/ui/Icon";

// The "General" set from the design system Figma.
const GENERAL = [
	{ name: "Send", icon: Send },
	{ name: "BookOpen", icon: BookOpen },
	{ name: "Globe", icon: Globe },
	{ name: "CircleQuestionMark", icon: CircleQuestionMark },
	{ name: "CircleCheck", icon: CircleCheck },
	{ name: "Play", icon: Play },
	{ name: "Star", icon: Star },
	{ name: "Mail", icon: Mail },
	{ name: "Menu", icon: Menu },
];

export default function IconGeneral() {
	return (
		<ul className="grid w-full grid-cols-3 gap-3 sm:grid-cols-5 md:grid-cols-9">
			{GENERAL.map(({ name, icon }) => (
				<li key={name} className="flex flex-col items-center gap-2 text-text-800">
					<Icon icon={icon} size="lg" />
					<span className="w-full truncate text-center font-mono text-[10px] text-text-500">{name}</span>
				</li>
			))}
		</ul>
	);
}
