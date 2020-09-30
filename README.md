# RecoveryBox
Codeworks: Solo Project

TODOs (inexhaustive)

implement user registration (currently it just errors if the user doesnt exist on the db) and authentication

implement best practise security measures for transfer of sensitive user information
refactor regex used when recieving user inputted data
refactor animations on summaryscreen to use loops rather than settimeouts
link user settings changes to the database,  this will require a new model to be inserted into thre models.js (edited) 
refactor the reducer for historical calendar updates as currently it will only accept one update in the local data (although it will be correctly saved in the db)
charts currently only work if they have more than 5 data points, refactor
implement functionality to click on charts and display their values
Play around with removing libraries and building your own custom components (calendar/graphs/panhandler)
Refactor all touchable opacity components to use pressables instead (i think they are becoming the new standard?)
Use react query rather than redux for async state management - check out this library, the guy who makes it is an absolute legend and what hes done here is really interesting
clean unused node modules
implement different types of navigation like swipe or tab navigation
refactor modifysuggestionlist component to be a modal screen
make things more modular,there is alot of code which could be split out and made into new discrete components
make data processing/conversion functions in the graph components more efficient
axis on 1st graph on summary screen goes off the side of the screen, refactor
layout is highly customised for a huawei p20, refactor code to use Dimensions information and be more responsive
add the ability to change the quote of the day if it is a rubbish one
add the ability to redirect to certain resources relating to your recovery programme of choice (AA website etc.)
find a way to include links in the header section of the app and put a link to the settings rather than the logo
Add in ability to remove items from the history screen and not just add them
I think mood updating from the your history screen is a mess
Add some cool animations on the submit buttons?
Logout functionality
linting
refactor redux coding to use connect() method alongside mapstatetoprops and mapdispatchtoprops
