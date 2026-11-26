// Demo registry. Each key must match its file name: ComponentPreview reads
// `${key}.tsx` from this folder to show the source in the Code tab.
import ButtonDemo from "./button-demo";
import ButtonVariants from "./button-variants";
import ButtonDestructive from "./button-destructive";
import ButtonSizes from "./button-sizes";
import ButtonIcons from "./button-icons";
import ButtonDisabled from "./button-disabled";
import ButtonAsLink from "./button-as-link";
import IconButtonDemo from "./icon-button-demo";
import IconButtonVariants from "./icon-button-variants";
import IconButtonDestructive from "./icon-button-destructive";
import IconButtonSizes from "./icon-button-sizes";
import TypographyDemo from "./typography-demo";
import TypographyHeadings from "./typography-headings";
import TypographyText from "./typography-text";
import TypographyBlockquote from "./typography-blockquote";
import TypographyList from "./typography-list";
import TypographyInlineCode from "./typography-inline-code";
import TypographyTable from "./typography-table";
import TypographyAs from "./typography-as";
import TypographyFonts from "./typography-fonts";
import IconDemo from "./icon-demo";
import IconSizes from "./icon-sizes";
import IconTones from "./icon-tones";
import IconInButton from "./icon-in-button";
import IconGeneral from "./icon-general";
import InputDemo from "./input-demo";
import InputStates from "./input-states";
import InputIcons from "./input-icons";
import InputValidation from "./input-validation";
import InputFile from "./input-file";
import PhoneInputDemo from "./phone-input-demo";
import PhoneInputStates from "./phone-input-states";
import InputOtpDemo from "./input-otp-demo";
import InputOtpStates from "./input-otp-states";
import SearchInputDemo from "./search-input-demo";
import AlertIconDemo from "./alert-icon-demo";
import CheckIndicatorDemo from "./check-indicator-demo";
import StepperDemo from "./stepper-demo";
import StepperStates from "./stepper-states";
import CalloutDemo from "./callout-demo";
import BadgeDemo from "./badge-demo";
import DetailsCardDemo from "./details-card-demo";
import ReviewFieldDemo from "./review-field-demo";
import DialogDemo from "./dialog-demo";
import AlertDialogDemo from "./alert-dialog-demo";
import ConfirmDialogDemo from "./confirm-dialog-demo";
import SlideDrawerDemo from "./slide-drawer-demo";
import SlideDrawerSides from "./slide-drawer-sides";
import SlideDrawerSizes from "./slide-drawer-sizes";
import ToastDemo from "./toast-demo";
import UploadProgressDemo from "./upload-progress-demo";
import UploadProgressStates from "./upload-progress-states";
import TimelineDemo from "./timeline-demo";
import InputTextarea from "./input-textarea";
import TabsDemo from "./tabs-demo";
import TabsVariants from "./tabs-variants";
import PaginationDemo from "./pagination-demo";
import PaginationStates from "./pagination-states";
import StatusBadgeDemo from "./status-badge-demo";
import ApprovalStageDemo from "./approval-stage-demo";
import AvatarDemo from "./avatar-demo";
import ReadinessDemo from "./readiness-demo";
import EmptyStateDemo from "./empty-state-demo";
import TableDemo from "./table-demo";
import TableTemplate from "./table-template";
import TableCells from "./table-cells";
import HeaderDemo from "./header-demo";
import BreadcrumbDemo from "./breadcrumb-demo";
import MetaBarDemo from "./meta-bar-demo";
import ProfileCardDemo from "./profile-card-demo";
import ProfileSettingsDemo from "./profile-settings-demo";
import AvatarPickerDemo from "./avatar-picker-demo";
import ThemeToggleDemo from "./theme-toggle-demo";
import CalendarDemo from "./calendar-demo";
import CalendarRangeDemo from "./calendar-range-demo";
import TimePickerDemo from "./time-picker-demo";
import DatePickerDemo from "./date-picker-demo";
import DatePickerStates from "./date-picker-states";
import ToggleDemo from "./toggle-demo";
import ToggleSettings from "./toggle-settings";
import CheckboxDemo from "./checkbox-demo";
import CheckboxGroup from "./checkbox-group";
import CheckboxStates from "./checkbox-states";
import RadioGroupDemo from "./radio-group-demo";
import RadioGroupForm from "./radio-group-form";
// Lazy: see ./lazy.tsx.
import { DraggableCardDemo, DraggableCardGrid, DraggableCardStates, RichTextEditorDemo, RichTextEditorForm } from "./lazy";

