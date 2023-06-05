function convertToKebabCase(string: string): string {
  const lowercaseString = string.toLowerCase();

  // Remove diacritics (accents) from the string
  const strippedString = lowercaseString.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Replace spaces and special characters with hyphens
  const kebabCaseString = strippedString.replace(/[\s_]/g, "-");

  return kebabCaseString;
}

export { convertToKebabCase }