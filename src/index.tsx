import * as React from "react"
import { render } from "react-dom"

const app = document.getElementById("app")

class Me {

    private speed = 5;

    x: number = 0;

    y: number = 0;

    xDirection: number = 0

    yDirection: number = 0

    movable: number = 0

    frame() {
        if (this.movable > 0) {
            const moveSize = 2
            this.movable -= moveSize

            this.x += this.xDirection * moveSize
            this.y += this.yDirection * moveSize
        }
    }

    moveUp() {
        this.yDirection = -1
        this.xDirection = 0
        this.movable = 6
    }

    moveDown() {
        this.yDirection = 1
        this.xDirection = 0
        this.movable = 6
    }

    moveLeft() {
        this.yDirection = 0
        this.xDirection = -1
        this.movable = 6
    }

    moveRight() {
        this.yDirection = 0
        this.xDirection = 1
        this.movable = 6
    }

}

class Ball {

    constructor() { }

    x: number = 500 * Math.random()

    y: number = 500 * Math.random()

    xDelta = 3 * Math.random()

    yDelta = 3 * Math.random()

    frame() {
        this.x += this.xDelta
        this.y += this.yDelta

        if (this.x >= 500 || this.x <= 0) {
            this.xDelta *= -1
        }

        if (this.y >= 500 || this.y <= 0) {
            this.yDelta *= -1
        }
    }

}
function numberWithin(target: number, from: number, to: number) {
    return 0 <= (from - target) * (target - to)
}

class Game {

    balls: Ball[] = []

    player: Me = new Me()

    gamePad = new Keypad()

    frameCount = 0

    init() {
        window.onkeydown = (e) => {
            this.gamePad.listen(e.keyCode)
        }

        this.gamePad.onDown.push(() => this.player.moveDown())
        this.gamePad.onLeft.push(() => this.player.moveLeft())
        this.gamePad.onRight.push(() => this.player.moveRight())
        this.gamePad.onUp.push(() => this.player.moveUp())

        for (let i = 0; i < 10; i++) {
            this.balls.push(new Ball())
        }
    }

    frame() {
        if (this.gameover) return
        this.player.frame()

        for (const ball of this.balls) {
            ball.frame()

            if (numberWithin(this.player.x, ball.x - 2, ball.x + 2)
                && numberWithin(this.player.y, ball.y - 2, ball.y + 2)) {
                this.gameover = true
            }
        }

        if ((this.frameCount % 10) === 0) {
            this.balls.push(new Ball())
        }

        this.frameCount++
    }

    gameover = false

}

type KeypadEvent = () => void

class Keypad {

    listen(charCode: number) {
        switch (charCode) {
            case 37:
                this.doAll(this.onLeft)
                break;
            case 38:
                this.doAll(this.onUp)
                break;
            case 39:
                this.doAll(this.onRight)
                break;
            case 40:
                this.doAll(this.onDown)
                break;
        }
    }

    private doAll(listeners: KeypadEvent[]) {
        for (const l of listeners) {
            l()
        }
    }

    onLeft: KeypadEvent[] = []
    onUp: KeypadEvent[] = []
    onRight: KeypadEvent[] = []
    onDown: KeypadEvent[] = []


}

class GameCanvas extends React.Component<{}, {}> {

    private height = 500

    private width = 500

    private c: HTMLCanvasElement

    private ctx: CanvasRenderingContext2D

    private game: Game

    componentDidMount() {
        this.ctx = this.c.getContext("2d")
        this.game = new Game()
        this.game.init()

        setInterval(
            () => {
                this.game.frame()

                requestAnimationFrame(() => {
                    this.canvasRender()
                })
            }
            , 1000 / 60)

    }

    canvasRender() {
        this.ctx.fillStyle = "#FFFFFF"
        this.ctx.fillRect(0, 0, this.width, this.height)

        if (this.game.gameover) {

            this.ctx.fillStyle = "#000000"
            this.ctx.fillText(`GAME OVER!! Score: ${this.game.frameCount}`, 100, 240)

            return
        }

        for (const ball of this.game.balls) {
            this.ctx.fillStyle = "#000000"
            this.ctx.fillRect(ball.x, ball.y, 5, 5)
        }

        this.ctx.fillStyle = "#FF0000"
        this.ctx.fillRect(this.game.player.x, this.game.player.y, 5, 5)

    }

    render() {
        return <canvas
            style={{ border: "1px solid #000" }}
            width={this.width}
            height={this.height}
            ref={ref => this.c = ref}
        />
    }

}


render(<GameCanvas />, app)
