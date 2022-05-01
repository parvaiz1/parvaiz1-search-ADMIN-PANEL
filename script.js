
var url = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';

var tablebody = document.getElementById("table-body")
var infoWrapper = document.getElementById("info-wrapper")
var inputElement = document.getElementById("search-box")
var userData = []

function userRowClicked(id){
   var previousActiveUser =  document.getElementsByClassName("active")[0];
   previousActiveUser.classList.remove("active")
    var activeHighlightedUser = document.getElementById("tr"+id)
    activeHighlightedUser.classList.add("active")
   var activeHighlightedUserDetails = userData.find( (user,i) => {
        if(user.id == id){
            return true
        }
    } )

    var infoWrapperElement =  document.getElementById("info-wrapper")

    infoWrapperElement.innerHTML = `
    <h1>Details</h1>
    <p>Click on a table item to get detailed information</p>
    <div id = "content${activeHighlightedUserDetails.id}" class="info-content">
        <div><b>User selected:</b> ${activeHighlightedUserDetails.firstName} ${activeHighlightedUserDetails.lastName}</div>
        <div>
            <b>Description: </b>
            <textarea cols="50" rows="5" readonly>
               ${activeHighlightedUserDetails.description}
            </textarea>
        </div>
        <div><b>Address:</b> ${activeHighlightedUserDetails.address.streetAddress} </div>
        <div><b>City:</b> ${activeHighlightedUserDetails.address.city }</div>
        <div><b>State:</b> ${activeHighlightedUserDetails.address.state}</div>
        <div><b>Zip:</b> ${activeHighlightedUserDetails.address.zip} </div>
    </div>
    `

    }

$.get(url, function (response) {
    userData = response
    response.map((user, i) => {
        tablebody.innerHTML += `
        <tr id = "tr${user.id}" 
        onclick = "userRowClicked('${user.id}')"
        class="data-row ${i == 2 ? `active` : ""}">
<td class="column1"> ${user.id} </td>
<td class="column2"> ${user.firstName} </td>
<td class="column3"> ${user.lastName} </td>
<td class="column4"> ${user.email} </td>
<td class="column5"> ${user.phone} </td>
</tr>
        `
        if(i == 2){
            infoWrapper.innerHTML = `
            <h1>Details</h1>
<p>Click on a table item to get detailed information</p>
<div id = "${user.id}" class="info-content">
    <div><b>User selected:</b> ${user.firstName} ${user.lastName}</div>
    <div>
        <b>Description: </b>
        <textarea cols="50" rows="5" readonly>
           ${user.description}
        </textarea>
    </div>
    <div><b>Address:</b> ${user.address.streetAddress} </div>
    <div><b>City:</b> ${user.address.city }</div>
    <div><b>State:</b> ${user.address.state}</div>
    <div><b>Zip:</b> ${user.address.zip} </div>
</div>
            `
        }
    


    })

   

})


function inputChanged(){
  var userFirstName = inputElement.value
  var filteredUsers = userData.filter( (user,i) => {
    if(user.firstName.toLowerCase().includes(userFirstName.toLowerCase()) ||
    user.email.toLowerCase().includes(userFirstName.toLowerCase())){
        return true
    }
  })

  tablebody.innerHTML = ``

  let infoContentDiv = document.getElementsByClassName("info-content")[0]

  console.log(infoContentDiv.id)

  filteredUsers.map( (user,i) => {
     
    tablebody.innerHTML += `
    <tr id = "tr${user.id}" 
    onclick = "userRowClicked('${user.id}')"
    class="data-row ${user.id == infoContentDiv.id ? `active` : "" } ">
<td class="column1"> ${user.id} </td>
<td class="column2"> ${user.firstName} </td>
<td class="column3"> ${user.lastName} </td>
<td class="column4"> ${user.email} </td>
<td class="column5"> ${user.phone} </td>
</tr>
    `
      
  } )

}
