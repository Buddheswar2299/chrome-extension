const inputEl = document.getElementById('input-el')
const saveBtn = document.getElementById('save-btn')
const storeValue = document.getElementById('store-value')
const deleteBtn = document.getElementById('delete-btn')
const tabBtn = document.getElementById('tab-btn')
let myLeads = []


let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
console.log(myLeads)
if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render()
}
console.log(myLeads)

tabBtn.addEventListener('click',()=>{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render()
    })
})

saveBtn.addEventListener('click',()=>{

    myLeads.push(inputEl.value)
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    inputEl.value = ''
 
    

    render()
})
function render(){
    let renderme = ``
    for(let i=0; i<myLeads.length; i++){
        renderme += `<li> <a href="${myLeads[i]}" target=_blank> ${myLeads[i]} </a></li>`
    }
    storeValue.innerHTML = renderme
}



deleteBtn.addEventListener('click',()=>{
    localStorage.clear()
    myLeads = []
    render()
})



