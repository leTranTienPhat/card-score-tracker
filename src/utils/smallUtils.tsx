interface IHasPlayerName {
  playerName: string
}

function hasDuplicateNames<T extends IHasPlayerName>(array: T[]): Set<string> | null {
  const encounteredNames = new Set<string>();

  for (let i = 0; i < array.length; i++) {
    const name = array[i].playerName;

    if (encounteredNames.has(name)) {
      return encounteredNames; // Duplicate name found
    }

    encounteredNames.add(name);
  }

  return null; // No duplicate names found
}

function convertToKebabCase(string: string): string {
  const lowercaseString = string.toLowerCase();

  // Remove diacritics (accents) from the string
  const strippedString = lowercaseString.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Replace spaces and special characters with hyphens
  const kebabCaseString = strippedString.replace(/[\s_]/g, "-");

  return kebabCaseString;
}

export { convertToKebabCase, hasDuplicateNames }
