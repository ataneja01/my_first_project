
const allCoursesDuration= document.querySelectorAll(".buy-page-text .price-text");
const allCoursesPrice= document.querySelectorAll(".price");
const allCoursesSecondYearPrice= document.querySelectorAll(".buy-body-second-row"); 
document.getElementById("plan-selection").addEventListener("click", changeContentAsPerSelectedPlan);
function changeContentAsPerSelectedPlan(){
const planType = event.target.getAttribute("data-plan");	
if (event.target.classList.contains("selectButton")){
    document.querySelectorAll(".selectButton").forEach((plan) => {plan.classList.remove("current-tab")});
    event.target.classList.add("current-tab");}
if (planType === "monthly") {
    allCoursesDuration.forEach((duration) => {
            duration.innerHTML = "per month";
}); 
    allCoursesPrice[0].innerHTML = "€49.00";
    allCoursesPrice[1].innerHTML = "€59.00";
    allCoursesPrice[2].innerHTML = "€69.00";
    allCoursesSecondYearPrice.forEach((price) => {
            price.style.display= "none";
}); 
}
else if (planType ==="annual"){
    allCoursesDuration.forEach((duration) => {
        duration.innerHTML = "per year";
});
    allCoursesPrice[0].innerHTML = "€500.00";
    allCoursesPrice[1].innerHTML = "€600.00";
    allCoursesPrice[2].innerHTML = "€700.00";
    allCoursesSecondYearPrice.forEach((price) => {
            price.style.display= "flex";
});
}		
}
