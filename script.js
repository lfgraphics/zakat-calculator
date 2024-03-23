function language() {
    let language = document.getElementById("lang").value;
    let currentUrl = window.location.href;


    if (currentUrl.indexOf("roman-urdu") !== -1 || currentUrl.indexOf("english") !== -1 || currentUrl.indexOf("hindi") !== -1) {
        currentUrl = currentUrl.replace("roman-urdu/", language).replace("english/", language).replace("hindi/", language);
        window.open(currentUrl, '_self')
    } else {
        window.open(`${currentUrl + language}`, '_self')
    }

}


function calculate() {
    let maliyat = 0;
    for (let i = 1; i <= 12; i++) {
        let id = "0" + i;
        maliyat += Number(document.getElementById(id.toString()).value);
    }

    let zimmadar = 0;
    for (let i = 1; i <= 11; i++) {
        zimmadar += Number(document.getElementById(i.toString()).value);
    }

    document.getElementById("result").style.display = "block";

    let zimmedariyan = Number(zimmadar).toFixed(2);
    let kul_maal = Number(maliyat).toFixed(2)
    let final_milkiyat = kul_maal - zimmedariyan

    document.getElementById('zimmedariyan').innerText = zimmedariyan;
    document.getElementById('milkiyat').innerText = kul_maal;

    document.getElementById("total").innerText = final_milkiyat.toFixed(2);

    if ((final_milkiyat - final_milkiyat * 97.5 / 100).toFixed(2) < 0) {
        document.getElementById("zakat").innerText = 0
    } else {
        document.getElementById("zakat").innerText = (final_milkiyat - final_milkiyat * 97.5 / 100).toFixed(2);
    }
    document.getElementById('print').style.display = 'block'
}

// ---------------------- save/ print the info. --------------

function save() {
    // Open a new window
    var printWindow = window.open('', 'Print Window');
    // Set the body content of the window as the div 'toPrint'
    printWindow.document.body.innerHTML = document.getElementById('toPrint').innerHTML;
    // Set the head section of the new window to the head section of the main page
    printWindow.document.head.innerHTML = document.head.innerHTML;
    // Change the href of the link tag with rel="stylesheet"
    let link = printWindow.document.querySelector('link[href="style.css"]');
    link.href = 'https://khadimemillat.github.io/zakat-calculator/style.css';
    // Set the values of the input fields in the new window
    let inputFields = document.getElementsByTagName('input');

    for (let i = 0; i < inputFields.length; i++) {
        let inputField = inputFields[i];
        if (inputField.type === 'text') {
            let inputFieldId = inputField.getAttribute('id');
            let inputFieldValue = inputField.value;
            let printWindowInputField = printWindow.document.getElementById(inputFieldId);
            if (printWindowInputField) {
                printWindowInputField.value = inputFieldValue;
            }
        }
    }
    // Delay for 1 second before printing
    setTimeout(function () {
        printWindow.print()
        // set flag in localStorage when printing is finished
        if (attemptingToPrint) {
            localStorage.setItem('pdfPrintedAttempted', true);
        }
    }, 1000);

    // set flag to indicate that the user is attempting to print
    let attemptingToPrint = true;

    // open print window and print the PDF

    // check if the PDF is printed
    if (window.matchMedia) {
        let mediaQueryList = window.matchMedia('print');
        mediaQueryList.addListener(function (mql) {
            if (!mql.matches) {
                // clear the flag if printing is finished
                attemptingToPrint = false;
                // set flag in localStorage when printing is finished
                localStorage.setItem('pdfPrinted', true);
                // update whatsapp button
                document.getElementById("whatsapp").style.display = "block";
            }
        });
    }

    // check if the user attempted to print the PDF (even if the printing was not successful)
    if (attemptingToPrint) {
        localStorage.setItem('pdfPrintedAttempted', true);
    }


    // check if the PDF was printed or attempted to be printed
    if (localStorage.getItem('pdfPrintedAttempted')) {
        document.getElementById('whatsapp').style.display = "block";
    } else { document.getElementById('whatsapp').style.display = "none"; }

}

// ------------------ jhol khtm ------------


// ----------- jQuery -----------

$(document).ready(function () {

    // check if the PDF was printed or attempted to be printed
    if (localStorage.getItem('pdfPrintedAttempted')) {
        document.getElementById('whatsapp').style.display = "block";
    } else { document.getElementById('whatsapp').style.display = "none"; }

    // ----------- calculator-input --------------
    // Add input event listener to all input fields with class "calculator-input"
    $('.calculator-input').on('change', function calculator() {
        // Get the input value
        let inputVal = $(this).val();
        // Check if the input contains any non-mathematical characters
        if (/[^\d()+\-*/.\s]/.test(inputVal)) {
            // Clear the input field if there are any non-mathematical characters
            $(this).val('');
            return;
        }
        // Evaluate the input as a mathematical expression
        try {
            let result = eval(inputVal);
            // Set the input field value to the result of the calculation
            $(this).val(result);
        } catch (error) {
            // If there is an error in the calculation, clear the input field
            $(this).val('');
        }
        if (document.getElementById("result").style.display == "block") {
            return calculate()
        }
    });

    // -------- gold /cent deduction ------
    // $('.gold').on('change', function () {
    //     let mainGold = Number(document.getElementById("01").value);
    //     this.value = mainGold - mainGold * 20 / 100;
    // })
});
