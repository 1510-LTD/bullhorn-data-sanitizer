import { BodyText2, CaptionText } from "@/utils/fonts";

export const getKeyPairJsxLabel = (
  label: string,
  value: string | number | undefined
) => {
  return (
    <span>
      <CaptionText>{label}: </CaptionText>
      <BodyText2>{value}</BodyText2>
    </span>
  );
};

interface SelectOption {
  value: string | number | undefined;
  label: string;
}

export const withEmptyOption = (options: SelectOption[], label = "") => {
  return [{ value: "", label }, ...options];
};
