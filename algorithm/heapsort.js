let length;
let animation;
function heap_root(input, i) {
  var left = 2 * i + 1;
  var right = 2 * i + 2;
  var max = i;

  if (left < length && input[left] > input[max]) {
    max = left;
  }

  if (right < length && input[right] > input[max]) {
    max = right;
  }

  if (max != i) {
    swape(input, i, max);
    heap_root(input, max);
  }
}

function swape(input, i, j) {
  var temp = input[i];
  input[i] = input[j];
  input[j] = temp;
  animation.push(["c", i]);
  animation.push(["c", j]);
  animation.push(["s", i, j]);
  animation.push(["r", i]);
  animation.push(["r", j]);
}

export function heapSort(input) {
  animation = [];
  length = input.length;
  for (var i = Math.floor(length / 2); i >= 0; i -= 1) {
    heap_root(input, i);
  }
  for (i = input.length - 1; i > 0; i--) {
    swape(input, 0, i);
    length--;

    heap_root(input, 0);
  }
  return animation;
}
