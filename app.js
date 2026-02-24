console.log ("JS loaded")
const container = document.getElementById ("solutionsContainer");
const statusSelect = document.getElementById("statusSelect");
const searchInput = document.getElementById("searchInput")
let solutionsData = [];
fetch("data/solutions.json")
.then(response=> response.json())
.then(data=> {solutionsData = data;
    renderSolutions(data);
});
function renderSolutions(data){
    container.innerHTML="";
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
        
        container.appendChild(card);
        
    });
} 
function filterSolutions(){
    const selectedStatus = statusSelect.value.toLowerCase();
    const searchText = searchInput.value.toLowerCase();
    console.log("Selected status:", selectedStatus);
    console.log("filter triggered");
    const filtered = solutionsData.filter(item=>
    const matchesStatus = selectedStatus === "all" || item.status.toLowerCase() === selectedStatus.toLowerCase();
    const matchesSearch = item.name.toLowerCase().includes(searchText) || item.descriptionShort.toLowerCase().includes(searchText);
 }); 
 renderSolutions(filtered);
}
searchInput.addEventListener("input", filterSolutions);
statusSelect.addEventListener("change", filterSolutions);










