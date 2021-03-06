import { IRenderFunction, IStyleFunctionOrObject } from '../../Utilities';
import { IStyle, ITheme } from '../../Styling';
import { ISelectableOption } from '../../utilities/selectableOption/SelectableOption.types';
import { ISelectableDroppableTextProps } from '../../utilities/selectableOption/SelectableDroppableText.types';
import { ResponsiveMode } from '../../utilities/decorators/withResponsiveMode';
import { IKeytipProps } from '../../Keytip';
import { ILabelStyleProps } from '../../Label';

export { SelectableOptionMenuItemType as DropdownMenuItemType } from '../../utilities/selectableOption/SelectableOption.types';

export interface IDropdown {
  focus: (shouldOpenOnFocus?: boolean) => void;
}

export interface IDropdownProps extends ISelectableDroppableTextProps<IDropdown, HTMLDivElement> {
  /**
   * Input placeholder text. Displayed until option is selected.
   */
  placeHolder?: string;

  /**
   * Options for the dropdown.
   */
  options: IDropdownOption[];

  /**
   * Callback issued when the selected option changes.
   */
  onChange?: (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => void;

  /**
   * @deprecated Use onChange instead.
   */
  onChanged?: (option: IDropdownOption, index?: number) => void;

  /**
   * Callback issues when the options callout is dismissed
   */
  onDismiss?: () => void;

  /**
   * Optional custom renderer for placeholder text
   */
  onRenderPlaceHolder?: IRenderFunction<IDropdownProps>;

  /**
   * Optional custom renderer for selected option displayed in input
   */
  onRenderTitle?: IRenderFunction<IDropdownOption | IDropdownOption[]>;

  /**
   * Optional custom renderer for chevron icon
   */
  onRenderCaretDown?: IRenderFunction<IDropdownProps>;

  /**
   * Custom width for dropdown. If value is 0, width of the input field is used.
   * @default 0
   */
  dropdownWidth?: number;

  responsiveMode?: ResponsiveMode;

  /**
   * Optional mode indicates if multi-choice selections is allowed.  Default to false
   */
  multiSelect?: boolean;

  /**
   * Keys that will be initially used to set selected items.
   */
  defaultSelectedKeys?: string[] | number[];

  /**
   * Keys of the selected items. If you provide this, you must maintain selection
   * state by observing onChange events and passing a new value in when changed.
   */
  selectedKeys?: string[] | number[];

  /**
   * When multiple items are selected, this still will be used to separate values in
   * the dropdown title.
   *
   * @defaultValue ", "
   */
  multiSelectDelimiter?: string;

  /**
   * Deprecated at v0.52.0, use 'disabled' instead.
   * @deprecated
   */
  isDisabled?: boolean;

  /**
   * Optional keytip for this dropdown
   */
  keytipProps?: IKeytipProps;

  /**
   * Theme provided by higher order component.
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IDropdownStyleProps, IDropdownStyles>;
}

export interface IDropdownOption extends ISelectableOption {
  /**
   * Deprecated at v.65.1, use 'selected' instead.
   * @deprecated
   */
  isSelected?: boolean;
}

/**
 * The props needed to construct styles. This represents the simplified set of immutable things which control the class names.
 */
export type IDropdownStyleProps = Pick<IDropdownProps, 'theme' | 'className' | 'disabled' | 'required'> & {
  /**
   * Whether the dropdown is in an error state.
   */
  hasError: boolean;

  /**
   * Whether the dropdown is in an opened state.
   */
  isOpen: boolean;

  /**
   * Whether the dropdown is presently rendering a placeholder.
   */
  isRenderingPlaceholder: boolean;

  /**
   * Optional custom classname for the panel that displays in small viewports, hosting the Dropdown options.
   * This is primarily provided for backwards compatibility.
   */
  panelClassName?: string;

  /**
   * Optional custom classname for the callout that displays in larger viewports, hosting the Dropdown options.
   * This is primarily provided for backwards compatibility.
   */
  calloutClassName?: string;
};

/**
 * Represents the stylable areas of the control.
 */
export interface IDropdownStyles {
  /** Root element of the Dropdown (includes Label and the actual Dropdown). */
  root: IStyle;

  /** Refers to the label associated with the dropdown. This is enclosed by the root. */
  label: IStyle;

  /** Refers to the actual Dropdown element. */
  dropdown: IStyle;

  /** Refers to the primary title of the Dropdown (rendering the selected options/placeholder/etc.). */
  title: IStyle;

  /** Refers to the wrapping container around the downward pointing caret users click on to expand the Dropdown. */
  caretDownWrapper: IStyle;

  /** Refers to the downward pointing caret icon users click on to expand the Dropdown. */
  caretDown: IStyle;

  /** Refers to the error message being rendered under the Dropdown (if any). */
  errorMessage: IStyle;

  /** Refers to the element that wraps `dropdownItems`. */
  dropdownItemsWrapper: IStyle;

  /** Refers to the FocusZone wrapping the individual dropdown items. */
  dropdownItems: IStyle;

  /** Refers to the individual dropdown item. */
  dropdownItem: IStyle;

  /** Style for a dropdown item when it is being selected. */
  dropdownItemSelected: IStyle;

  /** Style for a dropdown item when it is disabled. */
  dropdownItemDisabled: IStyle;

  /** Style for a dropdown item when it is both selected and disabled. */
  dropdownItemSelectedAndDisabled: IStyle;

  /**
   * Refers to the text element that renders the actual dropdown item/option text. This would be wrapped by the element
   * referred to by `dropdownItem`.
   */
  dropdownOptionText: IStyle;

  /** Refers to the dropdown seperator. */
  dropdownDivider: IStyle;

  /** Refers to the individual dropdown items that are being rendered as a header. */
  dropdownItemHeader: IStyle;

  /**
   * Refers to the panel that hosts the Dropdown options in small viewports.
   * Note: This will be deprecated when Panel supports JS Styling.
   */
  panel: IStyle;

  /** Refers to the callout that hosts Dropdown options in larger viewports. */
  callout: IStyle;

  /** Subcomponent styles. */
  subComponentStyles: IDropdownSubComponentStyles;
}

export interface IDropdownSubComponentStyles {
  /** Refers to the panel that hosts the Dropdown options in small viewports. */
  // panel: IStyleFunctionOrObject<IPanelStyleProps, IPanelStyles>; // #5689: this relies on Panel supporting JS styling.

  /** Refers to the primary label for the Dropdown. */
  label: IStyleFunctionOrObject<ILabelStyleProps, any>;
  // #5690: replace any with ILabelStyles in TS 2.9
}
