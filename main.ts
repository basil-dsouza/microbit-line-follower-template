function Update_Sensor () {
    left_sensor = Math.max(pins.digitalReadPin(DigitalPin.P2), pins.digitalReadPin(DigitalPin.P13))
    middle_sensor = pins.digitalReadPin(DigitalPin.P1)
    right_sensor = Math.max(pins.digitalReadPin(DigitalPin.P0), pins.digitalReadPin(DigitalPin.P12))
}
let direction = ""
let prev_direction = ""
let start_time = 0
let right_sensor = 0
let middle_sensor = 0
let left_sensor = 0
let prev_display_direction = ""
let speed = 120
let speed_turn_offset = 30
serial.redirectToUSB()
/**
 * Guide:
 * 
 * on start: Adjust speed (default: 120) and speed_turn_offset (default: 30)
 * 
 * In "forever" loop - Simple Version
 * 
 * * Call "Update_Sensor" Function (Already done in sample)
 * 
 * * Check Sensor Variables (left_sensor / middle_sensor / right_sensor) and
 * 
 * * Decide (using "Logic" section) on which direction the robot moves based on sensor input
 * 
 * Set direction variable to: FORWARD / REVERSE / TRAVERSE_LEFT / TRAVERSE_RIGHT / ROTATE_CLOCKWISE / ROTATE_COUNTERCLOCKWISE / STOP
 */
basic.forever(function () {
    Update_Sensor()
})
// Advanced - Can Ignore for now
basic.forever(function () {
    start_time = control.millis()
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
})
basic.forever(function () {
    if (prev_display_direction != direction) {
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
