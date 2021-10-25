# SurveyMaker

This is a bare bones attempt to making a system that allows a user to create a custom web form for surveys.
Alot of functionallity isn't working, and most of the things that do work are very basic or are missing some quality of life things.
This was developed over the course of less than a week, start on 10/18/2021. Prior to then, I had very little experience with web developement, and started from knowing absolutely nothing about JQuery and PHP. Most of learning was on the spot and very quick searches on the internet for resources and answers. Below is a basic description of what was developed so far...



index.php is the acting entry for creating a survey. The file calls upon various .js files, starting with formEditor.js acting as the main control.
Other .js files act as models for the various survey formFields, which uses JQuery to update the DOM when the user interacts with them. They also
contain the class data which holds logistics and some relevant data that will be compiled to JSON after submission.

Users can click the 'add' button to insert a new formField before that point, where a select box of various formField types are available. Upon selection,
a new formField is added, allowing the user to modify some attributes to meet their needs. (Note, there are a couple features missing, such as deleting options and setting some
defaults. Goal was to get something bare bones working).

Beneath each formField are simple controls for manipulating the formField. A 'save' button simply hides editing options and allows the user to preview the output. 
A 'edit' button takes it's place allowing the user to start editing again. A 'move up' and 'move down' button allows basic movement to change order. 'delete' removes the formField

When the user is satisfied with the form, clicking the 'publish' button at the end strips the editing options, and presents the user with a wait screen, where after a few seconds,
a preview of the final form is displayed.

In the background, once 'publish' is pressed, a list containing all the formFields is converted to JSON, which is sent via an ajax to saveSurvey.php. There,
the data would be directly into a mySQL db (as a JSON datatype, for convinience). Because the backend functionallity isn't in fully working state, see bellow for what was set up. 



__________________________________________________________________________________________________________________________________________________



(Not yet Completed): The following are features that have been started, or haven't been completed in a working state.

 1) The database was built using phpMyAdmin, providing a VERY basic structure of some data that could be held, as well as potential responses from users. There may be some important
 features that might be missing, for example author data, which is left ambiguous since it is possible that the system is implemented in a database where actual user data is retained. To view the current structure set up, see the included DBSchemaImg.PNG.
 
  Because of these missing db features, some data cannot be properly saved to the database. For some basic testing, dummy data was included to populate some tables.
  For example, testing if JSON could be loaded, then unloaded to rebuild the form required dummy input for fields like surveyId foreign key.
  
2) User submission of forms isn't properly working. There is currently difficulty figuring out how to pass data between takeSurvey.php and submitSurvey.php to handle determining size of data when using POST. As of right now, trying to figure the use of dataForms to append the data when submitting.

3) A more formal entry into the project isn't implemented. Ideally, survey creators will access Index.php to create the survey, and will do so by passing a user authentication token to help track identity of the survey, as well as allow editing. Further more, an ideal system would allow the survey taker to access takeSurvey.php via a link, which would include the surveyID in the address ala GET request. This would then allow take survey to parse this id and pull the relevant form from the db. Because submission of a suvery isn't working, or storing one effectively for that matter, this isn't a main task.
  
4) Missing Bugs and cleanup. There may be some missing bugs I am unaware of, and alot of comment code could be cleaned up. Since this isn't in full release, it's not that big of a concern. But just a fair warning some lines of codes are left haphazzardly around, and could be cleaned up for better presentation.

5) CSS. Styling wasn't a priority for this project. I was more intent in building the functionality (plus, I was learning JQuery and PHP on the sport from the ground up, so styling wasn't on the top of things to do). For that reason, only a basic styling was provided to differentiate formFields. 
  
  
