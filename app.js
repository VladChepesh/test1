// Initialize Dom elements for interface control
const container = document.getElementById ("solutionsContainer");
const statusSelect = document.getElementById("statusSelect");
const searchInput = document.getElementById("searchInput");
const resultsCount = document.getElementById("resultsCount")
const overviewBtn = document.getElementById("overviewBtn")
// Modal window elements
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalStatus = document.getElementById("modalStatus");
const closeBtn = document.getElementById("close-btn");
const modalDescriptionShort = document.getElementById("modalDescriptionShort");
const modalCategory = document.getElementById("modalCategory");
const modalOwner = document.getElementById("modalOwner");
const modalLink = document.getElementById("modalLink");
let solutionsData = [];
// Fetch solutions data from external JSON file
fetch("data/solutions.json")
.then(response=> response.json())
.then(data=> {solutionsData = data;
    renderSolutions(data);
});
// Reset all filters and return to default view
function resetToOverview(){
    searchInput.value = "";
    statusSelect.value = "all";
    renderSolutions(solutionsData);
    modal.classList.add("hidden");
}
overviewBtn.addEventListener("click", (e)=> {
    e.preventDefault();
    resetToOverview();
});
//Determine CSS class for status indicator colors
function getStatusColorClass(status){
    const s = status.toLowerCase();
    if (s.includes("produktiv")) return "bg-produktiv"; 
    if (s.includes("prototyp")) return "bg-prototyp"; 
    if (s.includes("entwicklung")) return "bg-entwicklung"; 
}
//Function to generate and display solutions cards
function renderSolutions(data){
    if(resultsCount){resultsCount.textContent = data.length;}
    container.innerHTML="";
    if(data.length === 0){
        container.innerHTML = "<p style='padding: 20px;'>Keine Lösungen gefunden.</p>";
        return;
    }
    data.forEach(item => {
        const card =document.createElement("div");
        card.className ="solutions-card";
        card.innerHTML =`
        <h3>${item.name}</h3>
        <p>${item.descriptionShort}</p>
        <p>
        <span class="status-indicator ${getStatusColorClass(item.status)}"></span>
        <strong>Status:</strong>${item.status}
        </p>
        <p><strong>Category:</strong>${item.category}</p>
        <p><strong>Kontakt:</strong>${item.owner}</p>
        <p><a href="${item.link}" target="_blank" class="btn-link">Mehr erfahren</a></p>
        `;
        card.addEventListener("click", () => {openModal(item);});
        container.appendChild(card);
        
    });
} 
// Main filtering logic for search and status
function filterSolutions(){
    const selectedStatus = statusSelect.value.toLowerCase();
    const searchText = searchInput.value.toLowerCase();
    console.log("Selected status:", selectedStatus);
    console.log("filter triggered");
    const filtered = solutionsData.filter(item=>{
    const matchesStatus = selectedStatus === "all" || item.status.toLowerCase() === selectedStatus.toLowerCase();
    const matchesSearch = item.name.toLowerCase().includes(searchText) || item.descriptionShort.toLowerCase().includes(searchText);
 return matchesStatus && matchesSearch;
    });
 renderSolutions(filtered);
}
//Populates and displays the modal with specific solution details
function openModal(solution){
    modalTitle.textContent = solution.name;
    modalDescriptionShort.textContent = solution.descriptionShort;
    modalDescription.textContent = solution.descriptionLong;
    modalCategory.textContent = solution.category;
    modalOwner.textContent = solution.owner;
    modalStatus.textContent = solution.status;
    //Update status indicator color dynamically in the modal
    const indicator = document.getElementById("modalStatusIndicator");
    indicator.className = "status-indicator "+ getStatusColorClass(solution.status);
    modalLink.textContent = solution.link;
    modal.classList.remove("hidden");
}
// Different ways to close modal
closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
});
window.addEventListener("click", (e) => {
    if (e.target === modal){
        modal.classList.add("hidden");
    }
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape"){
        modal.classList.add("hidden");
    }
});
// Trigger filtering when the status dropdown changes
statusSelect.addEventListener("change", filterSolutions);
// Trigger filtering on every keystroke in the search bar
searchInput.addEventListener("input", filterSolutions);




































