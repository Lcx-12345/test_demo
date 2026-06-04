fun quickSort(arr: IntArray, low: Int = 0, high: Int = arr.size - 1) {
    if (low < high) {
        val pivotIndex = partition(arr, low, high)
        quickSort(arr, low, pivotIndex - 1)
        quickSort(arr, pivotIndex + 1, high)
    }
}

private fun partition(arr: IntArray, low: Int, high: Int): Int {
    val pivot = arr[high]
    var i = low - 1
    for (j in low until high) {
        if (arr[j] <= pivot) {
            i++
            val temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp
        }
    }
    val temp = arr[i + 1]
    arr[i + 1] = arr[high]
    arr[high] = temp
    return i + 1
}

fun main() {
    println("快速排序演示")
    println("=".repeat(40))

    val testCases = listOf(
        intArrayOf(64, 34, 25, 12, 22, 11, 90),
        intArrayOf(),
        intArrayOf(42),
        intArrayOf(1, 2, 3, 4, 5),
        intArrayOf(5, 4, 3, 2, 1)
    )

    testCases.forEachIndexed { index, arr ->
        val original = arr.copyOf()
        quickSort(arr)
        println("测试用例 ${index + 1}:")
        println("  原始: ${original.contentToString()}")
        println("  排序后: ${arr.contentToString()}")
        println()
    }
}
