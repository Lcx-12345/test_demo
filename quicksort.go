package main

import "fmt"

func quickSort(arr []int, low, high int) {
	if low < high {
		pivotIndex := partition(arr, low, high)
		quickSort(arr, low, pivotIndex-1)
		quickSort(arr, pivotIndex+1, high)
	}
}

func partition(arr []int, low, high int) int {
	pivot := arr[high]
	i := low - 1
	for j := low; j < high; j++ {
		if arr[j] <= pivot {
			i++
			arr[i], arr[j] = arr[j], arr[i]
		}
	}
	arr[i+1], arr[high] = arr[high], arr[i+1]
	return i + 1
}

func main() {
	fmt.Println("快速排序演示")
	fmt.Println("========================================")

	testCases := [][]int{
		{64, 34, 25, 12, 22, 11, 90},
		{},
		{42},
		{1, 2, 3, 4, 5},
		{5, 4, 3, 2, 1},
	}

	for i, arr := range testCases {
		original := make([]int, len(arr))
		copy(original, arr)
		quickSort(arr, 0, len(arr)-1)
		fmt.Printf("测试用例 %d:\n", i+1)
		fmt.Printf("  原始: %v\n", original)
		fmt.Printf("  排序后: %v\n\n", arr)
	}
}
