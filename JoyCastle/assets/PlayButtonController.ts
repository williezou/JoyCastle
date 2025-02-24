
import { _decorator, Button, Color, color, Component, Sprite, tween, UIOpacity, v3, Vec3} from 'cc';
const { ccclass, property } = _decorator;

@ccclass
export default class PlayButtonController extends Component {

    @property(Button)
    playButton: Button = null;

    private originalScale: Vec3 = new Vec3(1, 1, 1);
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
            })
            .start();
        tween(this.spOpacity).to(0.5, {opacity: 255}).start();
    }

    playBreathAnimation() {
        tween(this.node)
            .to(1, { scale: v3(0.95, 0.95, 1) }, { easing: 'sineInOut' })
            .to(1, { scale: this.originalScale }, { easing: 'sineInOut' })
            .union()
            .repeatForever()
            .start();

        tween(this.spOpacity)
            .to(1, { opacity: 125 }, { easing: 'sineInOut' })
            .to(1, { opacity: 255 }, { easing: 'sineInOut' })
            .union()
            .repeatForever()
            .start();
    }
    onButtonClick() {
        if (this.isAnimating) return;

        this.isAnimating = true;

 
        tween(this.node)
            .to(0.1, { scale: v3(0.9, 0.9, 1) })
            .call(() => {
                tween(this.node)
                    .to(0.2, { scale: this.originalScale }, { easing: 'elasticOut' })
                    .call(() => {this.isAnimating = false;})
                    .start();
            })
            .start();
    }
}