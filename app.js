console.log ("JS loaded")
const container = document.getElementById ("solutionsContainer");
const statusSelect = document.getElementById("statusSelect");
const searchInput = document.getElementById("searchInput");
const resultsCount = document.getElementById("resultCount")

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
fetch("data/solutions.json")
.then(response=> response.json())
.then(data=> {solutionsData = data;
    renderSolutions(data);
});
function renderSolutions(data){
    resultsCount.textContent = data.length;
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
        <p><strong>Status:</strong>${item.status}</p>
        <p><strong>Category:</strong>${item.category}</p>
        <p><strong>Kontakt:</strong>${item.owner}</p>
        <p><a href="${item.link}" target="_blank">Mehr erfahren</a></p>
        `;
        card.addEventListener("click", () => {openModal(item);});
        container.appendChild(card);
        
    });
} 
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
function openModal(solution){
    modalTitle.textContent = solution.name;
    modalDescriptionShort.textContent = solution.descriptionShort;
    modalDescription.textContent = solution.descriptionLong;
    modalCategory.textContent = solution.category;
    modalOwner.textContent = solution.owner;
    modalStatus.textContent = solution.status;
    modalLink.textContent = solution.link;
    modal.classList.remove("hidden");
}
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
statusSelect.addEventListener("change", filterSolutions);
searchInput.addEventListener("input", filterSolutions);

























