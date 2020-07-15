const productdb = (dbname, table) => {

    const db = new Dexie(dbname);

    db.version(1).stores(table);

    // ({
    //     friends : `name,age`
    // })

    db.open();

    return db;
}

// const createbulk = (dbname, data) => {
//     dbname.store([data]);
// }
// const empty = (object) => {
//     let flag = "false";
//     for( const value in object){
//         if(object[value]!== "" && object.hasOwnProperty(value)){
//             flag=true;
//         }else{
//             flag = false;
//         }
//     }
//     return flag;
// }

const createbulk = (dbtable, data) => {
    let flag = empty(data);
    if (flag) {
        dbtable.bulkAdd([data]);
        console.log("data sucessfully added");
    } else {
        console.log("please add the data")
    }
    return flag;
}


const empty = (object) => {
    let flag = false;
    for (const value in object) {
        if (object[value] !== "" && object.hasOwnProperty(value)) {
            return flag = true;
        } else {
            return flag = false;
        }
    }
    return flag;
}


// get the values from the database
const getid = (dbtable, fn) => {
    let index = 0;
    let object = {};
    dbtable.count(count => {
        if (count) {
            dbtable.each(table => {
                object = sortobj(table);
                fn(object, index++);
            })
        } else {
            return fn(0);
        }
    })
};



const sortobj = (sort) => {
    let object = {};
    object = {
        id: sort.id,
        name: sort.name,
        seller: sort.seller,
        price: sort.price
    }
    return object;
}
const createele =(tagname,appendto,fn) =>{
    const element = document.createElement(tagname);
    if(appendto)appendto.appendChild(element);
    if(fn) fn(element);
}


export default productdb;
export {
    createbulk,
    getid,
    createele
} 