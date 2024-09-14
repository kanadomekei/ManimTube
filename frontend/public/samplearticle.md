# クイックソートアルゴリズム

## 概要
クイックソートは効率的で広く使用されている比較ベースのソートアルゴリズムです。分割統治法を用いて大きな問題を小さな問題に分解し、再帰的に解決します。

## 詳細な説明
クイックソートは、リストから「ピボット」要素を選び、それより小さい要素を左に、大きい要素を右に分割することで動作します。この過程を再帰的に繰り返すことで、最終的にソートされたリストが得られます。平均的なケースでは非常に効率的ですが、最悪のケースでは性能が低下する可能性があります。

## ステップ
1. **ピボットの選択**
- リストから1つの要素をピボットとして選びます。一般的には、最初、最後、またはランダムな要素が選ばれます。

## コード例

```typescript
function quickSort(arr: number[], low: number, high: number): void {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
}

function partition(arr: number[], low: number, high: number): number {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}
```

## 時間計算量

- 平均ケース: O(n log n)
- 最悪ケース: O(n^2)
- 最良ケース: O(n log n)

## 空間計算量

- 最悪ケース: O(log n)

## 利点

1. 平均的に非常に効率的
2. インプレースソートが可能（追加のメモリ空間をほとんど必要としない）
3. キャッシュフレンドリー

## 欠点

1. 最悪ケースの性能が悪い（ただし、ランダム化により回避可能）
2. 不安定なソートアルゴリズム

## まとめ

クイックソートは、その効率性と実装の簡単さから、多くのプログラミング言語の標準ライブラリで採用されています。適切に実装すれば、実際のアプリケーションで非常に高速に動作します。