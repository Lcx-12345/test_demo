from __future__ import annotations


def quick_sort(values: list[int]) -> list[int]:
    if len(values) <= 1:
        return values[:]

    pivot = values[len(values) // 2]
    left = [x for x in values if x < pivot]
    middle = [x for x in values if x == pivot]
    right = [x for x in values if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)


def quick_sort_inplace(values: list[int], lo: int = 0, hi: int | None = None) -> None:
    if hi is None:
        hi = len(values) - 1
    if lo >= hi:
        return

    i, j = lo, hi
    pivot = values[(lo + hi) // 2]
    while i <= j:
        while values[i] < pivot:
            i += 1
        while values[j] > pivot:
            j -= 1
        if i <= j:
            values[i], values[j] = values[j], values[i]
            i += 1
            j -= 1

    if lo < j:
        quick_sort_inplace(values, lo, j)
    if i < hi:
        quick_sort_inplace(values, i, hi)


def _main() -> None:
    import sys

    data = sys.stdin.read().strip().split()
    if not data:
        return

    nums = [int(x) for x in data]
    quick_sort_inplace(nums)
    sys.stdout.write(" ".join(str(x) for x in nums))


if __name__ == "__main__":
    _main()
