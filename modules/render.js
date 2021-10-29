export function all(arr) {
  var t0 = performance.now();
  document.querySelector("#main").innerHTML = arr
    .map(
      (i, index) =>
        `<div class="bar" data-pos="${index}" style="height:${i}px;"></div>`
    )
    .join("");
  var t1 = performance.now();
  console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");
}
export function swap(pos1, pos2) {
  let pos1height = document.querySelector(`[data-pos='${pos1}']`).style.height;
  document.querySelector(`[data-pos='${pos1}']`).style.height =
    document.querySelector(`[data-pos='${pos2}']`).style.height;
  document.querySelector(`[data-pos='${pos2}']`).style.height = pos1height;
}
export function pos(pos, value) {
  document.querySelector(`[data-pos='${pos}']`).style.height = `${value}px`;
}
