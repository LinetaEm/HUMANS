// 1. Sukurti formą, kurioje galima įrašyti asmens vardą.
// 2. Formos submit metu, pagal įrašytą vardą, ekrane atvaizduoti tikėtiną asmens lyti, amžių ir tautybę. Naudoti šiuos API:
// Amžiui - https://agify.io/
// Tautybei - https://nationalize.io/
// Lyčiai - https://genderize.io/

document.getElementById("nameForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;

    Promise.all([
        fetch(`https://api.genderize.io/?name=${name}`),
        fetch(`https://api.agify.io/?name=${name}`),
        fetch(`https://api.nationalize.io/?name=${name}`)
    ])
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(data => {
            const genderData = data[0];
            const ageData = data[1];
            const nationalityData = data[2];

            const resultContainer = document.createElement("div");
            
            let nameParagraph = document.createElement("p");
            nameParagraph.textContent = `Name: ${name}`;
            resultContainer.appendChild(nameParagraph);
            
            let genderParagraph = document.createElement("p");
            genderParagraph.textContent = `Gender: ${genderData.gender} (Probability: ${genderData.probability})`;
            resultContainer.appendChild(genderParagraph);
            
            let ageParagraph = document.createElement("p");
            ageParagraph.textContent = `Age: ${ageData.age} (Count: ${ageData.count})`;
            resultContainer.appendChild(ageParagraph);
            
            let nationalityParagraph = document.createElement("p");
            nationalityParagraph.textContent = `Nationality: ${nationalityData.country[0].country_id} (Probability: ${nationalityData.country[0].probability})`;
            resultContainer.appendChild(nationalityParagraph);

            let oldResultContainer = document.getElementById("result");
            oldResultContainer.innerHTML = '';
            oldResultContainer.appendChild(resultContainer);
        });
});
