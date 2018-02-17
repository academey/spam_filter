export default function removeDuplicateUsingSet(arr: any[]) {
  let unique_array = Array.from(new Set(arr));
  return unique_array;
}
