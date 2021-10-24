/**  
 *  Class and methods for handling a StarRating
 */

//Treat similar to Multiple Choice, since it use radio buttons to handle star rating

class StarRating 
{
    idVal;
    position;
    //parentFormId; //Hold off on this, may be nice to have for db, but no focus right now
    numStars;
    selectedOption;
    question;
    label;

    constructor(idVal, position, numStars, selectedOption, question, label )
    {
        this.idVal = idVal;
        this.position = position;
        //this.parentFormId; //Hold off on this, may be nice to have for db, but no focus right now
        this.numStars = numStars;
        this.selectedOption = selectedOption;
        this.question = question;
        this.label = label;
    }

    //___________________________________________ Setters __________________________

    set idVal(newId){this._idVal = newId;};
    set position(newPosition){this._position = newPosition;};
    //set parentFormId(newParent){}; //Hold off on this, may be nice to have for db, but no focus right now
    set numStars(newNumStars){this._numStars = newNumStars;};
    set selectedOption(newSelection){this._selectedOption = newSelection};
    set question(newQuestion){this._question = newQuestion};
    set label(newLabel){this._Label = newLabel};

    //___________________________________________ Getters __________________________
    
    get idVal(){return this._idVal};
    get position(){return this._position};
    //get parentFormId(){return this.parentForimId;}; //Hold off on this, may be nice to have for db, but no focus right now
    get numStars(){return this._numStars};
    get selectedOption(){return this._selectedOption};
    get question(){return this._question};
    get label(){return this._label};




    //___________________________________________ Other Methods ________________________

    starClicked(starValue) 
    {
        //Input is the value of the coresponding radio button for that star
        //TODO, method seems redundant given we already have set star, but we'll keep here incase other use for star rating be clicked

        this.selectedOption = starValue;

    }

    toJSON()
    {
        return{ 
            idVal : this.idVal,
            position : this.position,
            //parentFormId : this.parentFormId, 
            numStars : this.numStars,
            selectedOption : this.selectedOption,
            question : this.question,
            label : this.label
        };
    }
}






const createStarRatingPrefab = (targetSelector, formCounterId, starIdCounter, starImgPth, emptyStarImgPth, STAR_RATING_MAX_STAR_LIMIT) =>{
    let formDivId;
    //Insert Div for the MultipleChoice Section
    $(targetSelector).replaceWith('<div formId= "form_'+ formCounterId +'" class="starPrefabDiv formField" id="starPrefabDiv_' + starIdCounter + '"></div>');
    formDivId = 'starPrefabDiv_' + starIdCounter;

    //Add Text input to set question
    $('#'+formDivId)
    .append('<input class="showOnEdit questionHeaderField creatorComponents" type="text" id="starQuestionField_' + starIdCounter + '" labelId="starQuestionLabel_' + starIdCounter + '" placeholder="Place question Here"><br>');


    //Add  the question
    $('#'+formDivId)
    .append('<label class="questionHeader" id="starQuestionLabel_' + starIdCounter + '" for="starRating_' + starIdCounter + '"></label><br><br>');

    //Add the label for starRating
    $('#'+formDivId)
    .append('<label  id="starLabel_' + starIdCounter + '" for="starRating_' + starIdCounter + '">StarRating'+starIdCounter+'</label>');




    //Add the Radio Section. Will use a div to insert the inputs
    $('#'+formDivId)
    .append('<div class="starRatingDiv" id="starRating_' + starIdCounter + '" idCounterId='+starIdCounter+'></div>');
    //add to the div the deafualt 5 'star' buttons
    let tempLabel = $('#starLabel_' + starIdCounter).text() + '_' + starIdCounter;
    let chosenImage;
    for(let i = 0; i < 5; i++)
    {
        chosenImage = (i < 3)? starImgPth : emptyStarImgPth;
        //add an input of type 'radio', with relavant attributes. Make display:none so that only label shows, thus providing an image to click
        $('#'+formDivId).children().last()
        .append('<input type="radio" id="starRating_'+ starIdCounter+'_' + i + '" name="' + tempLabel + '" value="'+ i +'" style="visibility:hidden">')  
        .append('<label for="starRating_'+ starIdCounter+'_' + i + '"><img class="starButton" src="'+ chosenImage +'"  width="20" height="20"></img></label>'); 
    }
    

    //Add text input for changing label for star rating (the name of radio group) (TODO Use on keystroke instead of submitting)
    $('#'+formDivId)
    .append('<input class="showOnEdit creatorComponents labelInput" type="text" id="starLabelInput_'+ starIdCounter +'" labelId="starLabel_' + starIdCounter + '" placeholder="Group Name:" >');

    //Add select box for choosing number (too many issues with using input field, couldn't properly prevent non-number or empty field)
    $('#'+formDivId)
    .append('<select class="showOnEdit creatorComponents starCountInput"  id="starPrefabInput_'+ starIdCounter +'" placeholder="numStars" formDivId ="' + formDivId + '" ></select>');
    
    //add options to select box
    for(let i = 2; i <= STAR_RATING_MAX_STAR_LIMIT; i++ )
    {
        
        $('#'+formDivId).children().last().append('<option value="'+i+'">'+i+' stars</option>');
        if(i == 5)
        $('#'+formDivId).children().last().children().last().prop('selected', true);

    }
    
    return formDivId;
}

const updateStarCount = (event, starImgPth, emptyStarImgPth) =>{

    let chosenImage;
    let newNumStars = $(event.target).val();
    let thisStarId = $(event.target).siblings('.starRatingDiv').attr('idCounter');

    let tempLabel = $('#starLabel_' + thisStarId).text() + '_' + thisStarId;

    //Will remove old list of stars in div, and add new ones

    $(event.target).siblings('.starRatingDiv').empty();

    //loop through and add new starts

    for(let i = 0; i < newNumStars; i++)
    {
        chosenImage = (i < 3)? starImgPth : emptyStarImgPth;
        //add an input of type 'radio', with relavant attributes. Make display:none so that only label shows, thus providing an image to click
        $(event.target).siblings('.starRatingDiv')
        .append('<input type="radio" id="starRating_'+ thisStarId+'_' + i + '" name="' + tempLabel + '" value="'+ i +'" style="visibility:hidden">')  
        .append('<label for="starRating_'+ thisStarId+'_' + i + '"><img class="starButton" src="'+ chosenImage +'"  width="20" height="20"></img></label>'); 
    }

    console.log('new stars set in view as: ', newNumStars);
    return newNumStars;

}

export{createStarRatingPrefab, updateStarCount, StarRating};