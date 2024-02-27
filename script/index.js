 /* this parameter's argument comes from handleShowAll() */
async function loadData(searchInp,showAll) {
    /* show spinner */
    document.getElementById('spinner').classList.remove('hidden')
    /* show overlay */
    document.getElementById('overlay').classList.add('opacity-20')
   
    let asset = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchInp}`);
    let phoneObj = await asset.json()
    /* when our search value is empty string or undefined(when we not trigger show all button) or aimless(suppose:'jddsffs') that time sever not response on this request and return value of 'status' is false (that time we can not get any data from server).so we set a default search value is 'a'.As a result, server return some data related of 'a'. */
    if (phoneObj.status == false) {
       asset = await fetch(`https://openapi.programming-hero.com/api/phones?search=a`);
       phoneObj = await asset.json()
    }
    displayData(phoneObj,showAll)
}
   /* loadData also called in whatSearch() function.this whatSearch() trigger all function.so when we not press the search button this page will be blank.to prevent this blankness loadData() function called here and this function called other function synchronously */
   loadData()
   /* this parameter's argument comes from handleShowAll() */
function whatSearch(showAll) {
    let searchInp = document.getElementById('whatSearch').value
    loadData(searchInp,showAll)
}
/* this function is concern with 'Show All' button */
function handleShowAll() {
    let showAll = true
    whatSearch(showAll)
}
/* this function is for display data. */
function displayData(some,showAll) {
    /* select show all button and phoneContainer */
    let showAllBtn = document.getElementById('showAll')
    let phoneContainer = document.getElementById('phoneContainer')
    /* remove previous data */
    phoneContainer.textContent = ''
    /* here data is an array extract from some (phoneObj). */
    let phonesArray = some.data

    if(phonesArray.length > 12 && showAll == undefined){
      phonesArray = phonesArray.slice(0,12)
      showAllBtn.classList.remove('hidden')
  } else{showAllBtn.classList.add('hidden')
  /* this statement work when 'Show All' btn is clicked bcz this generate a true value from handleShowAll() */
    if (showAll == true) {
        phonesArray = phonesArray;
        showAllBtn.classList.add('hidden')
    }
  }
    for (const items of phonesArray) {
        phoneContainer.innerHTML += 
        `<div class="card border border-[#CFCFCF] p-4 md:p-6">
        <figure class="p-5 md:p-10 bg-[rgba(13,110,253,0.05)]">
          <img src="${items.image}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center p-1">
          <h3 class="text-xl md:text-2xl text-[#403F3F] font-bold">${items.phone_name}</h3>
          <p class="text-[#706F6F] md:text-lg">There are many variations of passages of available, but the majority have suffered</p>
          <h3 class="text-xl md:text-2xl text-[#403F3F] font-bold">$999</h3>
          <div class="card-actions">
            <button class="text-lg md:text-xl text-[#FFF] font-semibold bg-[#0D6EFD] px-4 py-2 md:px-6 rounded-lg" onclick="handleShowDetails('${items.slug}'); my_modal_1.showModal()">Show Details</button>
          </div>
        </div>
      </div>
        `
    }
  /* hidden spinner bcz data loading is finished */
  document.getElementById('spinner').classList.add('hidden')
  /* remove overlay  */
  document.getElementById('overlay').classList.remove('opacity-20')
}

async function handleShowDetails(id) {
    let asset = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    let phoneObj = await asset.json()
    disShowDetails(phoneObj)
}

function disShowDetails(some) {
    let data = some.data;
    let dialog = document.getElementById('my_modal_1')
    /* create and push rest of modal element */
    dialog.innerHTML = 
    `<div class="modal-box p-5">
    <div class="bg-[rgba(13,110,253,0.05)] rounded-lg">
        <img class="m-auto" src="${data.image}" alt="">
    </div>
    <h3 class="font-bold text-xl md:text-2xl text-[#403F3F]">${data.name}</h3>
    <p class="pt-4 text-sm md:text-base text-[#706F6F]">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
    <!-- feature container -->
    <div>
        <p><span class="text-[#403F3F] text-sm md:text-base font-semibold">Storage :</span><span class="text-[#706F6F] text-sm md:text-base"> ${data.mainFeatures.storage} </span></p>
        <p><span class="text-[#403F3F] text-sm md:text-base font-semibold">Display Size :</span><span class="text-[#706F6F] text-sm md:text-base"> ${data.mainFeatures.displaySize} </span></p>
        <p><span class="text-[#403F3F] text-sm md:text-base font-semibold">Chipset :</span><span class="text-[#706F6F] text-sm md:text-base"> ${data.mainFeatures.chipSet} </span></p>
        <p><span class="text-[#403F3F] text-sm md:text-base font-semibold">Memory :</span><span class="text-[#706F6F] text-sm md:text-base"> ${data.mainFeatures.memory} </span></p>
        <p><span class="text-[#403F3F] text-sm md:text-base font-semibold">Release Date :</span><span class="text-[#706F6F] text-sm md:text-base"> ${data.releaseDate} </span></p>
        <p><span class="text-[#403F3F] text-sm md:text-base font-semibold">Brand :</span><span class="text-[#706F6F] text-sm md:text-base"> ${data.brand} </span></p>
        <p><span class="text-[#403F3F] text-sm md:text-base font-semibold">GPS :</span><span class="text-[#706F6F] text-sm md:text-base"> Yes </span></p>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn bg-[#DC3545] text-white">Close</button>
      </form>
    </div>
  </div>`
}

/* banner image showing control */
if (window.innerWidth < 500) {
    document.getElementById('bannerImg1').classList.add('hidden')
    document.getElementById('bannerImg3').classList.add('hidden')
}

