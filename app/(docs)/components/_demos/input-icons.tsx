import { AtSign, Eye, Search } from "lucide-react";
import { Input } from "@/shared/ui/Input";

export default function InputIcons() {
	return (
		<div className="grid w-full max-w-sm gap-4">
			<Input placeholder="Search staff" leftIcon={<Search />} aria-label="Search staff" />
			<Input placeholder="username" leftIcon={<AtSign />} aria-label="Username" />
			<Input type="password" placeholder="Password" rightIcon={<Eye />} aria-label="Password" />
		</div>
	);
}
