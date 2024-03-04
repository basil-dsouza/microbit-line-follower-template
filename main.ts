/**
 * Guide:
 * 
 * on start: Adjust speed (default: 150)
 * 
 * In "Control_Robot" function
 * 
 * * Check Sensor Variables (left_outer / left / middle / right / right_outer)
 * 
 * * Decide (using "Logic" section) on which direction the robot moves based on sensor input
 * 
 * Set control_direction variable to: FORWARD / REVERSE / TRAVERSE_LEFT / TRAVERSE_RIGHT / ROTATE_CLOCKWISE / ROTATE_COUNTERCLOCKWISE / STOP
 */
function Update_Sensor () {
    left_sensor_state = Math.max(pins.digitalReadPin(DigitalPin.P2), pins.digitalReadPin(DigitalPin.P13))
    middle_sensor_state = pins.digitalReadPin(DigitalPin.P1)
    right_sensor_state = Math.max(pins.digitalReadPin(DigitalPin.P0), pins.digitalReadPin(DigitalPin.P12))
}
function Move_Robot (move_direction: string) {
    start_time = control.millis()
    direction = move_direction
    if (prev_direction != direction) {
        prev_direction = direction
        serial.writeLine("Direction:" + direction)
        if (direction == "FORWARD") {
            motor.MotorRun(motor.Motors.M1, motor.Dir.CCW, speed)
            motor.MotorRun(motor.Motors.M2, motor.Dir.CCW, speed)
            motor.MotorRun(motor.Motors.M3, motor.Dir.CCW, speed)
            motor.MotorRun(motor.Motors.M4, motor.Dir.CCW, speed)
        } else if (direction == "REVERSE") {
            motor.MotorRun(motor.Motors.M1, motor.Dir.CW, speed)
            motor.MotorRun(motor.Motors.M2, motor.Dir.CW, speed)
            motor.MotorRun(motor.Motors.M3, motor.Dir.CW, speed)
            motor.MotorRun(motor.Motors.M4, motor.Dir.CW, speed)
        } else if (direction == "ROTATE_CLOCKWISE") {
            motor.MotorRun(motor.Motors.M1, motor.Dir.CCW, Math.min(255, speed + speed_turn_offset))
            motor.MotorRun(motor.Motors.M2, motor.Dir.CCW, Math.min(255, speed + speed_turn_offset))
            motor.MotorRun(motor.Motors.M3, motor.Dir.CW, Math.min(255, speed + speed_turn_offset))
            motor.MotorRun(motor.Motors.M4, motor.Dir.CW, Math.min(255, speed + speed_turn_offset))
        } else if (direction == "ROTATE_COUNTERCLOCKWISE") {
            motor.MotorRun(motor.Motors.M1, motor.Dir.CW, Math.min(255, speed + speed_turn_offset))
            motor.MotorRun(motor.Motors.M2, motor.Dir.CW, Math.min(255, speed + speed_turn_offset))
            motor.MotorRun(motor.Motors.M3, motor.Dir.CCW, Math.min(255, speed + speed_turn_offset))
            motor.MotorRun(motor.Motors.M4, motor.Dir.CCW, Math.min(255, speed + speed_turn_offset))
        } else if (direction == "TRAVERSE_LEFT") {
            motor.MotorRun(motor.Motors.M1, motor.Dir.CCW, speed)
            motor.MotorRun(motor.Motors.M2, motor.Dir.CW, speed)
            motor.MotorRun(motor.Motors.M3, motor.Dir.CW, speed)
            motor.MotorRun(motor.Motors.M4, motor.Dir.CCW, speed)
        } else if (direction == "TRAVERSE_RIGHT") {
            motor.MotorRun(motor.Motors.M1, motor.Dir.CW, speed)
            motor.MotorRun(motor.Motors.M2, motor.Dir.CCW, speed)
            motor.MotorRun(motor.Motors.M3, motor.Dir.CCW, speed)
            motor.MotorRun(motor.Motors.M4, motor.Dir.CW, speed)
        } else if (direction == "STOP") {
            motor.motorStopAll()
        } else {
            motor.motorStopAll()
        }
    }
}
function Control_Robot (left_outer: number, left: number, middle: number, right: number, right_outer: number) {
	
}
let prev_direction = ""
let direction = ""
let start_time = 0
let right_sensor_state = 0
let middle_sensor_state = 0
let left_sensor_state = 0
let speed_turn_offset = 0
let speed = 0
let prev_display_direction = ""
speed = 150
speed_turn_offset = 30
let enable_display = false
serial.redirectToUSB()
basic.forever(function () {
    let control_direction = ""
    Control_Robot(pins.digitalReadPin(DigitalPin.P2), pins.digitalReadPin(DigitalPin.P13), pins.digitalReadPin(DigitalPin.P1), pins.digitalReadPin(DigitalPin.P12), pins.digitalReadPin(DigitalPin.P0))
    Move_Robot(control_direction)
})
basic.forever(function () {
    if (enable_display && prev_display_direction != direction) {
        prev_display_direction = direction
        if (direction == "FORWARD") {
            basic.showArrow(ArrowNames.North)
        } else if (direction == "REVERSE") {
            basic.showArrow(ArrowNames.South)
        } else if (direction == "ROTATE_CLOCKWISE") {
            basic.showArrow(ArrowNames.NorthWest)
        } else if (direction == "ROTATE_COUNTERCLOCKWISE") {
            basic.showArrow(ArrowNames.NorthEast)
        } else if (direction == "TRAVERSE_LEFT") {
            basic.showArrow(ArrowNames.East)
        } else if (direction == "TRAVERSE_RIGHT") {
            basic.showArrow(ArrowNames.West)
        } else if (direction == "STOP") {
            basic.showIcon(IconNames.Chessboard)
        }
    }
})
