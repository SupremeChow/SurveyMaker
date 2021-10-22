

const createStarRatingPrefab = (targetSelector, formCounterId, starIdCounter, starImgPth, emptyStarImgPth, STAR_RATING_MAX_STAR_LIMIT) =>{
    let formDivId;
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
    
    return formDivId;
}

export{createStarRatingPrefab};