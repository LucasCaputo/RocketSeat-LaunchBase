const currentPage = location.pathname

const menuItems = document.querySelectorAll("header .links a")

for(item of menuItems){
    if(currentPage.includes(item.getAttribute("href"))){
        item.classList.add("active")
    }
}

//  Paginação 

function paginate(selectedPage, totalPages) {
    let pages= [],
    oldPage

    for(let currentPage = 1; currentPage <= totalPages; currentPage++){
        
        const firstAndLastPage = currentPage == 1 || currentPage == totalPages

        const pagesAfterSelectedPage = currentPage <= selectedPage + 2

        const pagesBeforeSelectedPage = currentPage >= selectedPage -2


        if(firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage){
            
            if(oldPage && currentPage - oldPage > 2){
                pages.push("...")
            }

            if(oldPage && currentPage - oldPage == 2){
                pages.push(oldPage + 1)
            }
            
            pages.push(currentPage)

            oldPage = currentPage
        }
    }
    return pages

}

const pagination = document.querySelector(".pagination")


function createPagination(pagination){
    const page = +pagination.dataset.page
    const total = +pagination.dataset.total
    const filter = +pagination.dataset.filter
    const pages = paginate(page, total)
    
    let elements = ""
    
    for (let page of pages) {
        if(String(page).includes("...")){
            elements += `<span>${page}</span>`
        }else {
            if(filter) {
                elements += `<a href="?filter=${filter}&page=${page}">${page}</a>`
            }else {
                elements += `<a href="?page=${page}">${page}</a>`
            }
        }
    }
    
    
    pagination.innerHTML = elements
    
}

if(pagination){
    createPagination(pagination)
}