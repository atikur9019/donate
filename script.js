/* Select all HTML elements */
const mainHeader = document.querySelector(".main-header");
const main = document.querySelector(".main");
const carneyValuesAll = document.querySelectorAll(".carney-value");
const carneySubmitBtn = document.querySelectorAll(".carney-submit-btn");

let donate = 0;

function adjustLayout() {
    if (!mainHeader || !main) return;

    // Set padding-top of main based on mainHeader height
    const headerHeight = mainHeader.offsetHeight;
    main.style.paddingTop = `${headerHeight + 50}px`;

    carneyValuesAll.forEach(el => {
        let carneyText = parseFloat(el.textContent) || 0;
        const carneyContent = el.closest(".carney-content");
        let carneyTextLength = carneyText.toString().length;

        if (carneyTextLength === 1) {
            carneyContent.style.maxWidth = "95px";
        } else if (carneyTextLength === 2) {
            carneyContent.style.maxWidth = "105px";
        } else if (carneyTextLength === 3) {
            carneyContent.style.maxWidth = "120px";
        } else if (carneyTextLength < 7 && carneyTextLength >= 4) {
            const fastValue = (carneyText / 1000).toFixed(1);
            el.textContent = fastValue % 1 === 0 ? `${fastValue.replace(".0", "")}K` : `${fastValue}K`;

            let numKilo = el.textContent.length;
            if (numKilo === 2) {
                carneyContent.style.maxWidth = "110px";
            } else if (numKilo === 3) {
                carneyContent.style.maxWidth = "120px";
            } else {
                carneyContent.style.maxWidth = "125px";
            }
        } else if (carneyTextLength >= 7) {
            const fastValue = (carneyText / 1000000).toFixed(1);
            el.textContent = fastValue % 1 === 0 ? `${fastValue.replace(".0", "")}M` : `${fastValue}M`;
            carneyContent.style.maxWidth = "130px";
        }
    });
}

adjustLayout();

carneySubmitBtn.forEach(button => {
    button.addEventListener("click", (e) => {
        let textBtnContent = button.closest(".text_btn-content");

        let carneySubmitInput = textBtnContent.querySelector(".carney-submit-input");
        let carneySubmitInputValue = parseFloat(carneySubmitInput.value);
        console.log(carneySubmitInputValue);
        
        let balance = document.querySelector(".balance");
        let currentBalance = document.querySelector(".balance").textContent;
        console.log(currentBalance);

        if(!carneySubmitInputValue) return;

        if (currentBalance < carneySubmitInputValue) {
            console.log("Don't Ok");
            return;
        }

        const newBalance = currentBalance - carneySubmitInputValue;
        balance.textContent = newBalance.toString();

        let carneyValueBtn = textBtnContent.querySelector(".carney-value");

        let carneyBtnLengthInLastNotChid = (carneyValueBtn.textContent.length) - 1;
        let carneyBtnWithOutLastChild = parseFloat(carneyValueBtn.textContent.slice(0, carneyBtnLengthInLastNotChid));
        let carneyBtnLastChild = carneyValueBtn.textContent.slice(carneyBtnLengthInLastNotChid);
        
        if (carneyBtnLastChild == "M") {
            let AverageCarneyValue = (carneyBtnWithOutLastChild * 1000000) + carneySubmitInputValue;
            carneyValueBtn.textContent = AverageCarneyValue;
            console.log(AverageCarneyValue);
        } else if (carneyBtnLastChild == "K") {
            let AverageCarneyValue = (carneyBtnWithOutLastChild * 1000) + carneySubmitInputValue;
            carneyValueBtn.textContent = AverageCarneyValue;
            console.log(AverageCarneyValue);
        } else {
            let AverageCarneyValue = carneyBtnWithOutLastChild + carneySubmitInputValue;
            carneyValueBtn.textContent = AverageCarneyValue;
            console.log(AverageCarneyValue);
        }


        console.log(carneyValueBtn.textContent);

        
        
        console.log(`Donation Amount: ${carneyValueBtn.textContent}`);
        
        adjustLayout();

        carneySubmitInput.value = ""; // Properly reset input field
    });
});
