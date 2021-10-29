var animation = [];
function partition(arr, left, right) {
  var pivot = arr[Math.floor((right + left) / 2)],
    i = left,
    j = right;

  while (i <= j) {
    while (arr[i] < pivot) {
      i++;
    }
    while (arr[j] > pivot) {
      j--;
    }
    animation.push(["c", j]);
    animation.push(["c", i]);

    if (i <= j) {
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      animation.push(["s", i, j]);
      i++;
      j--;
    }
    animation.push(["r", i - 1]);
    animation.push(["r", j + 1]);
  }
  return i;
}
export function quickSort(arr, left, right) {
  animation = [];
  quickSortMain(arr, left, right);
  return animation;
}

function quickSortMain(arr, left, right) {
  var index;
  if (arr.length > 1) {
    index = partition(arr, left, right);

    if (left < index - 1) {
      quickSortMain(arr, left, index - 1);
    }
    if (index < right) quickSortMain(arr, index, right);
  }
}