export const demos = {
	"button-demo": ButtonDemo,
	"button-variants": ButtonVariants,
	"button-destructive": ButtonDestructive,
	"button-sizes": ButtonSizes,
	"button-icons": ButtonIcons,
	"button-disabled": ButtonDisabled,
	"button-as-link": ButtonAsLink,
	"icon-button-demo": IconButtonDemo,
	"icon-button-variants": IconButtonVariants,
	"icon-button-destructive": IconButtonDestructive,
	"icon-button-sizes": IconButtonSizes,
	"typography-demo": TypographyDemo,
	"typography-headings": TypographyHeadings,
	"typography-text": TypographyText,
	"typography-blockquote": TypographyBlockquote,
	"typography-list": TypographyList,
	"typography-inline-code": TypographyInlineCode,
	"typography-table": TypographyTable,
	"typography-as": TypographyAs,
	"typography-fonts": TypographyFonts,
	"icon-demo": IconDemo,
	"icon-sizes": IconSizes,
	"icon-tones": IconTones,
	"icon-in-button": IconInButton,
	"icon-general": IconGeneral,
	"input-demo": InputDemo,
	"input-states": InputStates,
	"input-icons": InputIcons,
	"input-validation": InputValidation,
	"input-file": InputFile,
	"phone-input-demo": PhoneInputDemo,
	"phone-input-states": PhoneInputStates,
	"input-otp-demo": InputOtpDemo,
	"input-otp-states": InputOtpStates,
	"search-input-demo": SearchInputDemo,
	"alert-icon-demo": AlertIconDemo,
	"check-indicator-demo": CheckIndicatorDemo,
	"stepper-demo": StepperDemo,
	"stepper-states": StepperStates,
	"callout-demo": CalloutDemo,
	"badge-demo": BadgeDemo,
	"details-card-demo": DetailsCardDemo,
	"review-field-demo": ReviewFieldDemo,
	"dialog-demo": DialogDemo,
	"alert-dialog-demo": AlertDialogDemo,
	"confirm-dialog-demo": ConfirmDialogDemo,
	"slide-drawer-demo": SlideDrawerDemo,
	"slide-drawer-sides": SlideDrawerSides,
	"slide-drawer-sizes": SlideDrawerSizes,
	"toast-demo": ToastDemo,
	"upload-progress-demo": UploadProgressDemo,
	"upload-progress-states": UploadProgressStates,
	"timeline-demo": TimelineDemo,
	"input-textarea": InputTextarea,
	"tabs-demo": TabsDemo,
	"tabs-variants": TabsVariants,
	"pagination-demo": PaginationDemo,
	"pagination-states": PaginationStates,
	"status-badge-demo": StatusBadgeDemo,
	"approval-stage-demo": ApprovalStageDemo,
	"avatar-demo": AvatarDemo,
	"readiness-demo": ReadinessDemo,
	"empty-state-demo": EmptyStateDemo,
	"table-demo": TableDemo,
	"table-template": TableTemplate,
	"table-cells": TableCells,
	"header-demo": HeaderDemo,
	"breadcrumb-demo": BreadcrumbDemo,
	"meta-bar-demo": MetaBarDemo,
	"profile-card-demo": ProfileCardDemo,
	"profile-settings-demo": ProfileSettingsDemo,
	"avatar-picker-demo": AvatarPickerDemo,
	"theme-toggle-demo": ThemeToggleDemo,
	"calendar-demo": CalendarDemo,
	"calendar-range-demo": CalendarRangeDemo,
	"time-picker-demo": TimePickerDemo,
	"date-picker-demo": DatePickerDemo,
	"date-picker-states": DatePickerStates,
	"toggle-demo": ToggleDemo,
	"toggle-settings": ToggleSettings,
	"checkbox-demo": CheckboxDemo,
	"checkbox-group": CheckboxGroup,
	"checkbox-states": CheckboxStates,
	"radio-group-demo": RadioGroupDemo,
	"radio-group-form": RadioGroupForm,
	"rich-text-editor-demo": RichTextEditorDemo,
	"rich-text-editor-form": RichTextEditorForm,
	"draggable-card-demo": DraggableCardDemo,
	"draggable-card-grid": DraggableCardGrid,
	"draggable-card-states": DraggableCardStates,
};

export type DemoName = keyof typeof demos;
