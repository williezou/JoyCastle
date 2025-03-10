# JoyCastle

请创建⼀个 CocosCreator ⼯程，使⽤ TypeScript 作为脚本语⾔，完成以下问题并确认运⾏⽆误后，将
项⽬提交到 github，然后把仓库地址提交给 HR，注意仓库不要设置为 private 类型，避免⽆法访问。

## Q1

创建⼀个场景，界⾯上有两个输⼊框，分别对应 X 和 Y 的值，还有⼀个⽣成按钮，点击⽣成按钮⽣成⼀
个 10 × 10 的可控随机矩阵，并显示到界⾯上，矩阵要求如下:

* ⾸先⾃由定义 5 种颜⾊
* 每个点可选 5 种颜⾊中的 1 种
* 按照从左到右，从上到下的顺序⽣成，(1, 1)为左上⻆点，(10, 10)为右下⻆点， (1, 10)为右上⻆点
* 点(1, 1)随机在 5 个颜⾊中选取
* 其他各点的颜⾊在基准概率上进⾏调整，设⽬标点坐标为(m, n)，规则如下:
    * (m, n - 1)所属颜⾊的概率增加 X%
    * (m - 1, n)所属颜⾊的概率增加 X%
    * 若(m, n - 1)和(m - 1 ,n)同⾊，则该颜⾊的概率只增加 Y%
    * 其他颜⾊平分剩下的概率
* 矩阵顺序为从左到右、从上到下

## Q2

现有整型数组 a、整型数组 b、以及整型 v，请编写函数，判断是否可以从 a 中选择⼀个数，从 b 中选
择⼀个数，⼆者相加等于 v，如可以返回 true，否则返回 false。⽐如如下输⼊将返回 true，因为 a 中
40 和 b 中 2 相加为 42。代码编写完毕后，⽤⼤ O 表示法分析⼀下代码的时间复杂度。

```js
a = [10, 40, 5, 280];
b = [234, 5, 2, 148, 23];
v = 42;
```

```TypeScript
function canSumToTarget(a: number[], b: number[], v: number): boolean {
    // 先对数组 a 和 b 进行排序
    a.sort((x, y) => x - y);
    b.sort((x, y) => x - y);

    let left = 0; // 指针从 a 的左侧开始
    let right = b.length - 1; // 指针从 b 的右侧开始

    while (left < a.length && right >= 0) {
        const sum = a[left] + b[right];
        if (sum === v) {
            return true;
        } else if (sum < v) {
            left++;// 和太小，移动左指针
        } else {
            right--;// 和太小，移动左指针
        }
    }

    return false;
}
```
排序的时间复杂度为 O(m log m + n log n)。

双指针法的时间复杂度为 O(m + n)。

总时间复杂度为 O(m log m + n log n)。


## Q3

请仔细观察附件中知名消除类游戏 Candy Crush 或 Candy Crush Saga 中选关界⾯对话框 Play 按钮的
动画效果，包括按钮出现，按钮按下，以及按钮弹起效果，使⽤ Cocos Creator 复制这⼀效果，使⽤代
码实现或者 Animation 编辑均可。