def Update_Sensor():
    global left_sensor, middle_sensor, right_sensor
    if True:
        left_sensor = pins.digital_read_pin(DigitalPin.P0)
        middle_sensor = pins.digital_read_pin(DigitalPin.P1)
        right_sensor = pins.digital_read_pin(DigitalPin.P2)
    else:
        left_sensor = pins.digital_read_pin(DigitalPin.P12)
        middle_sensor = pins.digital_read_pin(DigitalPin.P1)
        right_sensor = pins.digital_read_pin(DigitalPin.P13)
"""

THICK / THIN

"""
prev_direction = ""
start_time = 0
direction = ""
right_sensor = 0
middle_sensor = 0
left_sensor = 0
line_follower = True
line_size = "THICK"
speed_fast = 255
speed_slow = 100
speed_turn_offset = 50
serial.redirect_to_usb()
"""

Use: FORWARD / REVERSE / TRAVERSE_LEFT / TRAVERSE_RIGHT / ROTATE_CLOCKWISE / ROTATE_COUNTERCLOCKWISE / STOP

"""

def on_forever():
    global direction
    if line_follower:
        if middle_sensor == 1:
            direction = "FORWARD"
        elif right_sensor == 1:
            direction = "ROTATE_CLOCKWISE"
        elif left_sensor == 1:
            direction = "ROTATE_COUNTERCLOCKWISE"
        else:
            direction = "STOP"
basic.forever(on_forever)

"""

Advanced - Can Ignore for now

"""

def on_forever2():
    global start_time, prev_direction
    start_time = control.millis()
    if prev_direction != direction:
        speed = 0
        prev_direction = direction
        serial.write_line("Direction:" + direction)
        if direction == "FORWARD":
            motor.motor_run(motor.Motors.M1, motor.Dir.CCW, speed)
            motor.motor_run(motor.Motors.M2, motor.Dir.CCW, speed)
            motor.motor_run(motor.Motors.M3, motor.Dir.CCW, speed)
            motor.motor_run(motor.Motors.M4, motor.Dir.CCW, speed)
        elif direction == "REVERSE":
            motor.motor_run(motor.Motors.M1, motor.Dir.CW, speed)
            motor.motor_run(motor.Motors.M2, motor.Dir.CW, speed)
            motor.motor_run(motor.Motors.M3, motor.Dir.CW, speed)
            motor.motor_run(motor.Motors.M4, motor.Dir.CW, speed)
        elif direction == "ROTATE_CLOCKWISE":
            motor.motor_run(motor.Motors.M1,
                motor.Dir.CCW,
                min(255, speed + speed_turn_offset))
            motor.motor_run(motor.Motors.M2,
                motor.Dir.CCW,
                min(255, speed + speed_turn_offset))
            motor.motor_run(motor.Motors.M3,
                motor.Dir.CW,
                min(255, speed + speed_turn_offset))
            motor.motor_run(motor.Motors.M4,
                motor.Dir.CW,
                min(255, speed + speed_turn_offset))
        elif direction == "ROTATE_COUNTERCLOCKWISE":
            motor.motor_run(motor.Motors.M1,
                motor.Dir.CW,
                min(255, speed + speed_turn_offset))
            motor.motor_run(motor.Motors.M2,
                motor.Dir.CW,
                min(255, speed + speed_turn_offset))
            motor.motor_run(motor.Motors.M3,
                motor.Dir.CCW,
                min(255, speed + speed_turn_offset))
            motor.motor_run(motor.Motors.M4,
                motor.Dir.CCW,
                min(255, speed + speed_turn_offset))
        elif direction == "TRAVERSE_LEFT":
            motor.motor_run(motor.Motors.M1, motor.Dir.CCW, speed)
            motor.motor_run(motor.Motors.M2, motor.Dir.CW, speed)
            motor.motor_run(motor.Motors.M3, motor.Dir.CW, speed)
            motor.motor_run(motor.Motors.M4, motor.Dir.CCW, speed)
        elif direction == "TRAVERSE_RIGHT":
            motor.motor_run(motor.Motors.M1, motor.Dir.CW, speed)
            motor.motor_run(motor.Motors.M2, motor.Dir.CCW, speed)
            motor.motor_run(motor.Motors.M3, motor.Dir.CCW, speed)
            motor.motor_run(motor.Motors.M4, motor.Dir.CW, speed)
        elif direction == "STOP":
            motor.motor_stop_all()
        else:
            motor.motor_stop_all()
basic.forever(on_forever2)
