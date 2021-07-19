

$(document).ready(function(){
    const noResultBlock= document.querySelector(".noResultBlock");
    loadData();
    function loadData(){
        courseData = getData();
        populateUI(courseData);
    }
    function getData(){
        var courses = [
            {id:1, title: "Masters Program in Computer Science", period: "Summer 2021", level: "Master's", subjectArea: "Computer Science", paceOfStudy: "Full-time", teachingForm: "Program", applicationCode: "EUA-123"},                 
            {id:2, title: "Masters Program in Software Engineering", period: "Summer 2021", level: "Master's", subjectArea: "Computer Science", paceOfStudy: "Full-time", teachingForm: "Program", applicationCode: "EUA-124"},
            {id:3, title: "Masters Program in Telecommunication Systems", period: "Autumn 2021", level: "Master's", subjectArea: "Computer Science", paceOfStudy: "75%", teachingForm: "Program", applicationCode: "EUA-125"},
            {id:4, title: "User Experience Design", period: "Summer 2021", level: "Bachelor's", subjectArea: "Computer Science", paceOfStudy: "75%", teachingForm: "Course", applicationCode: "EUA-126"},
            {id:5, title: "Evolutionary Biology", period: "Autumn 2021", level: "Master's", subjectArea: "Biology", paceOfStudy: "Full-time", teachingForm: "Course", applicationCode: "EUA-127"},
            {id:6, title: "Cell and Developmental Biology", period: "Autumn 2021", level: "Bachelor's", subjectArea: "Biology", paceOfStudy: "Full-time", teachingForm: "Program", applicationCode: "EUA-128"},
            {id:7, title: "Human Physiology", period: "Summer 2021", level: "Beginner", subjectArea: "Biology", paceOfStudy: "Full-time", teachingForm: "Course", applicationCode: "EUA-129"}
        ];

        return courses;
    }

    function populateUI(data){
        $("#search-result").empty();
        data.forEach(course => {
            var html = `<div class="searchresult-card">
            <div class="resultcard-header">
            <h3 class="column-heading">${course.title}</h3>
            </div>
            <div class="resultcard-content font-light-color">
            <div class="resultcard-content-col">
            <p class="line-spacing"><span class="subtitle">Period: </span>${course.period}</p>
            <p class="line-spacing"><span class="subtitle">Level: </span>${course.level}</p>
            <p class="line-spacing"><span class="subtitle">Subject Area: </span>${course.subjectArea}</p>
            </div>
            <div class="resultcard-content-col">
            <p class="line-spacing"><span class="subtitle">Pace of study: </span>${course.paceOfStudy}</p>
            <p class="line-spacing"><span class="subtitle">Teaching form: </span>${course.teachingForm}</p>
            <p class="line-spacing"><span class="subtitle">Application code: </span>${course.applicationCode}</p>
            </div>
            </div>
            </div>`;
            $("#search-result").append(html);
        });
    }

    function displayerrorMessage(){
        var html = `<div class="noMatchingResult searchresult-card">
                            <div class="image-container"></div>
                            <p class="subtitle text-center">Your search criteria did not match any courses or programs</p>
                            </div>`;
                            $("#search-result").append(html);
    }

// display result as per searched text and semester selection in search bar

    var filteredList = [];
    courseDataAfterSearch =  courseData;
    $("#search").submit(function() {
        var searchText = $("#freeText").val();
        var semester = $("#period").val();
        filteredList = courseData.filter(course => ((course.period.toUpperCase().indexOf(semester.toUpperCase()) != -1) && (course.subjectArea.toUpperCase().indexOf(searchText.toUpperCase()) != -1)));
        populateUI(filteredList);
        courseDataAfterSearch = filteredList;
        resetFilters();
        event.preventDefault();
    });
    
    //filter serach results as per selected filters in the filter bar

    $('#search-form').change(filterData);
    function filterData () {
        var checkedFilters = getSelectedFilters();
        checkedCheckbox = checkedFilters.filter(filter => (filter.type ==="checkbox"));
        checkedRadio = checkedFilters.filter(filter => (filter.type==="radio"));
        checkedDropdown = checkedFilters.filter(filter => (filter.type ==="dropdown"));
        final_filtered_list = courseDataAfterSearch;

        //if radio button is selected, update filtered list as per that filter

        if  ((checkedRadio.length !=0) && (checkedRadio[0].value)!="both"){
            final_filtered_list = final_filtered_list.filter(course => (course.teachingForm.toUpperCase().indexOf(checkedRadio[0].value.toUpperCase()) != -1));
        }

        //if checkbox is selected, update filtered list as per that filter

        if (checkedCheckbox.length!=0) {
            var filteredListForAllCheckBoxFilters = [];
            for(var i in checkedCheckbox) {
                filteredListForACheckBoxFilter = final_filtered_list.filter(course => (course.level.toUpperCase().indexOf(checkedCheckbox[i].value.toUpperCase()) != -1));
                filteredListForAllCheckBoxFilters = filteredListForAllCheckBoxFilters.concat(filteredListForACheckBoxFilter);
            }
            final_filtered_list = filteredListForAllCheckBoxFilters;
        }

            //if dropdown is selected, update filtered list as per that filter

        if ((checkedDropdown)[0].value!="all"){
            final_filtered_list = final_filtered_list.filter(course => (course.paceOfStudy.toUpperCase().indexOf(checkedDropdown[0].value.toUpperCase()) != -1));
        }

        //display search result after applying all the selected filters on the list

        populateUI(final_filtered_list);

        //If filter is selected but there are no matching results, display a message

        if (final_filtered_list.length===0){
            displayerrorMessage();
        }
    }

    function getSelectedFilters(){
        var selectedFilters = [];
        $(".level-checkbox:checked, .input-radio:checked, #pace-study").each(function(){
            var filter_type = $(this).attr('type');
            var filter_value = $(this).val();
            selectedFilters.push({type : filter_type, value : filter_value});
        });
        return selectedFilters;
    }

    $('#reset').click(resetFilters);

    function resetFilters() {
    $(':checkbox').each(function() {
        this.checked = false;
    });
    $("#typeboth").prop("checked", true);
    $("#pace-study")[0].selectedIndex = 0;
    populateUI(courseDataAfterSearch);
    }
});
