function language() {
    let language = document.getElementById("lang").value;

    if (language == "u") {
        window.open('/zakat-calculator', '_self');
    } else if (language == "e") {
        window.open('/zakat-calculator/e.htm', '_self')
    } else if (language == "ru") {
        window.open('/zakat-calculator/r-urdu.htm', '_self')
    } else {
        window.open('/zakat-calculator/hi.htm', '_self');
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
    let printWindow = window.open('', 'Print Window');
    // Set the body content of the window as the div 'toPrint'
    printWindow.document.body.innerHTML = document.getElementById('toPrint').innerHTML;
    // Set the head section of the new window to the head section of the main page
    printWindow.document.head.innerHTML = document.head.innerHTML;
    // Change the href of the link tag with rel="stylesheet"
    let link = printWindow.document.querySelector('link[href="style.css"]');
    link.href = 'https://lfgraphics.github.io/zakat-calculator/style.css';
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
        // Print the window
        printWindow.print();
    }, 1000);
}



/*
// --------- save as png ---------
function saveDivAsPNG(divId, imageName) {
    // Select the div that you want to capture
    const element = document.querySelector('#toPrint');

    // Use html2canvas to capture the contents of the div
    html2canvas(element).then(canvas => {
        // Convert the canvas content to a data URL
        const dataUrl = canvas.toDataURL('image/png');

        // Save the data URL to local storage
        localStorage.setItem('screenshot', dataUrl);

        // Create a link element that downloads the screenshot
        const link = document.createElement('a');
        link.download = 'screenshot.png';
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
    });
}

function saveDivAsPNG(divId, imageName) {
    html2canvas(document.getElementById(divId)).then(function (canvas) {
        let imgData = canvas.toDataURL('image/png');
        try {
            localStorage.setItem(imageName, imgData);
            console.log('Image saved to localStorage.');
        } catch (e) {
            console.error('Error saving image to localStorage: ' + e);
        }
        let downloadLink = document.createElement('a');
        downloadLink.setAttribute('download', imageName + '.png');
        downloadLink.setAttribute('href', imgData);
        downloadLink.click();
    });
}

/*
function save() {
    saveDivAsPNG("toPrint", "my_image");

    // check if image is saved in localStorage
    if (localStorage.getItem("my_image")) {
        $("#share").removeClass("hidden");
    } else {
        $("#share").addClass("hidden");
    }
}

function share() {
    function updateShareButton() {
        const shareButton = document.getElementById('share');
        const shareImage = document.getElementById('share-image');

        // Check if the image is saved in local storage
        if (localStorage.getItem('my_image')) {
            // Set the image source to the URL of the saved image
            shareImage.src = localStorage.getItem('my_image');
            // Show the share button
            shareButton.style.display = 'inline-block';
        } else {
            // Hide the share button
            shareButton.style.display = 'none';
        }
    }

    // Call the updateShareButton function when the page loads
    updateShareButton();

}

// ----------- share iaage from local storage -------------

function shareImage() {
    // Get the image from local storage
    const myImage = localStorage.getItem('my_image');

    // Create a new blob from the image data
    const imageBlob = new Blob([myImage], { type: 'image/jpeg' });

    // Create a new file object from the blob
    const imageFile = new File([imageBlob], 'my_image.jpeg', { type: 'image/jpeg' });

    // Create a new share API instance
    const shareAPI = navigator.share;

    // Check if the share API is supported
    if (shareAPI && shareAPI.share) {
        // Call the share API with the image file
        shareAPI.share({
            files: [imageFile],
        })
            .then(() => console.log('Image shared successfully'))
            .catch((error) => console.error('Failed to share image', error));
    } else {
        console.warn('Share API not supported');
    }
}
*/

// ----------- jQuery -----------

$(document).ready(function () {
    /*
    // check if image is saved in localStorage
    if (localStorage.getItem("my_image")) {
        document.getElementById('share').style.display = 'block';
    } else {
        document.getElementById('share').style.display = 'none';
    }
    */
    // ------------ check if the pdf is saved -----------------
    let shareButton = document.getElementById('share');
    if (localStorage.getItem('printedPDF') !== null) {
        shareButton.style.display = 'block';
    } else {
        shareButton.style.display = 'none';
    }

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