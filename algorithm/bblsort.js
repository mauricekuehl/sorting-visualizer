export function bblSort(arr) {
  let animation = [];
  let count = 0;
  for (var i = 0; i < arr.length; i++) {
    animation.push(["c", 0]);
    for (var j = 0; j < arr.length - i - 1; j++) {
      count++;
      animation.push(["c", j + 1]);
      if (arr[j] > arr[j + 1]) {
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        animation.push(["s", j, j + 1]);
      }
      animation.push(["r", j]);
    }
    animation.push(["r", arr.length - i - 1]);
  }

  return animation;
}
