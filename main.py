# Guide:
# 
# on start: Adjust speed and speed_turn_offset
# 
# In "forever" loop - Simple Version
# 
# Call "Update_Sensor" Function (Already done in sample)
# 
# Check Sensor Variables (left_sensor / middle_sensor / right_sensor) and
# 
# Decide (using "Logic" section) on which direction the robot moves based on sensor input
# 
# Set direction variable to: FORWARD / REVERSE / TRAVERSE_LEFT / TRAVERSE_RIGHT / ROTATE_CLOCKWISE / ROTATE_COUNTERCLOCKWISE / STOP
def Update_Sensor():
    global left_sensor, middle_sensor, right_sensor
    left_sensor = max(pins.digital_read_pin(DigitalPin.P2),
        pins.digital_read_pin(DigitalPin.P13))
    middle_sensor = pins.digital_read_pin(DigitalPin.P1)
    right_sensor = max(pins.digital_read_pin(DigitalPin.P0),
        pins.digital_read_pin(DigitalPin.P12))
prev_direction = ""
start_time = 0
right_sensor = 0
middle_sensor = 0
left_sensor = 0
prev_display_direction = ""
speed = 120
speed_turn_offset = 30
serial.redirect_to_usb()

def on_forever():
    Update_Sensor()
basic.forever(on_forever)

def on_forever2():
    pass
basic.forever(on_forever2)

# Advanced - Can Ignore for now

def on_forever3():
    global start_time, speed, prev_direction
    direction = ""
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
basic.forever(on_forever3)
