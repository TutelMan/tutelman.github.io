import os

# Runs a new Command Prompt window, sets it to full screen, runs `ipconfig` three times, waits for 2 seconds, and then closes
os.system("start cmd /k \"mode con: cols=700 lines=40 & ipconfig & ipconfig & ipconfig & timeout /t 2 & exit\"")

# Deletes the script file after execution
def delete_self():
    os.remove(__file__)

delete_self()
