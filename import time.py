import time
import datetime

def set_alarm(alarm_time):
    while True:
        # Get the current time
        current_time = datetime.datetime.now().strftime("%H:%M:%S")
        
        # Check if the current time matches the alarm time
        if current_time == alarm_time:
            print("Wake up! It's time!")
            break
        
        # Wait for 1 second before checking again
        time.sleep(1)

def main():
    print("Welcome to the Jade Alarm Clock!")
    
    # Get the alarm time from the user
    alarm_time = input("Enter the alarm time in HH:MM:SS format: ")
    
    try:
        # Validate the time format
        datetime.datetime.strptime(alarm_time, "%H:%M:%S")
    except ValueError:
        print("Invalid time format. Please use HH:MM:SS.")
        return
    
    print(f"Alarm set for {alarm_time}")
    set_alarm(alarm_time)

if __name__ == "__main__":
    main()