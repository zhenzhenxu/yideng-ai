//冒泡排序
export const bubbleSort = (arr: number[]): number[] => {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
};

//快速排序
export const quickSort = (arr: number[]): number[] => {
  if (arr.length <= 1) return arr;
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(item => item < pivot);
  const right = arr.filter(item => item > pivot);
  return [...quickSort(left), pivot, ...quickSort(right)];
};

//二分查找