export function shellSort(arr) {
  let animation = [];
  var increment = arr.length / 2;
  while (increment > 0) {
    for (let i = increment; i < arr.length; i++) {
      var j = i;
      var temp = arr[i];

      while (j >= increment && arr[j - increment] > temp) {
        arr[j] = arr[j - increment];
        animation.push(["c", j]);
        animation.push(["p", j, arr[j - increment]]);
        animation.push(["r", j]);
        j = j - increment;
      }
      animation.push(["c", j]);
      animation.push(["p", j, temp]);
      animation.push(["r", j]);
      arr[j] = temp;
    }

    if (increment == 2) {
      increment = 1;
    } else {
      increment = parseInt((increment * 5) / 11);
    }
  }
  return animation;
}
