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
    let maliyat = [
        Number(document.getElementById("01").value) +
        Number(document.getElementById("02").value) +
        Number(document.getElementById("03").value) +
        Number(document.getElementById("04").value) +
        Number(document.getElementById("05").value) +
        Number(document.getElementById("06").value) +
        Number(document.getElementById("07").value) +
        Number(document.getElementById("08").value) +
        Number(document.getElementById("09").value) +
        Number(document.getElementById("010").value) +
        Number(document.getElementById("011").value) +
        Number(document.getElementById("012").value)
    ];

    let zimmadar = [
        Number(document.getElementById("1").value) +
        Number(document.getElementById("2").value) +
        Number(document.getElementById("3").value) +
        Number(document.getElementById("4").value) +
        Number(document.getElementById("5").value) +
        Number(document.getElementById("6").value) +
        Number(document.getElementById("7").value) +
        Number(document.getElementById("8").value) +
        Number(document.getElementById("9").value) +
        Number(document.getElementById("10").value) +
        Number(document.getElementById("11").value)
    ];

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
/*
function save() {
    if (document.getElementById('name').value !== '') {
        // Clone the toPrint div using outerHTML
        var printContents = document.getElementById('toPrint').cloneNode(true);

        // Add a CSS rule to hide the input fields during printing
        var css = '@media print { input { display: none; } }';
        var head = document.head || document.getElementsByTagName('head')[0];
        var style = document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode(css));
        head.appendChild(style);

        // Print the cloned div
        var originalContents = document.body.innerHTML;
        document.body.innerHTML = "";
        document.body.appendChild(printContents);
        window.print();
        document.body.innerHTML = originalContents;

        // Remove the CSS rule
        head.removeChild(style);

        // Save the printed PDF in localStorage
        var pdfData = btoa(unescape(encodeURIComponent(originalContents)));
        localStorage.setItem('printedPDF', pdfData);

        // Show or hide the share button depending on whether the PDF is available in localStorage
        var shareButton = document.getElementById('share');
        if (localStorage.getItem('printedPDF') !== null) {
            shareButton.style.display = 'block';
        } else {
            shareButton.style.display = 'none';
        }
    } else alert('Please enter your name before saving\n we do not read any data');
    let element = document.getElementById("lName");
    element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    document.getElementById('name').focus
}
*/
// --------- save as png ---------

function saveDivAsPNG(divId, imageName) {
    html2canvas(document.getElementById(divId)).then(function (canvas) {
        var imgData = canvas.toDataURL('image/png');
        try {
            localStorage.setItem(imageName, imgData);
            console.log('Image saved to localStorage.');
        } catch (e) {
            console.error('Error saving image to localStorage: ' + e);
        }
        var downloadLink = document.createElement('a');
        downloadLink.setAttribute('download', imageName + '.png');
        downloadLink.setAttribute('href', imgData);
        downloadLink.click();
    });
}



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


// ----------- jQuery -----------

$(document).ready(function () {
    // check if image is saved in localStorage
    if (localStorage.getItem("my_image")) {
        document.getElementById('share').style.display = 'block';
    } else {
        document.getElementById('share').style.display = 'none';
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
    // $('.gold').on('change', function () {
    //     let mainGold = Number(document.getElementById("01").value);
    //     this.value = mainGold - mainGold * 20 / 100;
    // })
});