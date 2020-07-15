import productdb, {
    createbulk, getid, createele
} from './module.js';

let db = productdb("productdb", {
    products: `++id,name,seller,price`
});

// input tags
const userid = document.querySelector("#userid");
const productname = document.querySelector("#proname");
const seller = document.querySelector("#seller");
const price = document.querySelector("#price");
const btncreate = document.querySelector("#button-create");
const btnread = document.querySelector("#button-read");
const btnupdate = document.querySelector("#button-update");
const btndelete = document.querySelector("#button-delete");

btncreate.onclick = (event) => {
    let flag = createbulk(db.products, {
        name: productname.value,
        seller: seller.value,
        price: price.value
    });
    // console.log(flag);
    productname.value = seller.value = price.value = "";
    // this.idcount();
    getid(db.products, (data => {
        userid.value = data.id + 1 || 1;
    })
    )
};

btnread.onclick = table;


btnupdate.onclick = () => {
    let id = parseInt(userid.value || 0);
    console.log(id);
    if (id) {
        db.products.update(id, {
            name: productname.value,
            seller: seller.value,
            price: price.value
        }).then(updated => {
            let check = updated ? "data has been updated" : "couldn't update";
            console.log(check);
        });
    }
}
btndelete.onclick = () => {
    db.delete();
    db = productdb("productdb", {
        products: `++id,name,seller,price`
    });
    db.open();
    table();
}
function table() {
    const tbody = document.querySelector("#tbody");
    while (tbody.hasChildNodes()) {
        tbody.removeChild(tbody.firstChild);
    }
    // createele("td",tbody,(td) => {
    //     // console.log(td);
    //     // console.log(tbody);
    // })
    getid(db.products, (data) => {
        if (data) {
            // createele("tr", tbody, tr => {

            //         for (const value in data) {
            //             createele("td", tr, td => {
            //                 td.textContent = data[value];
            //             })
            //             }
            createele("tr", tbody, tr => {
                for (const value in data) {
                    createele("td", tr, td => {
                        td.textContent = data.price === data[value] ? `$ ${data[value]}` : data[value];
                    }
                    )
                }
                createele("td", tr, td => {
                    createele("i", td, i => {
                        i.className += "fas fa-edit btnedit";
                        i.setAttribute(`data-id`, data.id);
                        i.onclick = editdata;
                    });
                })
                createele("td", tr, td => {
                    createele("i", td, i => {
                        i.className += "fas fa-trash-alt btndelete";
                        i.setAttribute(`data-id`, data.id);
                        i.onclick = editdelete;
                    });
                })
            })
        }
    })
};
function editdata(event) {
    console.log(event.target.dataset.id);
    let id = parseInt(event.target.dataset.id);
    console.log(typeof id);
    db.products.get(id, data => {
        userid.value = data.id || 0;
        productname.value = data.name || "";
        seller.value = data.seller || "";
        price.value = data.price || "";
    })
}
function editdelete(event) {
    let id = parseInt(event.target.dataset.id);
    db.products.delete(id);
    table();
}

//  const idcount = () =>{
//     db.products.id.count();
// }
// console.log(id);