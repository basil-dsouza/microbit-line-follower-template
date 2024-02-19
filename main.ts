function Update_Sensor () {
    if (true) {
        left_sensor = pins.digitalReadPin(DigitalPin.P0)
        middle_sensor = pins.digitalReadPin(DigitalPin.P1)
        right_sensor = pins.digitalReadPin(DigitalPin.P2)
    } else {
        left_sensor = pins.digitalReadPin(DigitalPin.P12)
        middle_sensor = pins.digitalReadPin(DigitalPin.P1)
        right_sensor = pins.digitalReadPin(DigitalPin.P13)
    }
}
/**
 * Guide:
 * 
 * on start:
 * 
 * * Set line_size to THICK or THIN based on how wide the line is
 * 
 * * Ensure line_follower is true
 * 
 * In "forever" loop - Simple Version
 * 
 * * Call "Update_Sensor" Function (Already done in sample)
 * 
 * * Check Sensor Variables (left_sensor / middle_sensor / right_sensor) and 
 * 
 * decide (using "Logic" section) on which direction the robot moves based on sensor input
 * 
 * Set direction variable to: FORWARD / REVERSE / TRAVERSE_LEFT / TRAVERSE_RIGHT / ROTATE_CLOCKWISE / ROTATE_COUNTERCLOCKWISE / STOP
 * 
 * For 
 * 
 * *
 */
/**
 * THICK / THIN
 */
let speed = 0
let prev_direction = ""
let start_time = 0
let right_sensor = 0
let middle_sensor = 0
let left_sensor = 0
let line_follower = true
let line_size = "THICK"
let speed_fast = 255
let speed_slow = 100
let speed_turn_offset = 50
serial.redirectToUSB()
basic.forever(function () {
    Update_Sensor()
})
// Advanced - Can Ignore for now
basic.forever(function () {
    let direction = ""
    start_time = control.millis()
    if (prev_direction != direction) {
        speed = 0
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
