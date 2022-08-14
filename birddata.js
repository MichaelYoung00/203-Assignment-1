//import fetch from "node-fetch";

async function loadBirds() {
    const response = await fetch("./data/nzbird.json");
    const birdData = await response.json();
  
    const container = document.querySelector('.main');
    for (let index = 0; index < birdData.length; index++) {
        let bird = birdData[index];
        console.log(bird);

        const t = document.getElementById("template");
        const birdBox = t.content.cloneNode(true);
        if(bird.status === "Nationally Endangered") {
            birdBox.querySelector(".status").style.color = "#660032";
            birdBox.querySelector(".status_heading").style.color = "#660032";
        } else if (bird.status === "Not Threatened") {
            birdBox.querySelector(".status").style.color = "#02a028";
            birdBox.querySelector(".status_heading").style.color = "#02a028";
        } else if (bird.status === "Naturally Uncommon") {
            birdBox.querySelector(".status").style.color = "#649a31";
            birdBox.querySelector(".status_heading").style.color = "#649a31";
        } else if (bird.status === "Relict") {
            birdBox.querySelector(".status").style.color = "#99cb68";
            birdBox.querySelector(".status_heading").style.color = "#99cb68";
        } else if (bird.status === "Recovering") {
            birdBox.querySelector(".status").style.color = "#fecc33";
            birdBox.querySelector(".status_heading").style.color = "#fecc33";
        } else if (bird.status === "Declining") {
            birdBox.querySelector(".status").style.color = "#fe9a01";
            birdBox.querySelector(".status_heading").style.color = "#fe9a01";
        } else if (bird.status === "Nationally Increasing") {
            birdBox.querySelector(".status").style.color = "#c26967";
            birdBox.querySelector(".status_heading").style.color = "#c26967";
        } else if (bird.status === "Nationally Vulnerable") {
            birdBox.querySelector(".status").style.color = "#9b0000";
            birdBox.querySelector(".status_heading").style.color = "#9b0000";
        } else if (bird.status === "Nationally Endangered") {
            birdBox.querySelector(".status").style.color = "#660032";
            birdBox.querySelector(".status_heading").style.color = "#660032";
        } else if (bird.status === "Nationally Critical") {
            birdBox.querySelector(".status").style.color = "#320033";
            birdBox.querySelector(".status_heading").style.color = "#320033";
        } else if (bird.status === "Extinct") {
            birdBox.querySelector(".status").style.color = "black";
            birdBox.querySelector(".status_heading").style.color = "black";
        } else if (bird.status === "Data Deficient") {
            birdBox.querySelector(".status").style.color = "black";
            birdBox.querySelector(".status_heading").style.color = "black";
        }
        birdBox.querySelector(".primary_name").textContent = bird.primary_name;
        birdBox.querySelector(".credit").textContent = "Photo by " + bird.photo.credit;
        birdBox.querySelector(".src").src = bird.photo.source;
        birdBox.querySelector(".english_name").textContent = bird.english_name;
        birdBox.querySelector(".sci_name").textContent = bird.scientific_name;
        birdBox.querySelector(".family").textContent = bird.family;
        birdBox.querySelector(".order").textContent = bird.order;
        birdBox.querySelector(".status").textContent = bird.status;
        birdBox.querySelector(".length").textContent = (bird.size.length.value + bird.size.length.units);
        birdBox.querySelector(".weight").textContent = (bird.size.weight.value + bird.size.weight.units);
        container.appendChild(birdBox);
    }
}

loadBirds();
let btn = document.getElementById("search_button");
btn.addEventListener('click', event => {
updateBirds();
});

