package com.bytedance.myapplication

import org.junit.Test

import org.junit.Assert.*

/**
 * Example local unit test, which will execute on the development machine (host).
 *
 * See [testing documentation](http://d.android.com/tools/testing).
 */
class ExampleUnitTest {

    @Test
    fun addition_isCorrect() {
        assertEquals(4, 2 + 2)
    }

    @Test
    fun quickSort_sortsArrayCorrectly() {
        val arr = intArrayOf(64, 34, 25, 12, 22, 11, 90)
        val expected = intArrayOf(11, 12, 22, 25, 34, 64, 90)
        quickSort(arr)
        assertArrayEquals(expected, arr)
    }

    @Test
    fun quickSort_emptyArray_doesNothing() {
        val arr = intArrayOf()
        quickSort(arr)
        assertArrayEquals(intArrayOf(), arr)
    }

    @Test
    fun quickSort_singleElementArray_doesNothing() {
        val arr = intArrayOf(42)
        quickSort(arr)
        assertArrayEquals(intArrayOf(42), arr)
    }

    @Test
    fun quickSort_alreadySortedArray_remainsSorted() {
        val arr = intArrayOf(1, 2, 3, 4, 5)
        val expected = intArrayOf(1, 2, 3, 4, 5)
        quickSort(arr)
        assertArrayEquals(expected, arr)
    }

    @Test
    fun quickSort_reverseSortedArray_sortsCorrectly() {
        val arr = intArrayOf(5, 4, 3, 2, 1)
        val expected = intArrayOf(1, 2, 3, 4, 5)
        quickSort(arr)
        assertArrayEquals(expected, arr)
    }
}