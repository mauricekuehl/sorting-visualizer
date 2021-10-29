export function insertionSort(arr) {
  let animation = [];
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      animation.push(["c", j + 1]);
      animation.push(["p", j + 1, arr[j]]);
      animation.push(["r", j + 1]);
      j = j - 1;
    }
    animation.push(["c", j + 1]);
    animation.push(["p", j + 1, key]);
    animation.push(["removeCrolor", j + 1]);
    arr[j + 1] = key;
  }
  return animation;
}
