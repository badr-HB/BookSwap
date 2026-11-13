async function fetchbooks() {
    const reponse = await fetch('http://127.0.0.1:8000/api/v1/books');
    if (!reponse.ok) {
        throw new Error(`Erreur HTTP ${reponse.status}`);
    }
    const resultat = await reponse.json();
    dispaybooks(resultat)
}
function dispaybooks(data) {
    const box = data.data;
    const books_container = document.getElementById('displayBooks');
    const DataArray = box.map((element) => element)

    const affichage_tags = (arg) => {
        const lengths = arg.length;
        let arr = [];
        for (let i = 0; i < lengths; i++) {
            arr.push(`<p class="px-3 py-1 rounded-[10px] bg-slate-400 text-white">${arg[i]}</p>`)
        }
        return arr.join('');

    }

    DataArray.map((element) => {
        books_container.innerHTML += `<div class="h-120 rounded-2xl overflow-hidden relative bg-[url(http://127.0.0.1:8000${element.image_url})] bg-center bg-cover container">
                 <div class="w-full h-30"></div>
                 <div class="w-full h-full bg-white px-3 space-y-3 duration-200 box">
                     <p class="text-2xl font-normal ">${element.title}</p>
                     <p class="font-normal text-[16px]">${element.description}</p>
                     <p class="font-normal">author: <span class="font-semibold">${element.author}</span></p>
                     <div class="flex space-x-3 items-center">
                         <img src="http://127.0.0.1:8000${element.owner.avatar}" class="w-15 h-15 rounded-[50%]" />
                         <div>
                             <p class="font-normal">owned by:</p>
                             <p class="font-semibold">${element.owner.name}</p>
                         </div>
                     </div>
                     <div class="flex justify-evenly">
                         ${affichage_tags(element.tags)}
                     </div>
                 </div>
             </div>`

    })

}

fetchbooks();