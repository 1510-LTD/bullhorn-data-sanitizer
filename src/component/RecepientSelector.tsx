/* eslint-disable react/display-name */
import { forwardRef, useState, useRef, useEffect, Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { MenuList as MenuListBase } from "./menuList";
import { TextField } from "./textField";
import {
  ArrowDropDownIcon,
  ArrowDropUpIcon,
  CancelIcon,
  CloseIcon
} from "./icons";
import styled from "styled-components";
import { Chip, ChipProps } from "./chip";
import { useDebounce } from "@/app/hooks/useDebounce";
import { Checkbox } from "./checkbox";

const getIconSize = (variant: "small" | "medium" | "large") => {
  switch (variant) {
    case "small":
      return "medium";
    case "medium":
      return "large";
    case "large":
      return "larger";
    default:
      return "large";
  }
};

const ExpandIcon = forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>((props, ref) => {
  const expanded = props["aria-expanded"];
  const variant = "medium";
  const iconSize = getIconSize(variant);

  return (
    <button {...props} ref={ref} style={{ cursor: "pointer" }}>
      {expanded ? (
        <ArrowDropUpIcon size={iconSize} />
      ) : (
        <ArrowDropDownIcon size={iconSize} />
      )}
    </button>
  );
});

const Wrapper = styled.div`
  position: relative;

  .leave {
    transition: opacity 100ms ease-in;
  }
  .leaving {
    opacity: 1;
  }
  .left {
    opacity: 0;
  }
  .hidden {
    visibility: hidden;
  }
`;

const MenuList = styled(MenuListBase)`
  margin-top: -0.6875rem;
`;

type Option = Omit<React.OptionHTMLAttributes<unknown>, "value"> & {
  value: Exclude<
    React.OptionHTMLAttributes<unknown>["value"],
    readonly string[]
  >;
} & Record<string, string | number | undefined | null>;

type AutocompleteValue = Array<Option["value"]>;

export interface AutocompleteProps
  extends Omit<
    React.ComponentProps<typeof TextField>,
    "onChange" | "value" | "trailingIcon" | "leadingInputNodes"
  > {
  label?: string;
  debounce?: number;
  options: Option[] | ((query: string) => Promise<Option[]>);
  onChange: (value: AutocompleteValue) => void;
  filterSelectedOptions?: boolean;
  renderCheckboxes?: boolean;
  value?: AutocompleteValue;
  defaultValue?: string | number | undefined;
  renderOption?: (option: Option) => React.ReactNode;
  initialSelectedOptions?: Option[];
}

const StyledButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
`;

const ResetButton = (props: React.ComponentProps<"button">) => (
  <StyledButton style={{ cursor: "pointer" }} {...props}>
    <CloseIcon size="medium" />
  </StyledButton>
);

const CloseableChip = ({
  onClose,
  ...props
}: Omit<ChipProps, "trailingIcon" | "leadingIcon"> & {
  onClose: () => void;
}) => (
  <Chip
    {...props}
    trailingIcon={
      <StyledButton style={{ cursor: "pointer" }} onClick={onClose}>
        <CancelIcon size="small" />
      </StyledButton>
    }
  ></Chip>
);

const AutocompleteInner = (
  {
    value,
    onChange,
    label,
    placeholder = "Select",
    defaultValue,
    options: optionsParam = [],
    initialSelectedOptions = [],
    leadingIcon,
    filterSelectedOptions,
    renderCheckboxes,
    debounce = 300,
    disabled,
    className,
    renderOption,
    ...props
  }: AutocompleteProps,
  forwardedRef: React.ForwardedRef<HTMLInputElement>
) => {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState(
    typeof optionsParam === "function" ? [] : optionsParam
  );
  const debouncedQuery = useDebounce(query, debounce);

  const [selectedOptions, setSelectedOptions] = useState<Option[]>(
    initialSelectedOptions
  );

  useEffect(() => {
    if (initialSelectedOptions.length > 0) {
      setSelectedOptions(
        initialSelectedOptions.filter(
          (opt) => Array.isArray(value) && value.includes(opt.value)
        )
      );
    }
  }, [value, initialSelectedOptions]);

  useEffect(() => {
    if (
      Array.isArray(optionsParam) &&
      JSON.stringify(optionsParam) !== JSON.stringify(options)
    ) {
      setOptions(optionsParam);
      return;
    }

    if (Array.isArray(optionsParam)) return;

    optionsParam(debouncedQuery).then(setOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionsParam, debouncedQuery, JSON.stringify(options)]);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const mergedOptionsWithSelected = [...options, ...selectedOptions].filter(
    (option, index, self) =>
      index === self.findIndex((o) => o.value === option.value)
  );

  const filteredOptions =
    query === ""
      ? mergedOptionsWithSelected.filter(
          (o) => !(filterSelectedOptions && value?.includes(o.value))
        )
      : mergedOptionsWithSelected.filter((o) => {
          const option = o?.label?.toLowerCase().replace(/\s+/g, "");
          const currentQuery = query.toLowerCase().replace(/\s+/g, "");
          const currentlySelected = value?.includes(o.value);
          return !currentlySelected && option?.includes(currentQuery);
        });

  // We want to auto select the first option if the user types something and then blurs.
  // This is a hack to prevent headlessUI from auto selecting when nothing is typed.
  const headlessUIHack = !query && (
    <Combobox.Option value={{ text: "" }} className="hidden" />
  );

  const handleChange = (option: Option | Option[]) => {
    if (Array.isArray(option)) {
      setSelectedOptions(option);
      onChange(option?.map((opt) => opt.value) as AutocompleteValue);
    } else {
      setSelectedOptions([option]);
      onChange([option.value] as AutocompleteValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !query && Array.isArray(value)) {
      const newValue = value.slice(0, -1);
      setSelectedOptions(
        options.filter((option) => newValue.includes(option.value))
      );
      onChange(newValue as AutocompleteValue);
    }
  };

  return (
    <Combobox
      as={Wrapper}
      value={selectedOptions}
      onChange={handleChange}
      multiple={true}
      disabled={disabled}
      className={className}
    >
      <Combobox.Input
        as={TextField}
        label={label}
        defaultValue={
          options?.find((option) => option.value === defaultValue) || null
        }
        displayValue={(option: Option) => option?.label || ""}
        onChange={(event) => setQuery(event.target.value)}
        onFocus={() => buttonRef.current?.click()}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        trailingIcon={
          <>
            <ResetButton
              onClick={(e) => {
                e.preventDefault();
                setSelectedOptions([]);
                onChange([] as unknown as AutocompleteValue);
              }}
            />
            <Combobox.Button ref={buttonRef} as={ExpandIcon} />
          </>
        }
        leadingIcon={leadingIcon}
        leadingInputNodes={
          Array.isArray(value)
            ? value?.map((val) => {
                const label = selectedOptions.find(
                  (option) => option.value === val
                )?.label;
                if (!label) return null;

                return (
                  <CloseableChip
                    key={val}
                    label={label}
                    onClose={() => {
                      const newValue = value.filter((v) => v !== val);
                      setSelectedOptions(
                        selectedOptions.filter((option) =>
                          newValue.includes(option.value)
                        )
                      );
                      onChange(newValue as AutocompleteValue);
                    }}
                  />
                );
              })
            : undefined
        }
        data-1p-ignore
        {...props}
        ref={forwardedRef}
      />
      <Transition
        as={Fragment}
        leave="leave"
        leaveFrom="leaving"
        leaveTo="left"
        afterLeave={() => setQuery("")}
      >
        <Combobox.Options
          as={MenuList}
          $density="low"
          $placement="stretch"
          onSelect={() => false}
        >
          {filteredOptions.length === 0 && query !== "" ? (
            <li>Nothing found</li>
          ) : (
            <>
              {headlessUIHack}
              {filteredOptions?.map((option) => (
                <Combobox.Option
                  key={option?.value}
                  className={({ active, selected }) =>
                    active || (!renderCheckboxes && selected) ? "active" : ""
                  }
                  value={option}
                  disabled={option.disabled}
                  onClick={(e) => {
                    const isSelected = value?.includes(option.value);
                    const filteredValues =
                      value?.filter((v) => v !== option.value) ?? [];

                    const newValue = isSelected
                      ? filteredValues
                      : [...filteredValues, option.value];
                    const newSelectedOptions = isSelected
                      ? selectedOptions.filter((o) => o.value !== option.value)
                      : [...selectedOptions, option];

                    setSelectedOptions(newSelectedOptions);
                    onChange(newValue as AutocompleteValue);
                    e.preventDefault();
                  }}
                >
                  {renderCheckboxes && (
                    <Checkbox
                      checked={value?.includes(option.value)}
                      onCheckedChange={(checked) => {
                        const filteredValues = value?.filter(
                          (v) => v !== option.value
                        );
                        const newValue = checked
                          ? [...(filteredValues ?? []), option.value]
                          : filteredValues;
                        setSelectedOptions(
                          checked
                            ? [...selectedOptions, option]
                            : selectedOptions.filter(
                                (o) => o.value !== option.value
                              )
                        );
                        onChange(newValue as AutocompleteValue);
                      }}
                    />
                  )}
                  {renderOption ? renderOption(option) : option?.label}
                </Combobox.Option>
              ))}
            </>
          )}
        </Combobox.Options>
      </Transition>
    </Combobox>
  );
};

AutocompleteInner.displayName = "Autocomplete";

export const RecipientSelector = forwardRef(AutocompleteInner) as (
  props: AutocompleteProps & { ref?: React.ForwardedRef<HTMLInputElement> }
) => React.ReactElement;
