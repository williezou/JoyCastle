
import { _decorator, Button, Component, Quat, tween, UIOpacity, v3, Vec3} from 'cc';
const { ccclass, property } = _decorator;

@ccclass
export default class PlayButtonController extends Component {

    @property(Button)
    playButton: Button = null;

    private originalScale: Vec3 = new Vec3(1, 1, 1);
    private originalPosition: Vec3 = new Vec3(0, -300, 0); // 按钮原始位置
    private isAnimating: boolean = false;

    protected declare spOpacity: UIOpacity;

    onLoad() {
        this.node.setScale(0, 0);
        this.spOpacity = this.playButton.getComponent(UIOpacity);
        this.spOpacity.opacity = 0;

        this.playAppearAnimation();


        this.playButton.node.on('click', this.onButtonClick, this);
    }


    playAppearAnimation() {
        tween(this.node)
            .to(0.5, { scale: this.originalScale}, { easing: 'backOut' })
            .call(() => {
                this.playBreathAnimation();
                //this.playShakeAnimation();
            })
            .start();
        tween(this.spOpacity).to(0.5, {opacity: 255}).start();
    }

    playBreathAnimation() {
        tween(this.node)
            .to(0.8, { scale: v3(0.95, 1, 1) }, { easing: 'sineInOut' })
            .to(0.8, { scale: v3(1, 0.98, 1) } , { easing: 'sineInOut' })
            .union()
            .repeatForever()
            .start();

        tween(this.spOpacity)
            .to(0.8, { opacity: 125 }, { easing: 'sineInOut' })
            .to(0.8, { opacity: 255 }, { easing: 'sineInOut' })
            .union()
            .repeatForever()
            .start();
    }
    // 播放抖动效果
    playShakeAnimation() {
        // 抖动动画
        tween(this.node)
            .by(0.1, { position: v3(0.5, 0.5, 0) }, { easing: 'sineInOut' }) // 向右上移动
            .by(0.1, { position: v3(-0.5, -0.5, 0) }, { easing: 'sineInOut' }) // 向左下移动
            .by(0.1, { position: v3(-0.5, 0.5, 0) }, { easing: 'sineInOut' }) // 向左上移动
            .by(0.1, { position: v3(0.5, -0.5, 0) }, { easing: 'sineInOut' }) // 向右下移动
            .to(0.1, { position: this.originalPosition }, { easing: 'sineInOut' }) // 回到原点
            .union() // 将动画合并
            .repeatForever() // 无限循环
            .start();

        // tween(this.node)
        // .by(0.1, { rotation: Quat.fromEuler(new Quat(), 0, 0, 5) }, { easing: 'sineInOut' }) // 顺时针旋转
        // .by(0.1, { rotation: Quat.fromEuler(new Quat(), 0, 0, -5) }, { easing: 'sineInOut' }) // 逆时针旋转
        // .union() // 将动画合并
        // .repeatForever() // 无限循环
        // .start();
    }
    onButtonClick() {
        if (this.isAnimating) return;

        this.isAnimating = true;

        tween(this.node)
        .to(0.1, { scale: v3(0.8, 0.8, 1) }, { easing: 'sineInOut' })
        .to(0.1, { scale: this.originalScale} , { easing: 'sineInOut' })
        .call(() => {this.isAnimating = false;})
        .union()
        .start();

 
        // tween(this.node)
        //     .to(0.1, { scale: v3(0.8, 0.8, 1) })
        //     .call(() => {
        //         tween(this.node)
        //             .to(0.1, { scale: this.originalScale }, { easing: 'elasticOut' })
        //             .call(() => {this.isAnimating = false;})
        //             .start();
        //     })
        //     .start();
    }
}