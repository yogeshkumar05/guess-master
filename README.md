# Guess Master
A fun umber guess game developed using React native.

In this game, user will select a number between 1 and 99.
Phone will guess the number selected by user.

# Deployment
The app is deployed at https://expo.io/@smart-apps/projects/guess-master to test.

# Screenshots
Splash screen
![Alt text](/screenshots/guess_master_1.png "Splash screen")

User will be asked to select a number from 1 to 99
![Alt text](/screenshots/guess_master_2.png "Start new game")

Once the number is entered, use can either confirm or reset to select a different number
![Alt text](/screenshots/guess_master_3.png "Select a number - confirm or reset")

Once user confirms, phone will start guessing the number selected by user
![Alt text](/screenshots/guess_master_4.png "Phone starts guessing the selected number")

App displays the number of rounds phone took and the number guessed during each round.

User has to provide hints to the phone by pressing + (if the selected number is greater than the
number guessed by phone) or - (if the selected number is lower than the
number guessed by phone).

If user provides wrong hints, there will be a warning thrown
![Alt text](/screenshots/guess_master_5.png "Wrong hint warning")

When phone guesses the number correctly, user will be landed on game over screen. 
App will display the number of round phone took to guess user's number.
User can start a new game from here.
![Alt text](/screenshots/guess_master_6.png "Game over screen")