"use client";

import { useState, type ReactNode } from "react";
import { CircleCheck, Clock, Download, FileImage, FileText } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { Avatar } from "@/shared/ui/Avatar";
import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";
import { DetailsCard, ReviewField, type ReviewFieldProps } from "@/shared/ui/DetailsCard";
import { SlideDrawer } from "@/shared/ui/SlideDrawer";
import { StatusBadge } from "@/shared/ui/StatusBadge";
import { Tabs } from "@/shared/ui/Tabs";
import { Timeline, TimelineFields, TimelineItem, TimelineNotice } from "@/shared/ui/Timeline";

type Tab = "details" | "activity" | "schedule";

const TABS = [
	{ value: "details", label: "Loan Details" },
	{ value: "activity", label: "Loan Activity" },
	{ value: "schedule", label: "Amortization Schedule" },
];

export default function SlideDrawerDemo() {
	const [open, setOpen] = useState(false);
	const [tab, setTab] = useState<Tab>("details");

	return (
		<>
			<Button variant="secondary" onClick={() => setOpen(true)}>
				View loan details
			</Button>
			<SlideDrawer
				open={open}
				onClose={() => setOpen(false)}
				size="xl"
				title="Loan Details"
				description="View loan account information, repayment progress and activity."
				header={
					<>
						<div className="flex items-center gap-3 rounded-xl bg-text-50 p-4">
							<Avatar name="Maria Santos" size="lg" className="bg-green-100 text-brand-fg" />
							<div className="min-w-0 flex-1 leading-tight">
								<p className="truncate text-base font-semibold text-text-900">Maria Reyes Santos</p>
								<p className="truncate text-xs text-text-500">Loan ID 4002-0000-00540914</p>
							</div>
							<Badge tone="success" className="gap-1.5">
								<span aria-hidden className="size-1.5 rounded-full bg-green-600" />
								Active
							</Badge>
						</div>
						<Tabs
							items={TABS}
							value={tab}
							onValueChange={(v) => setTab(v as Tab)}
							variant="track"
							size="sm"
							aria-label="Loan sections"
						/>
					</>
				}
				footer={
					<>
						<Button variant="neutral" onClick={() => setOpen(false)}>
							Close
						</Button>
						<Button leftIcon={<Download aria-hidden />}>Download statement</Button>
					</>
				}
			>
				{tab === "details" && (
					// Container query, not a viewport breakpoint: the columns follow the
					// drawer's width, so they also stack in a narrower drawer size.
					<div className="@container">
						<div className="grid gap-8 @4xl:grid-cols-2 @4xl:gap-6">
							<Section title="Loan overview" description="Balances, repayment progress and account details.">
								<LoanOverview />
							</Section>
							<Section title="Activity and records" description="Payment history, schedule, documents and notes.">
								<LoanActivity />
								<AmortizationSchedule />
								<AttachedDocuments />
								<Remarks />
							</Section>
						</div>
					</div>
				)}
				{tab === "activity" && <LoanActivity />}
				{tab === "schedule" && <AmortizationSchedule />}
			</SlideDrawer>
		</>
	);
}

/* ── Layout helpers ─────────────────────────────────────────────────────── */

function Section({ title, description, children }: { title: string; description: string; children: ReactNode }) {
	return (
		<section className="flex min-w-0 flex-col gap-4">
			<div className="space-y-0.5">
				<h3 className="text-base font-semibold text-text-900">{title}</h3>
				<p className="text-xs text-text-500">{description}</p>
			</div>
			{children}
		</section>
	);
}

