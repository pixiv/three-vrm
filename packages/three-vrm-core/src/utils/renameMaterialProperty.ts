export function renameMaterialProperty(name: string): string {
  if (name[0] !== '_') {
    console.warn(`renameMaterialProperty: Given property name "${name}" might be invalid`);
    return name;
  }
  name = name.substring(1);

  if (!/[A-Z]/.test(name[0])) {
    console.warn(`renameMaterialProperty: Given property name "${name}" might be invalid`);
    return name;
  }
  return name[0].toLowerCase() + name.substring(1);
}
