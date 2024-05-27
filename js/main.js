var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var siteModal = document.getElementById("exampleModal");
var btnMain = document.getElementById("btnMain");
var siteInfo = [];
if (localStorage.getItem("siteData") !== null) {
    siteInfo = JSON.parse(localStorage.getItem("siteData"));
    displayData();
}
function addSite() {
    if (validationSite(siteNameInput) && validationSite(siteUrlInput)) {
        var site = {
            siteName: siteNameInput.value,
            siteUrl: siteUrlInput.value,
        };
        modal();
        siteInfo.push(site);
        localStorage.setItem("siteData", JSON.stringify(siteInfo));
        displayData();
        clear();
    }
    modal();
}
function modal() {
    if (validationSite(siteNameInput) && validationSite(siteUrlInput)) {
        siteModal.classList.add('d-none');
        let backGround = document.querySelector(".modal-backdrop");
        backGround.classList.remove("show");
        location.reload()
    } else {
        siteModal.classList.replace('d-none', 'show')
    }
}
function displayData() {
    var blank = "";
    for (i = 0; i < siteInfo.length; i++) {
        blank += `<tr>
        <td>${i + 1}</td>
        <td>${siteInfo[i].siteName}</td>
        <td><a href="http://www.${siteInfo[i].siteUrl}" target="_blank"><button class="btn btn-outline-secondary"><i class="fa fa-eye me-md-2"></i>Visit</button></a></td>
        <td><button onclick="deleteSite(${i})" class="btn btn-outline-secondary"><i class="fa-solid fa-trash-can me-md-2"></i>Delete</button></td>
    </tr>`
    }
    document.getElementById("tableData").innerHTML = blank;
}
function clear() {
    siteNameInput.value = null,
        siteUrlInput.value = null
}
function deleteSite(index) {
    siteInfo.splice(index, 1)
    localStorage.setItem("siteData", JSON.stringify(siteInfo));
    displayData()

}
function validationSite(element) {
    var text = element.value;
    var regex = {
        siteName: /^([a-z]|[0-9]){3,}$/i,
        siteUrl: /^([a-z]|[0-9]){3,}(\.com)$/i,
    }
    if (regex[element.id].test(text) == true) {
        element.classList.add('is-valid')
        element.classList.remove('is-invalid')
        return true;
    } else {
        element.classList.add('is-invalid')
        element.classList.remove('is-valid')
    }
}