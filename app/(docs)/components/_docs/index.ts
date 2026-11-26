// Maps registry slugs to their doc page body + table of contents.
// Keep the keys in sync with ../_lib/registry.ts.
import type { ComponentType } from "react";
import type { TocItem } from "../_components/DocPrimitives";
import AlertDialogDoc, { toc as alertDialogToc } from "./alert-dialog";
import AlertIconDoc, { toc as alertIconToc } from "./alert-icon";
import BadgeDoc, { toc as badgeToc } from "./badge";
import CalloutDoc, { toc as calloutToc } from "./callout";
import CheckIndicatorDoc, { toc as checkIndicatorToc } from "./check-indicator";
import ConfirmDialogDoc, { toc as confirmDialogToc } from "./confirm-dialog";
import DetailsCardDoc, { toc as detailsCardToc } from "./details-card";
import DialogDoc, { toc as dialogToc } from "./dialog";
import SlideDrawerDoc, { toc as slideDrawerToc } from "./slide-drawer";
import StepperDoc, { toc as stepperToc } from "./stepper";
import TimelineDoc, { toc as timelineToc } from "./timeline";
import ToastDoc, { toc as toastToc } from "./toast";
import UploadProgressDoc, { toc as uploadProgressToc } from "./upload-progress";
import TabsDoc, { toc as tabsToc } from "./tabs";
import PaginationDoc, { toc as paginationToc } from "./pagination";
import TableDoc, { toc as tableToc } from "./table";
import StatusBadgeDoc, { toc as statusBadgeToc } from "./status-badge";
import ApprovalStageDoc, { toc as approvalStageToc } from "./approval-stage";
import AvatarDoc, { toc as avatarToc } from "./avatar";
import ReadinessDoc, { toc as readinessToc } from "./readiness";
import EmptyStateDoc, { toc as emptyStateToc } from "./empty-state";
import HeaderDoc, { toc as headerToc } from "./header";
import BreadcrumbDoc, { toc as breadcrumbToc } from "./breadcrumb";
import MetaBarDoc, { toc as metaBarToc } from "./meta-bar";
import ProfileCardDoc, { toc as profileCardToc } from "./profile-card";
import ProfileSettingsDoc, { toc as profileSettingsToc } from "./profile-settings";
import CalendarDoc, { toc as calendarToc } from "./calendar";
import DatePickerDoc, { toc as datePickerToc } from "./date-picker";
import TimePickerDoc, { toc as timePickerToc } from "./time-picker";
import CheckboxDoc, { toc as checkboxToc } from "./checkbox";
import RadioGroupDoc, { toc as radioGroupToc } from "./radio-group";
import ToggleDoc, { toc as toggleToc } from "./toggle";
import RichTextEditorDoc, { toc as richTextEditorToc } from "./rich-text-editor";
import DraggableCardDoc, { toc as draggableCardToc } from "./draggable-card";
import ButtonDoc, { toc as buttonToc } from "./button";
import IconButtonDoc, { toc as iconButtonToc } from "./icon-button";
import IconsDoc, { toc as iconsToc } from "./icons";
import InputDoc, { toc as inputToc } from "./input";
import InputOtpDoc, { toc as inputOtpToc } from "./input-otp";
import PhoneInputDoc, { toc as phoneInputToc } from "./phone-input";
import SearchInputDoc, { toc as searchInputToc } from "./search-input";
import ThemeToggleDoc, { toc as themeToggleToc } from "./theme-toggle";
import TypographyDoc, { toc as typographyToc } from "./typography";

export const docs: Record<string, { Doc: ComponentType; toc: TocItem[] }> = {
	"alert-dialog": { Doc: AlertDialogDoc, toc: alertDialogToc },
	"alert-icon": { Doc: AlertIconDoc, toc: alertIconToc },
	"badge": { Doc: BadgeDoc, toc: badgeToc },
	"callout": { Doc: CalloutDoc, toc: calloutToc },
	"check-indicator": { Doc: CheckIndicatorDoc, toc: checkIndicatorToc },
	"confirm-dialog": { Doc: ConfirmDialogDoc, toc: confirmDialogToc },
	"details-card": { Doc: DetailsCardDoc, toc: detailsCardToc },
	"dialog": { Doc: DialogDoc, toc: dialogToc },
	"slide-drawer": { Doc: SlideDrawerDoc, toc: slideDrawerToc },
	"stepper": { Doc: StepperDoc, toc: stepperToc },
	"timeline": { Doc: TimelineDoc, toc: timelineToc },
	"toast": { Doc: ToastDoc, toc: toastToc },
	"upload-progress": { Doc: UploadProgressDoc, toc: uploadProgressToc },
	"tabs": { Doc: TabsDoc, toc: tabsToc },
	"pagination": { Doc: PaginationDoc, toc: paginationToc },
	"table": { Doc: TableDoc, toc: tableToc },
	"status-badge": { Doc: StatusBadgeDoc, toc: statusBadgeToc },
	"approval-stage": { Doc: ApprovalStageDoc, toc: approvalStageToc },
	"avatar": { Doc: AvatarDoc, toc: avatarToc },
	"readiness": { Doc: ReadinessDoc, toc: readinessToc },
	"empty-state": { Doc: EmptyStateDoc, toc: emptyStateToc },
	"header": { Doc: HeaderDoc, toc: headerToc },
	"breadcrumb": { Doc: BreadcrumbDoc, toc: breadcrumbToc },
	"meta-bar": { Doc: MetaBarDoc, toc: metaBarToc },
	"profile-card": { Doc: ProfileCardDoc, toc: profileCardToc },
	"profile-settings": { Doc: ProfileSettingsDoc, toc: profileSettingsToc },
	calendar: { Doc: CalendarDoc, toc: calendarToc },
	"date-picker": { Doc: DatePickerDoc, toc: datePickerToc },
	"time-picker": { Doc: TimePickerDoc, toc: timePickerToc },
	checkbox: { Doc: CheckboxDoc, toc: checkboxToc },
	"radio-group": { Doc: RadioGroupDoc, toc: radioGroupToc },
	toggle: { Doc: ToggleDoc, toc: toggleToc },
	"rich-text-editor": { Doc: RichTextEditorDoc, toc: richTextEditorToc },
	"draggable-card": { Doc: DraggableCardDoc, toc: draggableCardToc },
	button: { Doc: ButtonDoc, toc: buttonToc },
	"icon-button": { Doc: IconButtonDoc, toc: iconButtonToc },
	icons: { Doc: IconsDoc, toc: iconsToc },
	input: { Doc: InputDoc, toc: inputToc },
	"input-otp": { Doc: InputOtpDoc, toc: inputOtpToc },
	"phone-input": { Doc: PhoneInputDoc, toc: phoneInputToc },
	"search-input": { Doc: SearchInputDoc, toc: searchInputToc },
	"theme-toggle": { Doc: ThemeToggleDoc, toc: themeToggleToc },
	typography: { Doc: TypographyDoc, toc: typographyToc },
};
