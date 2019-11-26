/**
 * 二分查找:有序数列的查找
 * 时间复杂度：O(log n)
 * @param {*} arr
 * @param {*} val
 */
function binarySearch(arr, val) {
  const len = arr.length
  let begin = 0
  let end = len - 1

  while (begin <= end) {
    let middle = parseInt((begin + end) / 2)
    if (val < arr[middle]) {
      end = middle - 1
    } else if (val > arr[middle]) {
      begin = middle + 1
    } else {
      return middle
    }
  }

  return 'Sorry, not Found.'
}
