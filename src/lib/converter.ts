export interface NumberFormatOptions {
  precision?: number;
  locale?: Intl.LocalesArgument;
  significantDigits?: number;
  fallbackValue?: string;
  fixedDecimals?: boolean;
}

/**
 * Formats number with a specified locale and precision.
 * i.e.: formatNumber(1.2345, 3) => '1.235'
 * @param num
 * @param options formatting options
 * @param options.precision number of decimal places
 * @param options.locale locale to format the number
 * @param options.significantDigits minimum number of significant digits
 * @param options.fallbackValue value to return if num is null or undefined
 * @returns formatted number
 */
export const formatNumber = (
  num: string | number | null | undefined,
  {
    precision = 2,
    locale,
    significantDigits = 0,
    fallbackValue = "",
    fixedDecimals = true
  }: NumberFormatOptions = {}
): string => {
  const numValue = Number(num);
  if (!Number.isFinite(numValue) || num === null) {
    return fallbackValue;
  }
  const isInteger = numValue % 1 === 0;
  const rounded = Intl.NumberFormat(locale as string, {
    minimumFractionDigits: isInteger ? 0 : fixedDecimals ? precision : 0,
    maximumFractionDigits: precision
  }).format(numValue);

  if (Number(rounded) === 0) {
    return "0";
  }

  if (significantDigits <= 0 || +rounded !== 0) {
    return rounded;
  }

  return Intl.NumberFormat(locale as string, {
    minimumSignificantDigits: 1,
    maximumSignificantDigits: significantDigits
  }).format(numValue);
};
