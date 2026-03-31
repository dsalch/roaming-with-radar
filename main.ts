/**
 * Advanced Roaming Project Demonstrating:
 * 
 *    Functions and Subfunctions
 * 
 *    Personality
 * 
 *    Servos
 * 
 *    Variables
 */
// 3. Decision Making: Scanning
function scanAndTurn () {
    mbit_Robot.CarCtrl(mbit_Robot.CarState.Car_Stop)
    mbit_Robot.RGB_Car_Big2(mbit_Robot.enColor.Yellow)
    mbit_Robot.look(mbit_Robot.enLook.Right)
    basic.pause(1000)
    RightDistance = mbit_Robot.Ultrasonic_Car()
    mbit_Robot.look(mbit_Robot.enLook.Left)
    basic.pause(1000)
    LeftDistance = mbit_Robot.Ultrasonic_Car()
    mbit_Robot.look(mbit_Robot.enLook.Forward)
    basic.pause(500)
    // Compare and Choose Direction
    if (LeftDistance > RightDistance) {
        mbit_Robot.CarCtrlSpeed(mbit_Robot.CarState.Car_SpinLeft, 60)
    } else {
        mbit_Robot.CarCtrlSpeed(mbit_Robot.CarState.Car_SpinRight, 60)
    }
    basic.pause(1000)
}
// 2. Movement Logic: Forward
function driveForward () {
    if (mbit_Robot.Ultrasonic_Car() > 120) {
        // High speed for clear paths
        mbit_Robot.CarCtrlSpeed2(mbit_Robot.CarState.Car_Run, 90, 95)
        mbit_Robot.RGB_Car_Big2(mbit_Robot.enColor.White)
    } else {
        // Slow down as we approach objects
        mbit_Robot.CarCtrlSpeed2(mbit_Robot.CarState.Car_Run, 45, 50)
        mbit_Robot.RGB_Car_Big2(mbit_Robot.enColor.Cyan)
    }
}
// 4. Emergency Maneuver
function reverseAndPanic () {
    mbit_Robot.CarCtrlSpeed(mbit_Robot.CarState.Car_Back, 45)
    mbit_Robot.RGB_Car_Big2(mbit_Robot.enColor.Red)
    music.play(music.stringPlayable("C5 C5 - F F F - - ", 300), music.PlaybackMode.InBackground)
    basic.pause(2000)
    scanAndTurn()
}
let ForwardDistance = 0
let LeftDistance = 0
let RightDistance = 0
basic.showLeds(`
    . # . # .
    # . # . #
    # . # . #
    . # . # .
    . . . . .
    `)
mbit_Robot.look(mbit_Robot.enLook.Left)
basic.pause(1000)
mbit_Robot.look(mbit_Robot.enLook.Right)
basic.pause(1000)
mbit_Robot.look(mbit_Robot.enLook.Forward)
basic.pause(1000)
basic.showIcon(IconNames.Fabulous)
basic.forever(function () {
    while (mbit_Robot.Avoid_Sensor(mbit_Robot.enAvoidState.NOOBSTACLE)) {
        mbit_Robot.look(mbit_Robot.enLook.Forward)
        basic.pause(100)
        ForwardDistance = mbit_Robot.Ultrasonic_Car()
        if (ForwardDistance > 60) {
            driveForward()
        } else if (ForwardDistance < 30) {
            scanAndTurn()
        }
    }
    // If the infrared sensors trigger (obstacle right in front)
    reverseAndPanic()
})
