//_____________________________________________________________________________________________________________		
			//______________TODO------------------------------TODO--------------------TODO----------
			//_____________________________________________________________________________________________________________
			

			//Better labeling a for inputs, especialy paragraph. Don't rely on defaults to explain what goes in input
			//Deleting items, moving (nice to have), duplication
			//Remove added options ie to multiple choice or selector box
			//Provide require functionality and checker
			

			
			//_____________________________________________________________________________________________________________
			//___________________________ Constants and variable Declarations__________ __________________________________
			//_____________________________________________________________________________________________________________
			

			//A prefab SelectBox for choosing which survey feature to add, which will then be replaced when selected
			const selectBoxOptionTags = '<option value = "selectBox"> Select Box </option>' ;
			const shortParagraphOptionTags = '<option value = "shortParagraph"> Short Paragraph </option>' ;
			const shortAnswerOptionTags = '<option value = "shortAnswer"> Short Answer </option>' ;
			const multipleChoiceOptionTags = '<option value = "multipleChoice"> Multiple Choice </option>' ;
			const checkBoxOptionTags = '<option value = "checkBox"> Check Box </option>' ;
			const starTags = '<option value = "starRating"> Star Rating </option>' ;
			
			const formSelector = '<select class="formSelectorMenu creatorComponents"><option value = "" selected="selected">Select a form type</option>' + selectBoxOptionTags + shortParagraphOptionTags + shortAnswerOptionTags + multipleChoiceOptionTags + checkBoxOptionTags + starTags + ' </select> <br>';
			//const selectPrefab = '<form><select id="abcSelection"></select><input type="text" id="newOptionName" placeholder="AddOption" value=""><input type="button" class="addNewOptionButton" value="Add Option"></form>'

			//A limit for max characters that the webhost/company will allow an author to set. Author is free to set it to less
			const SURVEY_MAX_CHAR_LIMIT = 500;
			//A limit to number of stars that the webhost/company will allow an author to set. Author is free to set it to less
			const STAR_RATING_MAX_STAR_LIMIT = 10;

			//images
			const starImgPth = 'img/star.png'
			const emptyStarImgPth = 'img/starEmpty.png';



			//counters and IdIterators

			let formCounterId = 0;   //For assigning id's to form fields, will not decrement on deletes, used mainly to handle main controls
			let formCounter = 0;	//For tracking number of form fields, can decrement on deletes
			

			let selectBoxIdCounter = 0; //For assigning id's to SelectBox & elements, will not decrement on deletes
			let selectBoxCounter = 0;	//For tracking number of SelectBoxes, can decrement on deletes

			let shortParagraphIdCounter = 0; //For assigning id's to shortParagraphs & elements, will not decrement on deletes
			let shortParagraphCounter = 0;	//For tracking number of shortParagraphss, can decrement on deletes

			let shortAnswerIdCounter = 0; //For assigning id's to shortAnswers & elements, will not decrement on deletes
			let shortAnswerCounter = 0;	//For tracking number of shortAnswers, can decrement on deletes

			let multipleChoiceIdCounter = 0; //For assigning id's to multipleChoice & elements, will not decrement on deletes
			let multipleChoiceCounter = 0;	//For tracking number of multipleChoice, can decrement on deletes

			let checkBoxIdCounter = 0; //For assigning id's to multipleChoice & elements, will not decrement on deletes
			let checkBoxCounter = 0;	//For tracking number of multipleChoice, can decrement on deletes

			let starIdCounter = 0; //For assigning id's to star rating & elements, will not decrement on deletes
			let starCounter = 0;	//For tracking number of star, can decrement on deletes


			//_____________________________________________________________________________________________________________
			//___________________________ Button Handlers for General Form Manipulation __________________________________
			//_____________________________________________________________________________________________________________
			


			
			const handleSaveForm = (callingButton) => {

				let formDivId = $(callingButton).attr("formDivId");
				//let fieldQuestion = $(formDivId + " .questionHeaderField").val();

				//$(formDivId + " label.questionHeader").text(fieldQuestion);

				$(formDivId).children(".showOnEdit").hide();
				$(formDivId).children(".hideOnEdit").show();

				//$(formDivId + " input:last").show();
				$(formDivId).next().children(".showOnEdit").hide();
				$(formDivId).next().children(".hideOnEdit").show();
			}


			const handleEditForm = (callingButton) => {

				let formDivId = $(callingButton).attr("formDivId");

				$(formDivId).children(".showOnEdit").show();
				$(formDivId).children(".hideOnEdit").hide();

				$(formDivId).next().children(".showOnEdit").show();
				$(formDivId).next().children(".hideOnEdit").hide();
			}	


			const handleMoveUpForm = (callingButton) => {
				let formId = $(callingButton).attr('formDivId');
				let formControlId = $(formId).next('.prefabControlsDiv').attr('id');

				let previousFormId = $(formId).prevAll('.formField:first').attr('id');

				


				//check if forms are there and if true, swap

				if(previousFormId != '')
				{
					$(formId).insertBefore('#'+ previousFormId);
					$('#' + formControlId).insertAfter(formId);
				}
			}


 			const handleMoveDownForm = (callingButton) => {
				let formId = $(callingButton).attr('formDivId');
				

				let nextFormId = $(formId).nextAll('.formField:first').attr('id');
				let otherFormControlId = $('#' + nextFormId).next('.prefabControlsDiv').attr('id');


				//check if forms are there and if true, swap

				if(nextFormId != '')
				{
					$('#'+ nextFormId).insertBefore(formId);
					$('#' + otherFormControlId).insertAfter('#'+ nextFormId);
				}

			 }


	
			const handleRemoveForm = (callingButton) => {
				let formId = $(callingButton).attr('formDivId');
				let formControlId = $(formId).next('.prefabControlsDiv').attr('id');

				//Decrement relevant form counts
				if($(formId).hasClass('selectPrefabDiv'))
				{
					selectBoxCounter--;
				}
				else if($(formId).hasClass('shortParaPrefabDiv'))
				{
					shortParagraphCounter--;
				}
				else if($(formId).hasClass('shortAnsPrefabDiv'))
				{
					shortAnswerCounter--;
				}
				else if($(formId).hasClass('checkPrefabDiv'))
				{
					checkBoxCounter--;
				}
				else if($(formId).hasClass('multPrefabDiv'))
				{
					multipleChoiceCounter--;
				}
				else ($(formId).hasClass('starPrefabDiv'))
				{
					starCounter--;
				}

				formCounter--;


				$(formId).remove();
				$('#' + formControlId).remove();
			}

			//_____________________________________________________________________________________________________________
			//____________________________________ Handlers for Editing Form Properties ____________________________
			//_____________________________________________________________________________________________________________
			


			const handleSelectPrefabSubmit = (callingButton) => {
				console.log(callingButton);
				console.log($(callingButton).attr("selectnewoptionid"));
				let inputOptionId = $(callingButton).attr("selectnewoptionid");
				let inputOptionValId = $(callingButton).attr("selectnewoptionvalid");
				let selectBoxId = $(callingButton).attr("selectboxid");

				let selectLabelInputId = $(callingButton).attr("selectLabelInputId");
				let selectLabelId = $(callingButton).attr("selectLabelId");

				

				let newSelectLabel = $('#' + selectLabelInputId).val();
				let newOption = $('#' + inputOptionId).val();
				let newOptionVal = $('#' + inputOptionValId).val();
				console.log(newOption);
				if(newOption !== "")
				{
					if($('#' + selectBoxId + " option").first().val() == "ReplaceDefault")
					{
						$('#' + selectBoxId + " option").replaceWith('<option value = ' + newOptionVal + ' >'+ newOption + '</option>');
						$('#' + inputOptionId).val("");
						$('#' + inputOptionValId).val("");
					}
					else
					{
						console.log("appending to... :#", selectBoxId);
						$('#' + selectBoxId).append('<option value = ' + newOptionVal + ' >'+ newOption + '</option>');
						$('#' + inputOptionId).val("");
						$('#' + inputOptionValId).val("");
					}
					
				}

				//publish Title
				updateTitle(callingButton);
				//change label infront of selectBox
				$('#' + selectLabelId).text(newSelectLabel);
					
			}

			const handleShortParaPrefabSubmit = (callingButton) => {
	
				console.log(callingButton);
				
				let placeHolderInputId = $(callingButton).attr("placeHolderId");
				let maxCharId = $(callingButton).attr("shortParaCharLimId");
				let shortParaTextAreaId = $(callingButton).attr("shortParaId");


				let newPlaceHolder = $('#' + placeHolderInputId).val();
				let newCharLim = $('#' + maxCharId).val();

				

				//Check if valid number (should already be caught since already set max and min and set type to 'number', but just to be sure...)
				if($.isNumeric(newCharLim))
				{
					//Replace placeholder in textArea as well since alls well
					$('#' + shortParaTextAreaId).attr("placeholder", newPlaceHolder);
					$('#' + shortParaTextAreaId).attr("max", newCharLim);
				}
					
				else
				{
					$(callingButton).hide();
					$('#' + maxCharId).css({"border": "thin double red", "background-color": "rgba(250,170,170,0.65)", "border-radius": "4px"}).after("<span>Please provide a valid number</span>");
					
					//Because Jquery can't animate color by default(?) use timeout instead of importing another library
					setTimeout(() =>{
						$('#' + maxCharId).css({"border": "", "background-color": "", "border-radius": ""}).next().remove();
						$(callingButton).show();
					}, 2000);
					
				
				}
				
				//publish Title
				updateTitle(callingButton);
				//Won't clear text fields, they are used to change, not add to the form field
			}

			//Similar to Short paragraph, but with preleading label for input and shorter input field
			const handleShortAnsPrefabSubmit = (callingButton) => {
	
				console.log(callingButton);
				
				let placeHolderInputId = $(callingButton).attr("placeHolderId");
				let maxCharId = $(callingButton).attr("shortAnsCharLimId");
				let shortAnsLabelInputId = $(callingButton).attr("shortAnsLabelInputId");

				let shortAnsTextAreaId = $(callingButton).attr("shortAnsId");
				//let inputLabelId = $(callingButton).attr("shortAnsLabelId");


				let newPlaceHolder = $('#' + placeHolderInputId).val();
				let newCharLim = $('#' + maxCharId).val();
				let newInputLabel = $('#' + shortAnsLabelInputId).val();

				

				//Check if valid number (should already be caught since already set max and min and set type to 'number', but just to be sure...)
				if($.isNumeric(newCharLim))
				{
					//Replace placeholder in textArea as well since alls well
					$('#' + shortAnsTextAreaId).attr("placeholder", newPlaceHolder);
					$('#' + shortAnsTextAreaId).attr("max", newCharLim);

					//change label infront of text field
					//$('#' + inputLabelId).text(newInputLabel);
				}
					
				else
				{
					$(callingButton).hide();
					$('#' + maxCharId).css({"border": "thin double red", "background-color": "rgba(250,170,170,0.65)", "border-radius": "4px"}).after("<span>Please provide a valid number</span>");
					
					//Because Jquery can't animate color by default(?) use timeout instead of importing another library
					setTimeout(() =>{
						$('#' + maxCharId).css({"border": "", "background-color": "", "border-radius": ""}).next().remove();
						$(callingButton).show();
					}, 2000);
					
				
				}

				//publish Title
				updateTitle(callingButton);
				
				//Won't clear text fields, they are used to change, not add to the form field
			}



			const handleMultPrefabSubmit = (callingButton) => {

	

				 let formId = $(callingButton).attr("formId"); //We'll use this to id each new input so that they are unique but related to form
				 console.log('Multiple choice: ');

				 let formType = $(callingButton).attr("formType");
				 

				 let labelId =  $(callingButton).attr("labelId");
				 let currentGroupName = $('#'+labelId).text();

				 let radioDivId = $(callingButton).attr("multipleChoiceId");
				 

				 let optionNameId = $(callingButton).attr("multNewOptionId");
				 let optionName = $('#' + optionNameId).val();

				 let optionValueId = $(callingButton).attr("multNewOptionValId"); 
				 let optionValue = $('#' + optionValueId).val();




				 //Should check if label is set
				 if(currentGroupName != '' && optionName != '' && optionValue != '')
				 {
					 
					$('#' + radioDivId)
					.append('<input type="'+formType+'" id="' + optionName +'_'+ formId + '" name="' + currentGroupName + ' " value="' + optionValue + '" >')
					.append('<label for="' + optionName +'_'+ formId + '">'+ optionName +'</label>'); 

				 }
				 else
				 {
					 //animate error on label field

					 //$(callingButton).hide();
					$(callingButton).css({"border": "thin double red", "background-color": "rgba(250,170,170,0.65)", "border-radius": "4px"}).after("<span>Inputs are invalid/missing</span>");
					
					//Because Jquery can't animate color by default(?) use timeout instead of importing another library
					setTimeout(() =>{
						$(callingButton).css({"border": "", "background-color": "", "border-radius": ""}).next().remove();
						//$(callingButton).show();
					}, 2000);
				 }

				console.log(callingButton);
				
			}


			const updateStarCount = (event) =>{

				let chosenImage;
				let newNumStars = $(event.target).val();
				let thisStarId = $(event.target).siblings('.starRatingDiv').attr('idCounter');

				let tempLabel = $('#starLabel_' + thisStarId).text() + '_' + thisStarId;

				//Will remove old list of stars in div, and add new ones

				$(event.target).siblings('.starRatingDiv').empty();

				//loop through and add new starts

				for(let i = 0; i < newNumStars; i++)
						{
							chosenImage = (i <= 3)? starImgPth : emptyStarImgPth;
							//add an input of type 'radio', with relavant attributes. Make display:none so that only label shows, thus providing an image to click
							$(event.target).siblings('.starRatingDiv')
							.append('<input type="radio" id="starRating_'+ thisStarId+'_' + i + '" name="' + tempLabel + '" value="'+ i +'" style="visibility:hidden">')  
							.append('<label for="starRating_'+ thisStarId+'_' + i + '"><img class="starButton" src="'+ chosenImage +'"  width="20" height="20"></img></label>'); 
						}

			}









			//_____________________________________________________________________________________________________________
			//___________________________________________  Helper Functions  __________________________________________________
			//_____________________________________________________________________________________________________________


			//Creates the universal control buttons for editing related form fields, ie save, edit, delete, move, etc.
			const addPrefabControlDiv = (formDivId, formCountId) =>{

				//Create div for save/edit/ TODO(delete ,move up, movedown, copy)

				$(formDivId).after('<div formId = form_"'+ formCountId +'" class="prefabControlsDiv creatorComponents" id="prefabControlsDiv_' + formCountId + '"></div>')

				//and change formControlDivId to add buttons
				let formControlDivId = '#prefabControlsDiv_' + formCountId;

				$(formControlDivId)
				.append('<input class="showOnEdit creatorComponents" id="saveButton_'+ formCountId +'" type="button" formDivId="' + formDivId + '" value="save" onClick="handleSaveForm(this)">');

				$(formControlDivId)
				.append('<input class="hideOnEdit creatorComponents" id="editButton_'+ formCountId + '"  type="button" formDivId="' + formDivId + '" value="edit" onClick="handleEditForm(this)">');
				$('#editButton_' + formCountId).hide();

				$(formControlDivId)
				.append('<input class="creatorComponents" id="moveUpButton_'+ formCountId +'" type="button" formDivId="' + formDivId + '" value="moveUp" onClick="handleMoveUpForm(this)">');

				$(formControlDivId)
				.append('<input class="creatorComponents" id="moveDownButton_'+ formCountId +'" type="button" formDivId="' + formDivId + '" value="moveDown" onClick="handleMoveDownForm(this)">');

				$(formControlDivId)
				.append('<input class="creatorComponents" id="removeButton_'+ formCountId +'" type="button" formDivId="' + formDivId + '" value="remove" onClick="handleRemoveForm(this)">');

			}

			//publishes the title when user submits changes
			const updateTitle = (callingButton)=> {

				console.log("The button updating title",callingButton);
				let titleInput = $(callingButton).siblings(".questionHeaderField").val();
				console.log("finding title field ", titleInput);

				$(callingButton).siblings(".questionHeader").text(titleInput);
			}
			
			

























			//_____________________________________________________________________________________________________________
			//___________________________________________  Main handler  __________________________________________________
			//_____________________________________________________________________________________________________________


			
			//handle input event for updating label (TODO tie to other elements, for now just do for radio button)
			$(document).on('input','.labelInput' , (event)=>{
				
					let currentWord = $(event.target).val();
					let updatingLabelId = $(event.target).attr("labelId");
					$('label#' + updatingLabelId).text(currentWord);

					//handle updating radio button /checkbox names as well if the label is followed by a div
					console.log($('label#' + updatingLabelId).next().is('div'));
					if($('label#' + updatingLabelId).next().is('div'))
					{
						$('label#' + updatingLabelId).next().children('input').attr('name', currentWord);
					}
				});	




			//Handle input event for updating questionHeader
			$(document).on('input','.questionHeaderField' , (event)=>{
				
				let currentWord = $(event.target).val();
				let updatingLabelId = $(event.target).attr("labelId");
				$('label#' + updatingLabelId).text(currentWord);
			});	



			//use this to handle star rating click (click lable image of star, update radio button)
			$(document).on('click', '.starButton', (event) => {

				

				let radioId = $(event.target).parent("label").attr("for");



				$('#' + radioId).click(); //click coresponding radio button

				//set clicked star as full star
				$(event.target).attr('src', starImgPth);
				//set previous sibling label images to full star
				$(event.target).parent().prevAll('label').each( (index, object) => {
					console.log(object);
					console.log();
					$(object).children('img').attr('src', starImgPth); 
				});
				//set fllowing sibling label images to full star
				$(event.target).parent().nextAll('label').each( (index, object) => {
					$(object).children('img').attr('src', emptyStarImgPth); 
				});


			});



			//use to handle when updating number of stars for star rating
			$(document).on('change', '.starCountInput', (event) => {
				
				//call updateStarCount, since this and on.input will need to be checked
				updateStarCount(event);

			});

			

	
				

			//TODO place keypress handle for other fields that don't need to be submitted
			//ie, for now focus on star rating and number of stars
			//later, things unhandled lie default text, char count, etc
			//anything really  that isn't submitting options


			$(document).ready(() => {

			



				
				

















				//When document changes because the user choose which type of form field to make
				$(document).on('change', '.formSelectorMenu', (theElement) => {

				//..leave these for now, it works and doesn't break what we have
				let targetSelector = theElement.target;

				let formSelected = $(targetSelector).val();

				let formDivId; //for keeping track where the new form field is being placed and manipulated

				let multChoiceType; //If we get multipleChoice or checkbox, use this to determine which type of input

				switch(formSelected)
				{
					case "selectBox":
						
						//Insert Div for the SelectBox Section
						$(targetSelector).replaceWith('<div formId= "form_'+ formCounterId +'" class="selectPrefabDiv formField" id="selectPrefabDiv_' + selectBoxIdCounter + '"></div>');
						formDivId = '#selectPrefabDiv_' + selectBoxIdCounter;

						//Add Text input to set question
						$(formDivId)
						.append('<input class="showOnEdit questionHeaderField creatorComponents" type="text" id="selectQuestionField_' + selectBoxIdCounter + '" labelId="selectQuestionLabel_' + selectBoxIdCounter + '" placeholder="Place question Here"><br>');


						//Add  the question
						$(formDivId)
						.append('<label class="questionHeader" id="selectQuestionLabel_' + selectBoxIdCounter + '" for="selectBox_' + selectBoxIdCounter + '"></label><br><br>');

						//Add the label infront of the selectBox
						$(formDivId)
						.append('<label id="selectBoxLabel_' + selectBoxIdCounter + '" for="selectBox_' + selectBoxIdCounter + '">Label:</label>');

						//Add the SelectBox
						$(formDivId)
						.append('<select id="selectBox_' + selectBoxIdCounter + '"><option value="ReplaceDefault" >Options go here</option></select><br>');



						//Add text input for changing label infront of selectBox
						$(formDivId)
						.append('<input class="showOnEdit creatorComponents labelInput" type="text" id="selectLabelInput_'+ selectBoxIdCounter +'" labelId="selectBoxLabel_' + selectBoxIdCounter + '" placeholder="Label:">');
						
						//Add text input for adding SelectBox option
						$(formDivId)
						.append('<input class="showOnEdit creatorComponents" type="text" id="selectPrefabInput_'+ selectBoxIdCounter +'" placeholder="AddOption">');

						//Add text input for providing coresponding value for option
						$(formDivId)
						.append('<input class="showOnEdit creatorComponents" type="text" id="selectPrefabInputVal_'+ selectBoxIdCounter +'" placeholder="Option Value">');

						//Add button that will add option to SelectBox. Holds SelectBox and relevant input id's to access them
						$(formDivId)
						.append('<input type="button" class="selectAddOptionButton showOnEdit creatorComponents" id="selectAddOptionButton_'+ selectBoxIdCounter+'"   selectBoxId="selectBox_' + selectBoxIdCounter + '"  selectNewOptionId="selectPrefabInput_' + selectBoxIdCounter + '" selectNewOptionValId="selectPrefabInputVal_' + selectBoxIdCounter + '" value="Add Option" onClick="handleSelectPrefabSubmit(this)">');


						//Increment number of SelectBox counter
						selectBoxIdCounter++;
						selectBoxCounter++;
						$(".selectPrefabDiv").css({"border": "thin double black", "background-color": "rgba(0,100,150,0.15)", "margin" : "3px", "padding": "16px"});


						//Create div for save/edit/ TODO(delete ,move up, movedown, copy)

						addPrefabControlDiv(formDivId, formCounterId);

						formCounterId++;
						formCounter++;
						
						break;




					case 'shortParagraph':
							//Insert Div for the shortParagraph Section
						$(targetSelector).replaceWith('<div formId = form_"'+ formCounterId +'" class="shortParaPrefabDiv formField" id="shortParaPrefabDiv_' + shortParagraphIdCounter + '"></div>');
						formDivId = '#shortParaPrefabDiv_' + shortParagraphIdCounter;



						//Add Text input to set question
						$(formDivId)
						.append('<input type="text" class="showOnEdit questionHeaderField creatorComponents" id="shortParaQuestionField_' + shortParagraphIdCounter + '" labelId="shortParaQuestionLabel_' + shortParagraphIdCounter + '" placeholder="Place question Here"><br>');


						//Add  the question 
						$(formDivId)
						.append('<label class="questionHeader" id="shortParaQuestionLabel_' + shortParagraphIdCounter + '" for="shortParaTextArea_' + shortParagraphIdCounter + '"></label><br><br>');
						


						//Add the TextField (Does nothing, there for viewing purposes and showing Author defaults if any) (while size is set here, its assume that text area can be resizeable from user)
						$(formDivId)
						.append('<textarea id="shortParaTextArea_' + shortParagraphIdCounter + '" name="shortPara_' + shortParagraphIdCounter + '" placeholder="Placeholder Text" rows="5" cols="64" maxlength="'+ SURVEY_MAX_CHAR_LIMIT +'"></textarea><br>');




						//Add text input for changing placeholder textbox message
						$(formDivId)
						.append('<input type="text" class="showOnEdit creatorComponents" id="shortParaDefaultMes_'+ shortParagraphIdCounter +'" placeholder="Change placeholder message">');

						//Add text input for character limit
						$(formDivId)
						.append('<input type="number" class="showOnEdit creatorComponents" id="shortParaCharLimit_'+ shortParagraphIdCounter +'" placeholder="Enter character Limit (max '+ SURVEY_MAX_CHAR_LIMIT +')" max = "'+ SURVEY_MAX_CHAR_LIMIT +'" min = "0">');

						//Add button that will add option to SelectBox. Holds SelectBox and relevant input id's to access them
						$(formDivId)
						.append('<input type="button" class="shortParaChangeAttrButton showOnEdit creatorComponents" id="shortParawChangeAttrButton_'+ shortParagraphIdCounter+'" shortParaId="shortParaTextArea_' + shortParagraphIdCounter + '" placeHolderId="shortParaDefaultMes_' + shortParagraphIdCounter + '" shortParaCharLimId="shortParaCharLimit_'+ shortParagraphIdCounter +'" value="Apply Options" onClick="handleShortParaPrefabSubmit(this)">');


						//Increment number of SelectBox counter
						shortParagraphIdCounter++;
						shortParagraphCounter++;

						//Create div for save/edit/ TODO(delete ,move up, movedown, copy)
						addPrefabControlDiv(formDivId, formCounterId);

						formCounterId++;
						formCounter++;

						break;


						//Same as short paragraph, except smaller text field and a label in front
						case 'shortAnswer':
							//Insert Div for the shortParagraph Section
						$(targetSelector).replaceWith('<div formId = form_"'+ formCounterId +'" class="shortAnsPrefabDiv formField" id="shortAnsPrefabDiv_' + shortAnswerIdCounter + '"></div>');
						formDivId = '#shortAnsPrefabDiv_' + shortAnswerIdCounter;

						//Add Text input to set question
						$(formDivId)
						.append('<input type="text" class="showOnEdit questionHeaderField creatorComponents" id="shortAnsQuestionField_' + shortAnswerIdCounter + '" labelId="shortAnsQuestionLabel_' + shortAnswerIdCounter + '" placeholder="Place question Here"><br>');

						//Add the question 
						$(formDivId)
						.append('<label class="questionHeader" id="shortAnsQuestionLabel_' + shortAnswerIdCounter + '" for="shortAnsTextArea_' + shortAnswerIdCounter + '"></label><br><br>');
						

						//Add the label infront of the text field
						$(formDivId)
						.append('<label id="shortAnsLabel_' + shortAnswerIdCounter + '" for="shortAnsTextArea_' + shortAnswerIdCounter + '">Label:</label>');
						

						//Add the TextField (Does nothing, there for viewing purposes and showing Author defaults if any) (while size is set here, its assume that text area can be resizeable from user)
						$(formDivId)
						.append('<input type="text" id="shortAnsTextArea_' + shortAnswerIdCounter + '" name="shortAns_' + shortAnswerIdCounter + '" placeholder="Placeholder Text"  maxlength="'+ SURVEY_MAX_CHAR_LIMIT +'"><br>');



						//Add text input for changing input field label
						$(formDivId)
						.append('<input type="text" class="showOnEdit creatorComponents labelInput" id="shortAnsLabelInput_'+ shortAnswerIdCounter +'" labelId="shortAnsLabel_' + shortAnswerIdCounter + '" placeholder="Change Label:">');

						//Add text input for changing placeholder textbox message
						$(formDivId)
						.append('<input type="text" class="showOnEdit creatorComponents" id="shortAnsDefaultMes_'+ shortAnswerIdCounter +'" placeholder="Change placeholder message">');

						//Add text input for character limit
						$(formDivId)
						.append('<input type="number" class="showOnEdit creatorComponents" id="shortAnsCharLimit_'+ shortAnswerIdCounter +'" placeholder="Enter character Limit (max '+ SURVEY_MAX_CHAR_LIMIT +')" max = "'+ SURVEY_MAX_CHAR_LIMIT +'" min = "0">');

						//Add button that will add options to ShortAnswer. Holds ShortAnswer textfield and relevant input id's to access them
						$(formDivId)
						.append('<input type="button" class="shortAnsChangeAttrButton showOnEdit creatorComponents" id="shortAnswChangeAttrButton_'+ shortAnswerIdCounter+'" shortAnsId="shortAnsTextArea_' + shortAnswerIdCounter + '" placeHolderId="shortAnsDefaultMes_' + shortAnswerIdCounter + '" shortAnsCharLimId="shortAnsCharLimit_'+ shortAnswerIdCounter +'"    value="Apply Options" onClick="handleShortAnsPrefabSubmit(this)">');


						//Increment number of SelectBox counter
						shortAnswerIdCounter++;
						shortAnswerCounter++;

						//Create div for save/edit/ TODO(delete ,move up, movedown, copy)
						addPrefabControlDiv(formDivId, formCounterId);

						formCounterId++;
						formCounter++;

						break;



						case 'checkBox':
						case 'multipleChoice':
						
						multChoiceType = (formSelected == 'checkBox')? 'checkbox' : 'radio';
						let counterId = (formSelected == 'checkBox')?  checkBoxIdCounter: multipleChoiceIdCounter;
						let idPrefix = (formSelected == 'checkBox')?  'check': 'mult';
						let coreFormPart = (formSelected == 'checkBox')?  'checkBox': 'multipleChoice';

							
						
						//Insert Div for the MultipleChoice Section
						$(targetSelector).replaceWith('<div formId= "form_'+ formCounterId +'" class="'+idPrefix+'PrefabDiv formField" id="'+idPrefix+'PrefabDiv_' + counterId + '"></div>');
						formDivId = '#'+idPrefix+'PrefabDiv_' + counterId;

						//Add Text input to set question
						$(formDivId)
						.append('<input class="showOnEdit questionHeaderField creatorComponents" type="text" id="'+idPrefix+'QuestionField_' + counterId + '" labelId="'+idPrefix+'QuestionLabel_' + counterId + '" placeholder="Place question Here"><br>');


						//Add  the question
						$(formDivId)
						.append('<label class="questionHeader" id="'+idPrefix+'QuestionLabel_' + counterId + '" for="'+coreFormPart+'_' + counterId + '"></label><br><br>');

						//Add the label for multiple choice
						$(formDivId)
						.append('<label  id="'+idPrefix+'Label_' + counterId + '" for="'+coreFormPart+'_' + counterId + '">Label:</label>');



						// ---------------VVVVVVVVVVVVVVVVVVV   figure out multiple choice radio


						//Add the Radio or checkbox Section. Will use a div to insert the inputs
						$(formDivId)
						.append('<div id="'+coreFormPart+'_' + counterId + '"></div><br>');







						//Add text input for changing label for multiple choice (the name of radio group) (TODO Use on keystroke instead of submitting)
						$(formDivId)
						.append('<input class="showOnEdit creatorComponents labelInput" type="text" id="'+idPrefix+'LabelInput_'+ counterId +'" labelId="'+idPrefix+'Label_' + counterId + '" placeholder="Group Name:" >');
						
						//Add text input for adding multiple Choice option (the Label for one radio button)
						$(formDivId)
						.append('<input class="showOnEdit creatorComponents" type="text" id="'+idPrefix+'PrefabInput_'+ counterId +'" placeholder="AddOption">');




						//Add text input for providing coresponding value for option (value for that radio button)
						$(formDivId)
						.append('<input class="showOnEdit creatorComponents" type="text" id="'+idPrefix+'PrefabInputVal_'+ counterId +'" placeholder="Option Value">');



						//Add button that will add option to SelectBox. Holds SelectBox and relevant input id's to access them
						//TODO change key names to be more general here and in calling method. For now leave as is to keep functionality, but later make generic for both mulchoice and checks
						$(formDivId)
						.append('<input type="button" class="'+idPrefix+'AddOptionButton showOnEdit creatorComponents" id="'+idPrefix+'AddOptionButton_'+ counterId+'"  multipleChoiceId="'+coreFormPart+'_' + counterId + '" labelId="'+idPrefix+'Label_'+ counterId +'"  multNewOptionId="'+idPrefix+'PrefabInput_' + counterId + '"multNewOptionValId="'+idPrefix+'PrefabInputVal_' + counterId + '" formId="'+formCounterId+'" formType="'+multChoiceType+'" value="Add Option" onClick="handleMultPrefabSubmit(this)">');


						//Increment number of multipleChoice or cehckBox counter
						if(formSelected == 'multipleChoice')
						{
							multipleChoiceIdCounter++;
							multipleChoiceCounter++;
						}
						else
						{
							checkBoxIdCounter++;
							checkBoxCounter++;
						}
						


						


						//Create div for save/edit/ TODO(delete ,move up, movedown, copy)

						addPrefabControlDiv(formDivId, formCounterId);

						formCounterId++;
						formCounter++;
						
						break;







						//handle like radio, except not adding options, just changing number of radio buttons
						case 'starRating':



							//Insert Div for the MultipleChoice Section
						$(targetSelector).replaceWith('<div formId= "form_'+ formCounterId +'" class="starPrefabDiv formField" id="starPrefabDiv_' + starIdCounter + '"></div>');
						formDivId = '#starPrefabDiv_' + starIdCounter;

						//Add Text input to set question
						$(formDivId)
						.append('<input class="showOnEdit questionHeaderField creatorComponents" type="text" id="starQuestionField_' + starIdCounter + '" labelId="starQuestionLabel_' + starIdCounter + '" placeholder="Place question Here"><br>');


						//Add  the question
						$(formDivId)
						.append('<label class="questionHeader" id="starQuestionLabel_' + starIdCounter + '" for="starRating_' + starIdCounter + '"></label><br><br>');

						//Add the label for multiple choice
						$(formDivId)
						.append('<label  id="starLabel_' + starIdCounter + '" for="starRating_' + starIdCounter + '">Label:</label>');



						// ---------------VVVVVVVVVVVVVVVVVVV   figure out multiple choice radio










						//Add the Radio Section. Will use a div to insert the inputs
						$(formDivId)
						.append('<div class="starRatingDiv" id="starRating_' + starIdCounter + '" idCounterId='+starIdCounter+'></div>');
						//add to the div the deafualt 5 'star' buttons
						let tempLabel = $('#starLabel_' + starIdCounter).text() + '_' + starIdCounter;
						let chosenImage;
						for(let i = 0; i < 5; i++)
						{
							chosenImage = (i <= 3)? starImgPth : emptyStarImgPth;
							//add an input of type 'radio', with relavant attributes. Make display:none so that only label shows, thus providing an image to click
							$(formDivId).children().last()
							.append('<input type="radio" id="starRating_'+ starIdCounter+'_' + i + '" name="' + tempLabel + '" value="'+ i +'" style="visibility:hidden">')  
							.append('<label for="starRating_'+ starIdCounter+'_' + i + '"><img class="starButton" src="'+ chosenImage +'"  width="20" height="20"></img></label>'); 
						}
						












						//Add text input for changing label for star rating (the name of radio group) (TODO Use on keystroke instead of submitting)
						$(formDivId)
						.append('<input class="showOnEdit creatorComponents labelInput" type="text" id="starLabelInput_'+ starIdCounter +'" labelId="starLabel_' + starIdCounter + '" placeholder="Group Name:" >');

						//Add select box for choosing number (too many issues with using input field, couldn't properly prevent non-number or empty field)
						$(formDivId)
						.append('<select class="showOnEdit creatorComponents starCountInput"  id="starPrefabInput_'+ starIdCounter +'" placeholder="numStars" ></select>');
						
						//add options to select box
						for(let i = 2; i <= STAR_RATING_MAX_STAR_LIMIT; i++ )
						{
							
							$(formDivId).children().last().append('<option value="'+i+'">'+i+' stars</option>');
							if(i == 5)
							$(formDivId).children().last().children().last().prop('selected', true);

						}
						



						/*
						//may not need........

						//Add text input for providing coresponding value for option (value for that radio button)
						$(formDivId)
						.append('<input class="showOnEdit creatorComponents" type="text" id="multPrefabInputVal_'+ multipleChoiceIdCounter +'" placeholder="Option Value">');




						//...also may not need, remove for now
						//Add button that will add option to SelectBox. Holds SelectBox and relevant input id's to access them
						$(formDivId)
						.append('<input type="button" class="multAddOptionButton showOnEdit creatorComponents" id="multAddOptionButton_'+ multipleChoiceIdCounter+'"  multipleChoiceId="multipleChoice_' + multipleChoiceIdCounter + '" labelId="multLabel_'+ multipleChoiceIdCounter +'"  multNewOptionId="multPrefabInput_' + multipleChoiceIdCounter + '"multNewOptionValId="multPrefabInputVal_' + multipleChoiceIdCounter + '" formId="'+formCounterId+'" value="Add Option" onClick="handleMultPrefabSubmit(this)">');
						*/

						//Increment number of SelectBox counter
						starIdCounter++;
						starCounter++;





						//Create div for save/edit/ TODO(delete ,move up, movedown, copy)

						addPrefabControlDiv(formDivId, formCounterId);

						formCounterId++;
						formCounter++;

							break;



						/*
						// Same as multiple choice, except type is checkBox
						//Save as backup if screw up above mixing of both


						case 'checkBox':


						//Insert Div for the MultipleChoice Section
						$(targetSelector).replaceWith('<div formId= "form_'+ formCounterId +'" class="multPrefabDiv formField" id="multPrefabDiv_' + multipleChoiceIdCounter + '"></div>');
						formDivId = '#multPrefabDiv_' + multipleChoiceIdCounter;

						//Add Text input to set question
						$(formDivId)
						.append('<input class="showOnEdit questionHeaderField creatorComponents" type="text" id="multQuestionField_' + multipleChoiceIdCounter + '" labelId="multQuestionLabel_' + multipleChoiceIdCounter + '" placeholder="Place question Here"><br>');


						//Add  the question
						$(formDivId)
						.append('<label class="questionHeader" id="multQuestionLabel_' + multipleChoiceIdCounter + '" for="multipleChoice_' + multipleChoiceIdCounter + '"></label><br><br>');

						//Add the label for multiple choice
						$(formDivId)
						.append('<label  id="multLabel_' + multipleChoiceIdCounter + '" for="multipleChoice_' + multipleChoiceIdCounter + '">Label:</label>');



						// ---------------VVVVVVVVVVVVVVVVVVV   figure out multiple choice radio


						//Add the Radio Section. Will use a div to insert the inputs
						$(formDivId)
						.append('<div id="multipleChoice_' + multipleChoiceIdCounter + '"></div><br>');







						//Add text input for changing label for multiple choice (the name of radio group) (TODO Use on keystroke instead of submitting)
						$(formDivId)
						.append('<input class="showOnEdit creatorComponents labelInput" type="text" id="multLabelInput_'+ multipleChoiceIdCounter +'" labelId="multLabel_' + multipleChoiceIdCounter + '" placeholder="Group Name:" >');

						//Add text input for adding multiple Choice option (the Label for one radio button)
						$(formDivId)
						.append('<input class="showOnEdit creatorComponents" type="text" id="multPrefabInput_'+ multipleChoiceIdCounter +'" placeholder="AddOption">');




						//Add text input for providing coresponding value for option (value for that radio button)
						$(formDivId)
						.append('<input class="showOnEdit creatorComponents" type="text" id="multPrefabInputVal_'+ multipleChoiceIdCounter +'" placeholder="Option Value">');



						//Add button that will add option to SelectBox. Holds SelectBox and relevant input id's to access them
						$(formDivId)
						.append('<input type="button" class="multAddOptionButton showOnEdit creatorComponents" id="multAddOptionButton_'+ multipleChoiceIdCounter+'"  multipleChoiceId="multipleChoice_' + multipleChoiceIdCounter + '" labelId="multLabel_'+ multipleChoiceIdCounter +'"  multNewOptionId="multPrefabInput_' + multipleChoiceIdCounter + '"multNewOptionValId="multPrefabInputVal_' + multipleChoiceIdCounter + '" formId="'+formCounterId+'" value="Add Option" onClick="handleMultPrefabSubmit(this)">');


						//Increment number of SelectBox counter
						multipleChoiceIdCounter++;
						multipleChoiceCounter++;





						//Create div for save/edit/ TODO(delete ,move up, movedown, copy)

						addPrefabControlDiv(formDivId, formCounterId);

						formCounterId++;
						formCounter++;

						break;
							*/


				}

				//Apply css
				$(".formField").css({"border": "thin double black", "background-color": "rgba(0,100,150,0.15)", "margin" : "3px", "padding": "16px"});
				$("form label").css({"font-weight" : "bold"});
				$("form .questionHeader").css({"font-size" : "30px","text-decoration" : "underline"});
				});
























				//_____________________________________________________________________________________________________________
				//___________________________________________  Other Commands on Document.ready()  _________________________________
				//_____________________________________________________________________________________________________________

				



				// Add a new select box for deciding which prefab survey to create
				$('#newFormElementButton').click( (event) => {
					event.preventDefault();
					$("#newFormElementButton").before(formSelector);

					// //refresh footer
					// $('.footer').css('top', '100%');
				});


				


				//----------------   PUBLISH (TODO figure out)
				
				//This function should clear the author tools leaving a barebones page, and (somehow) convert DOM data to something like JSON
				//Which can be saved in MySQL so that the page can be re-rendered for survey use
				//Current Steps:
				//
				// 1) Clear author tools|
				// 2) Convert DOM to relevant data, and maybe move to JSON
				// 3) send to Server
				// 4) make php that can retrieve said data and reconstruct page, which can submit data back to php to turn in survey data


				$('#publishPageButton').click( (event) => {
					//Remove class .creatorComponents, which should be attached to everything that would edit the page
					//thus leaving the stripped down page

					//Apply any unpublished title
					

					$(".creatorComponents").remove(".creatorComponents"); //Kill all
					//Show any hidden components not killed
					$(".hideOnEdit").show();
					//remove publish button
					$("#publishPageButton").remove();

					/* hold off on this, not working TODO TODO TODO
					//remove any empty space from non titles or labels
					$('label').each(()=>{

						console.log('tagname: ', $(this).prop('tagName'));
						if($(this).text() == "" || $(this).val() == "")
						{
							
							console.log('Bawleeted!');
							$(this).remove(this);
						}
							
					});

					//remove concuring <br>
					$('br').each(()=>{
						//console.log('nodename: ', $(this).prop('tagName'));
						if($(this).next().prop('tagName') == 'br')
							$(this).remove(this);
					});
					*/

					$("form").append('<input type="submit" value="Submit Survey">');//'<buton type="submit" form="formStart">Submit Survey</button>');
				
					//..then, maybe at end place button that will actually submit form

					//then create json/data that will be sent to server to be save...
				});




				
				
			})