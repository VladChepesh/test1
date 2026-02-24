console.log ("JS loaded")
const container = document.getElementById ("solutionsContainer");
const statusSelect = document.getElementById("statusSelect");
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
    console.log("filter triggered")
    const selectedStatus= statusSelect.value;
    const filtered = solutionsData.filter(item=>
    selectedStatus === "all" || item.status ===selectedStatus
    );
    renderSolutions(filtered);
}
statusSelect.addEventListener("change", filterSolutions)