async function updateBirds() {
    var searchVal = document.getElementById("search_box").value;
    searchVal.toLowerCase();
    console.log("SearchVal: " + searchVal);
    var filterVal = document.getElementById("conservation-status").value;   
    var sortVal = document.getElementById("sort-style").value;

    const response = await fetch("./data/nzbird.json");
    const birdData = await response.json();
    let organisedData = new Array();
    let filteredData = new Array();
    let arrayIndex = 0;
    if(searchVal != "") {
        for(let i = 0; i < birdData.length; i++) {
            let birdInfo = "";
            let original = birdData[i].primary_name;
            let stripped = original.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            birdInfo += stripped;
            birdInfo += " " + birdData[i].english_name;
            birdInfo += " " + birdData[i].scientific_name;
            birdInfo = birdInfo.toLowerCase();
            if(birdInfo.includes(searchVal)) {
                organisedData[arrayIndex] = birdData[i];
                arrayIndex++;
            }
        }
    } else {
       organisedData = birdData;
    }

    if(filterVal != "No Filter") {
        arrayIndex = 0;
        for(let i = 0; i < organisedData.length; i++) {
            if(organisedData[i].status == filterVal) {
                filteredData[arrayIndex] = organisedData[i];
                arrayIndex++;
            }
        }
    } else {
        filteredData = organisedData;
    }

    if(sortVal != "Unsorted") {
        if(sortVal == "weight") {
            filteredData.sort(sortWeight);
        } else {
            filteredData.sort(sortLength);
        }
    }


    document.getElementById("main").innerHTML = '';
    
    const container = document.querySelector('.main');
    for (let index = 0; index < filteredData.length; index++) {
        let bird = filteredData[index];
        const t = document.getElementById("template");
        const birdBox = t.content.cloneNode(true);
        if(bird.status === "Nationally Endangered") {
            birdBox.querySelector(".status").style.color = "#660032";
            birdBox.querySelector(".status_heading").style.color = "#660032";
        } else if (bird.status === "Not Threatened") {
            birdBox.querySelector(".status").style.color = "#02a028";
            birdBox.querySelector(".status_heading").style.color = "#02a028";
        } else if (bird.status === "Naturally Uncommon") {
            birdBox.querySelector(".status").style.color = "#649a31";
            birdBox.querySelector(".status_heading").style.color = "#649a31";
        } else if (bird.status === "Relict") {
            birdBox.querySelector(".status").style.color = "#99cb68";
            birdBox.querySelector(".status_heading").style.color = "#99cb68";
        } else if (bird.status === "Recovering") {
            birdBox.querySelector(".status").style.color = "#fecc33";
            birdBox.querySelector(".status_heading").style.color = "#fecc33";
        } else if (bird.status === "Declining") {
            birdBox.querySelector(".status").style.color = "#fe9a01";
            birdBox.querySelector(".status_heading").style.color = "#fe9a01";
        } else if (bird.status === "Nationally Increasing") {
            birdBox.querySelector(".status").style.color = "#c26967";
            birdBox.querySelector(".status_heading").style.color = "#c26967";
        } else if (bird.status === "Nationally Vulnerable") {
            birdBox.querySelector(".status").style.color = "#9b0000";
            birdBox.querySelector(".status_heading").style.color = "#9b0000";
        } else if (bird.status === "Nationally Endangered") {
            birdBox.querySelector(".status").style.color = "#660032";
            birdBox.querySelector(".status_heading").style.color = "#660032";
        } else if (bird.status === "Nationally Critical") {
            birdBox.querySelector(".status").style.color = "#320033";
            birdBox.querySelector(".status_heading").style.color = "#320033";
        } else if (bird.status === "Extinct") {
            birdBox.querySelector(".status").style.color = "black";
            birdBox.querySelector(".status_heading").style.color = "black";
        } else if (bird.status === "Data Deficient") {
            birdBox.querySelector(".status").style.color = "black";
            birdBox.querySelector(".status_heading").style.color = "black";
        }
        birdBox.querySelector(".primary_name").textContent = bird.primary_name;
        birdBox.querySelector(".credit").textContent = "Photo by " + bird.photo.credit;
        birdBox.querySelector(".src").src = bird.photo.source;
        birdBox.querySelector(".english_name").textContent = bird.english_name;
        birdBox.querySelector(".sci_name").textContent = bird.scientific_name;
        birdBox.querySelector(".family").textContent = bird.family;
        birdBox.querySelector(".order").textContent = bird.order;
        birdBox.querySelector(".status").textContent = bird.status;
        birdBox.querySelector(".length").textContent = (bird.size.length.value + bird.size.length.units);
        birdBox.querySelector(".weight").textContent = (bird.size.weight.value + bird.size.weight.units);
        container.appendChild(birdBox);
    }
    console.log("test line 159");
}

function sortWeight(a, b) {
    if(a.size.weight.value > b.size.weight.value) {
        return 1;
    } else if (a.size.weight.value == b.size.weight.value) {
        return 0;
    } else {
        return -1;
    }
}

function sortLength(a, b) {
    if(a.size.length.value > b.size.length.value) {
        return 1;
    } else if (a.size.length.value == b.size.length.value) {
        return 0;
    } else {
        return -1;
    }
}


