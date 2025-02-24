import { _decorator, Button, color, Component, EditBox, instantiate, Layout, log, Node, Size, Sprite, UITransform, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

const COLORS = [
    color(255, 0, 0),   // 红色
    color(0, 255, 0),   // 绿色
    color(0, 0, 255),   // 蓝色
    color(255, 255, 0), // 黄色
    color(255, 0, 255)  // 紫色
];

@ccclass('MainScene')
export class MainScene extends Component {
    @property(EditBox)
    xInput: EditBox = null; // X 值输入框

    @property(EditBox)
    yInput: EditBox = null; // Y 值输入框

    @property(Node)
    matrixContainer: Node = null; // 矩阵容器

    @property(Node)
    createBtn: Node = null;

    @property(Node)
    cell: Node = null;

    private matrix: number[][] = []; // 存储矩阵颜色索引

    private x: number = 0; // X 值
    private y: number = 0; // Y 值
    onLoad() {
        this.createBtn.getComponentInChildren(Button).node.on(Button.EventType.CLICK, this.generateMatrix, this);
    }

    onDestroy() {
        this.createBtn.getComponentInChildren(Button).node.off(Button.EventType.CLICK, this.generateMatrix, this);
    }
    

    start() {
        // 清空矩阵容器
        this.matrixContainer.destroyAllChildren();
    }

    // 生成矩阵
    generateMatrix() {
        const x = parseFloat(this.xInput.string); // 获取 X 值
        const y = parseFloat(this.yInput.string); // 获取 Y 值

        this.x = x;
        this.y = y;

        if (isNaN(x) || isNaN(y)) {
            log("请输入有效的 X 和 Y 值");
            return;
        }

        if (x <= 0 || y <= 0) {
            log("X 和 Y 值必须大于 0");
            return;
        }
        if(x < y) {
            log("X 值必须大于 Y 值");
            return;
        }

        // 初始化矩阵
        this.matrix = [];
        for (let i = 0; i < this.x; i++) {
            this.matrix[i] = new Array(this.y).fill(-1);
        }

        // 生成矩阵
        for (let i = 0; i < this.x; i++) {
            for (let j = 0; j < this.y; j++) {
                this.matrix[i][j] = this.getColorIndex(i, j, x, y);
            }
        }

        for (let index = 0; index < x * y; index++) {

            const i = Math.floor(index / x); // 行索引
            const j = index % y; // 列索引

            this.matrix[i][j] = this.getColorIndex(i, j, x, y);
        }

        // 显示矩阵
        this.displayMatrix();
    }

    // 获取颜色索引
    getColorIndex(i: number, j: number, x: number, y: number): number {
        if (i === 0 && j === 0) {
            // 第一个点随机选择颜色
            return Math.floor(Math.random() * 5);
        }

        // 获取左边和上边的颜色
        const leftColor = j > 0 ? this.matrix[i][j - 1] : -1;
        const topColor = i > 0 ? this.matrix[i - 1][j] : -1;

        // 计算颜色概率
        const probabilities = this.calculateProbabilities(leftColor, topColor, x, y);

        // 根据概率选择颜色
        const random = Math.random();
        let cumulativeProbability = 0;
        for (let k = 0; k < 5; k++) {
            cumulativeProbability += probabilities[k];
            if (random < cumulativeProbability) {
                return k;
            }
        }

        return 0;
    }

    // 计算颜色概率
    calculateProbabilities(leftColor: number, topColor: number, x: number, y: number): number[] {
        const probabilities = new Array(5).fill(0.2); // 初始概率

        if (leftColor !== -1) {
            probabilities[leftColor] += x / 100;
        }
        if (topColor !== -1) {
            probabilities[topColor] += x / 100;
        }
        if (leftColor !== -1 && topColor !== -1 && leftColor === topColor) {
            probabilities[leftColor] += y / 100;
        }

        // 归一化概率
        const sum = probabilities.reduce((a, b) => a + b, 0);
        return probabilities.map(p => p / sum);
    }

    // 显示矩阵
    displayMatrix() {
        this.matrixContainer.destroyAllChildren();

        this.matrixContainer.getComponent(UITransform).contentSize = new Size((40 * this.x + 2 * (this.x - 1) + 4), (40 * this.y + 2 * (this.y - 1) + 4));

        for (let index = 0; index < this.x * this.y; index++) {

            const i = Math.floor(index / this.x); // 行索引
            const j = index % this.y; // 列索引

            const _cell = instantiate(this.cell);
            _cell.active = true;

            _cell.getComponent(Sprite).color = COLORS[this.matrix[i][j]];

            this.matrixContainer.addChild(_cell);
        }
    }
}