/** Card with the same gray header bar as DetailsCard, for free-form content. */
function Panel({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
	return (
		<section className="overflow-hidden rounded-xl border border-text-100 bg-surface">
			<header className="bg-text-50 px-5 py-3">
				<h4 className="text-sm font-semibold text-brand-fg">{title}</h4>
			</header>
			<div className={cn("p-5", className)}>{children}</div>
		</section>
	);
}

/** ReviewField at the drawer's compact text size. */
function Field(props: ReviewFieldProps) {
	return <ReviewField {...props} className="[&>dd]:text-sm [&>dt]:text-xs" />;
}

/* ── Loan overview ──────────────────────────────────────────────────────── */

function StatTile({ label, value, note, danger }: { label: string; value: string; note: string; danger?: boolean }) {
	return (
		<div className="min-w-0 rounded-xl border border-text-100 bg-surface p-4">
			<p className="text-xs text-text-500">{label}</p>
			<p className={cn("mt-1 text-lg font-semibold tabular-nums", danger ? "text-red-700" : "text-text-900")}>
				{value}
			</p>
			<p className="mt-0.5 text-xs text-text-500">{note}</p>
		</div>
	);
}

function RepaymentProgress({ paid, total }: { paid: number; total: number }) {
	const pct = Math.round((paid / total) * 100);
	return (
		<div className="rounded-xl border border-text-100 bg-surface p-4">
			<div className="flex items-baseline justify-between gap-4 text-xs">
				<span className="font-medium text-text-900">Repayment progress</span>
				<span className="text-text-500">
					{paid} of {total} terms paid
				</span>
			</div>
			<div
				role="progressbar"
				aria-label="Repayment progress"
				aria-valuemin={0}
				aria-valuemax={total}
				aria-valuenow={paid}
				aria-valuetext={`${paid} of ${total} terms paid`}
				className="mt-2 h-2 overflow-hidden rounded-full bg-text-100"
			>
				<div className="h-full rounded-full bg-brand" style={{ width: `${pct}%` }} />
			</div>
		</div>
	);
}

function LoanOverview() {
	return (
		<>
			<div className="grid gap-3 sm:grid-cols-3">
				<StatTile label="Principal" value="PHP 5,000.00" note="Released Jun 23, 2025" />
				<StatTile label="Outstanding Balance" value="PHP 236.00" note="As of Sep 14, 2026" danger />
				<StatTile label="Next Due Date" value="Sep 15, 2026" note="PHP 250.00 weekly" />
			</div>
			<RepaymentProgress paid={22} total={23} />
			<DetailsCard title="Loan Information">
				<Field label="Type" value="SIKAP 2" />
				<Field label="Loan Account Number" value="4002-0000-00540914" />
				<Field label="Status" value="Active" />
				<Field label="Date Released" value="Jun 23, 2025" />
				<Field label="Purpose" value="Inventory for sari-sari store" />
			</DetailsCard>
			<DetailsCard title="Payment Details">
				<Field label="Interest Amount" value="PHP 736.00" />
				<Field label="LRF" value="PHP 35.00" />
				<Field label="Outstanding Balance" value="PHP 236.00" tone="danger" />
				<Field label="Number of Term" value="23" />
				<Field label="Loan Cycle" value="1" />
			</DetailsCard>
			<DetailsCard title="Borrower Information">
				<Field label="Full Name" value="Maria Reyes Santos" />
				<Field label="Contact Number" value="+63 917 123 4567" />
				<Field label="Center" value="Kawit Center 04" />
				<Field label="Branch" value="Kawit Branch" />
			</DetailsCard>
			<DetailsCard title="Co-maker Information">
				<Field label="Full Name" value="Juan Santos" />
				<Field label="Relationship" value="Spouse" />
				<Field label="Contact Number" value="+63 918 765 4321" />
				<Field label="Occupation" value="Fisherman" />
			</DetailsCard>
		</>
	);
}

/* ── Activity and records ───────────────────────────────────────────────── */

const PAYMENTS = [
	{ date: "Sep 1, 2026", status: "done" },
	{ date: "Sep 8, 2026", status: "done" },
] as const;

/** Narrower date column and smaller date than the Timeline default, to fit half a drawer. */
const ITEM = "sm:grid-cols-[5.5rem_1.25rem_1fr] [&>p]:text-xs";

function EventTitle({ children }: { children: ReactNode }) {
	return <p className="mb-2.5 text-sm font-semibold text-text-900">{children}</p>;
}

function LoanActivity() {
	return (
		<Panel title="Loan Activity" className="pb-0">
			<Timeline>
				{PAYMENTS.map((p) => (
					<TimelineItem key={p.date} date={p.date} status={p.status} className={ITEM}>
						<EventTitle>Payment</EventTitle>
						<TimelineFields
							fields={[
								{ label: "Details", value: "PHP 250.00 weekly amortization" },
								{ label: "Collected by", value: "Ana L. Cruz" },
								{ label: "Status", value: <Badge tone="success">Posted</Badge> },
							]}
						/>
					</TimelineItem>
				))}
				<TimelineItem date="Sep 15, 2026" status="current" className={ITEM}>
					<EventTitle>Reminder</EventTitle>
					<TimelineFields
						fields={[
							{ label: "Details", value: "Payment of PHP 250.00 due today" },
							{
								label: "Sent to",
								value: (
									<>
										Maria R. Santos <span className="text-text-500">— via SMS</span>
									</>
								),
							},
						]}
					/>
					<TimelineNotice>Reminder sent to +63 917 123 4567</TimelineNotice>
					<TimelineFields fields={[{ label: "Status", value: <Badge>Notified</Badge> }]} />
				</TimelineItem>
				<TimelineItem date="Sep 22, 2026" status="upcoming" className={ITEM}>
					<EventTitle>Payment</EventTitle>
					<TimelineFields
						fields={[
							{ label: "Details", value: "Weekly amortization PHP 250.00" },
							{ label: "Collected by", value: "Ana L. Cruz" },
							{ label: "Status", value: <Badge>Upcoming</Badge> },
						]}
					/>
				</TimelineItem>
			</Timeline>
		</Panel>
	);
}

const SCHEDULE = [
	{ term: 20, date: "Aug 25, 2026", status: "PAID" },
	{ term: 21, date: "Sep 01, 2026", status: "PAID" },
	{ term: 22, date: "Sep 08, 2026", status: "PAID" },
	{ term: 23, date: "Sep 15, 2026", status: "PENDING" },
] as const;

function AmortizationSchedule() {
	return (
		<Panel title="Amortization Schedule" className="p-0">
			<ul className="divide-y divide-text-100">
				{SCHEDULE.map((row) => {
					const paid = row.status === "PAID";
					const Icon = paid ? CircleCheck : Clock;
					return (
						<li key={row.term} className="flex items-center gap-3 px-5 py-3">
							<span className="w-8 shrink-0 text-xs font-medium text-text-500 tabular-nums">#{row.term}</span>
							<div className="min-w-0 flex-1 leading-tight">
								<p className="text-sm font-medium text-text-900">{row.date}</p>
								<p className="text-xs text-text-500">Amount: PHP 250.00</p>
							</div>
							<StatusBadge status={row.status} size="sm" />
							<Icon
								aria-hidden
								className={cn("size-5 shrink-0", paid ? "text-green-600" : "text-amber-600")}
							/>
						</li>
					);
				})}
			</ul>
			<div className="flex items-center justify-between gap-4 border-t border-text-100 px-5 py-3">
				<span className="text-xs text-text-500">Showing 20-23 of 23 records</span>
				<Button variant="link" size="xs" className="px-0">
					View full schedule
				</Button>
			</div>
		</Panel>
	);
}

const DOCUMENTS = [
	{ name: "Signed loan agreement.pdf", meta: "PDF, 1.2 MB, uploaded Jun 23, 2025", image: false },
	{ name: "Valid ID, front and back.jpg", meta: "JPG, 860 KB, uploaded Jun 23, 2025", image: true },
	{ name: "Promissory note.pdf", meta: "PDF, 540 KB, uploaded Jun 23, 2025", image: false },
	{ name: "Disclosure statement.pdf", meta: "PDF, 310 KB, uploaded Jun 23, 2025", image: false },
];

function AttachedDocuments() {
	return (
		<Panel title="Attached Documents" className="p-0">
			<ul className="divide-y divide-text-100">
				{DOCUMENTS.map((doc) => {
					const Icon = doc.image ? FileImage : FileText;
					return (
						<li key={doc.name} className="flex items-center gap-3 px-5 py-3">
							<span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-subtle text-brand-fg">
								<Icon aria-hidden className="size-4" />
							</span>
							<div className="min-w-0 flex-1 leading-tight">
								<p className="truncate text-sm font-medium text-text-900">{doc.name}</p>
								<p className="truncate text-xs text-text-500">{doc.meta}</p>
							</div>
							<Button
								variant="link"
								size="xs"
								leftIcon={<Download aria-hidden />}
								aria-label={`Download ${doc.name}`}
							>
								Download
							</Button>
						</li>
					);
				})}
			</ul>
		</Panel>
	);
}

const REMARKS = [
	{
		text: "Member requested to keep the weekly schedule and pay at the center meeting. No missed payments since release.",
		author: "Ana L. Cruz, Field Officer",
		date: "Sep 8, 2026",
	},
	{
		text: "Eligible for loan cycle 2 once the final amortization is posted.",
		author: "Credit Review",
		date: "Aug 25, 2026",
	},
];

function Remarks() {
	return (
		<Panel title="Remarks" className="space-y-3">
			{REMARKS.map((r) => (
				<figure key={r.date} className="rounded-lg bg-text-50 p-3">
					<blockquote className="text-sm text-text-700">“{r.text}”</blockquote>
					<figcaption className="mt-1.5 text-xs text-text-500">
						— {r.author}, {r.date}
					</figcaption>
				</figure>
			))}
		</Panel>
	);
}
