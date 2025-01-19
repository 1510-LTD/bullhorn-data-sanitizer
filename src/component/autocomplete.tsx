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

// eslint-disable-next-line react/display-name
const ExpandIcon = forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>((props, ref) => {
  const expanded = props["aria-expanded"];
  return (
    <button {...props} ref={ref} style={{ cursor: "pointer" }}>
      {expanded ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
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
};

type AutocompleteValue<M extends boolean | undefined> = M extends true
  ? Array<Option["value"]>
  : Option["value"];

export interface AutocompleteProps<M extends boolean | undefined>
  extends Omit<
    React.ComponentProps<typeof TextField>,
    "onChange" | "value" | "trailingIcon" | "leadingInputNodes"
  > {
  label?: string;
  /**
   * Debounce time for querying remote options
   */
  debounce?: number;
  multiple?: M;
  options: Option[] | ((query: string) => Promise<Option[]>);
  onChange: (value: AutocompleteValue<M>) => void;
  filterSelectedOptions?: M extends true ? boolean : never;
  renderCheckboxes?: M extends true ? boolean : never;
  value?: AutocompleteValue<M>;
  defaultValue?: string | number | undefined;
}

const isMultipleValue = (
  _value: Array<Option["value"]> | Option["value"],
  multiple: boolean | undefined
): _value is Array<Option["value"]> => {
  return !!multiple;
};

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

const AutocompleteInner = <M extends boolean | undefined = false>(
  {
    value,
    onChange,
    label,
    placeholder = "Select",
    defaultValue,
    options: optionsParam = [],
    leadingIcon,
    filterSelectedOptions,
    renderCheckboxes,
    debounce = 300,
    multiple,
    disabled,
    className,
    ...props
  }: AutocompleteProps<M>,
  forwardedRef: React.ForwardedRef<HTMLInputElement>
) => {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState<Option[]>(
    typeof optionsParam === "function" ? [] : optionsParam
  );
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const debouncedQuery = useDebounce(query, debounce);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (Array.isArray(optionsParam)) {
      // Static options
      setOptions(optionsParam);
      return;
    }

    // Dynamic options
    optionsParam(debouncedQuery).then((fetchedOptions) => {
      setOptions(fetchedOptions);

      // Preserve labels of already selected options
      if (multiple && Array.isArray(value)) {
        const mergedOptions = [...fetchedOptions];
        value.forEach((val) => {
          if (!mergedOptions.find((opt) => opt.value === val)) {
            const selectedOption = selectedOptions.find(
              (opt) => opt.value === val
            );
            if (selectedOption) mergedOptions.push(selectedOption);
          }
        });
        setOptions(mergedOptions);
      }
    });
  }, [optionsParam, debouncedQuery, value, selectedOptions, multiple]);

  const handleChange = (option: Option | Option[]) => {
    if (Array.isArray(option)) {
      setSelectedOptions(option);
      onChange(option.map((opt) => opt.value) as AutocompleteValue<M>);
    } else {
      setSelectedOptions((prev) => [...prev, option]);
      onChange(option.value as AutocompleteValue<M>);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !query && isMultipleValue(value, multiple)) {
      const newValue = value.slice(0, -1);
      const updatedSelectedOptions = selectedOptions.slice(0, -1);
      setSelectedOptions(updatedSelectedOptions);
      onChange(newValue as AutocompleteValue<M>);
    }
  };

  const filteredOptions =
    query === ""
      ? options.filter(
          (o) =>
            !(
              isMultipleValue(value, multiple) &&
              filterSelectedOptions &&
              value?.includes(o.value)
            )
        )
      : options.filter((o) => {
          const option = o?.label?.toLowerCase().replace(/\s+/g, "");
          const currentQuery = query.toLowerCase().replace(/\s+/g, "");
          const currentlySelected =
            isMultipleValue(value, multiple) && value?.includes(o.value);
          return !currentlySelected && option?.includes(currentQuery);
        });

  return (
    <Combobox
      as={Wrapper}
      value={
        isMultipleValue(value, multiple)
          ? selectedOptions.filter((option) => value?.includes(option.value))
          : selectedOptions.find((option) => option.value === value) || null
      }
      onChange={handleChange}
      multiple={multiple as false | undefined}
      disabled={disabled}
      className={className}
    >
      <Combobox.Input
        as={TextField}
        label={label}
        displayValue={(option: Option) => option?.label || ""}
        onChange={(event) => setQuery(event.target.value)}
        onFocus={() => buttonRef.current?.click()}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        trailingIcon={
          isMultipleValue(value, multiple) && value?.length ? (
            <>
              <ResetButton
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedOptions([]);
                  onChange([] as unknown as AutocompleteValue<M>);
                }}
              />
              <Combobox.Button ref={buttonRef} as={ExpandIcon} />
            </>
          ) : (
            <Combobox.Button ref={buttonRef} as={ExpandIcon} />
          )
        }
        leadingIcon={leadingIcon}
        leadingInputNodes={
          isMultipleValue(value, multiple)
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
                      const updatedSelectedOptions = selectedOptions.filter(
                        (opt) => opt.value !== val
                      );
                      setSelectedOptions(updatedSelectedOptions);
                      onChange(newValue as AutocompleteValue<M>);
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
        <Combobox.Options as={MenuList} $density="low" $placement="stretch">
          {filteredOptions.length === 0 && query !== "" ? (
            <li>Nothing found</li>
          ) : (
            filteredOptions?.map((option) => (
              <Combobox.Option
                key={option.value}
                value={option}
                className={({ active, selected }) =>
                  active || (!renderCheckboxes && selected) ? "active" : ""
                }
              >
                {option.label}
              </Combobox.Option>
            ))
          )}
        </Combobox.Options>
      </Transition>
    </Combobox>
  );
};

AutocompleteInner.displayName = "Autocomplete";

// Hack to keep generic typing when using forwardRef
export const Autocomplete = forwardRef(AutocompleteInner) as <
  M extends boolean | undefined = false
>(
  props: AutocompleteProps<M> & { ref?: React.ForwardedRef<HTMLInputElement> }
) => React.ReactElement;
