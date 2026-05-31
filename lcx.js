function quickSort(arr) {
  if (arr.length <= 1) return arr

  const pivot = arr[Math.floor(arr.length / 2)]
  const left = []
  const middle = []
  const right = []

  for (const item of arr) {
    if (item < pivot) {
      left.push(item)
    } else if (item > pivot) {
      right.push(item)
    } else {
      middle.push(item)
    }
  }

  return [...quickSort(left), ...middle, ...quickSort(right)]
}

module.exports = quickSort
