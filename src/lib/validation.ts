export type DimensionValidation = {
  isValid: boolean;
  isWidthValid: boolean;
  isLengthValid: boolean;
  isThicknessValid: boolean;
  errorMessage?: string;
};

export function validateDimensions(
  widthStr: string,
  lengthStr: string,
  thicknessStr: string
): DimensionValidation {
  const w = parseFloat(widthStr);
  const l = parseFloat(lengthStr);
  const t = parseFloat(thicknessStr);

  const isWidthValid = !isNaN(w) && w >= 2.25 && w <= 4.5;
  const isLengthValid = !isNaN(l) && l >= 6.25 && l <= 10.0;
  const isThicknessValid = !isNaN(t) && t >= 25 && t <= 60;

  const errors: string[] = [];
  if (!isWidthValid) errors.push("Width (2.25 - 4.5 ft)");
  if (!isLengthValid) errors.push("Length (6.25 - 10 ft)");
  if (!isThicknessValid) errors.push("Thickness (25 - 60 mm)");

  const isValid = isWidthValid && isLengthValid && isThicknessValid;

  return {
    isValid,
    isWidthValid,
    isLengthValid,
    isThicknessValid,
    errorMessage: isValid
      ? undefined
      : `Not available! Allowed specifications: ${errors.join(", ")}`,
  };
}
