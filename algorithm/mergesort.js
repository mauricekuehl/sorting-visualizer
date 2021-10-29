var animation = [];
export function mergeSort(array) {
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray);
  return animation;
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    animation.push(["c", j]);
    animation.push(["c", i]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animation.push(["p", k, auxiliaryArray[i]]);
      animation.push(["r", j]);
      animation.push(["r", i]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animation.push(["p", k, auxiliaryArray[j]]);
      animation.push(["r", j]);
      animation.push(["r", i]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animation.push(["c", i]);
    animation.push(["p", k, auxiliaryArray[i]]);
    animation.push(["r", i]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animation.push(["c", j]);
    animation.push(["p", k, auxiliaryArray[j]]);
    animation.push(["r", j]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}
