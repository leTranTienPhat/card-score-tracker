import { IPlayer } from "../models/playerModel";

function hasDuplicateNames(array: IPlayer[]): Set<string> | null {
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

function swapValues<T>(arr: T[], index1: number, index2: number): T[] {
  // Swap the values at the given indices
  [arr[index1], arr[index2]] = [arr[index2], arr[index1]];

  // Optionally, you can return the modified array if needed
  return [...arr];
}

function findPlayerNameById(arr: IPlayer[], id: number) {
  const foundPlayer = arr.find(obj => obj.playerId === id);
  return foundPlayer ? foundPlayer.playerName : '';
}

export { convertToKebabCase, hasDuplicateNames, swapValues, findPlayerNameById }

