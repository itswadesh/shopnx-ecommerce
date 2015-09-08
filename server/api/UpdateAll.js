db.Product.find().forEach(
    function (elem) {
        db.Product.update(
            {
                _id: elem._id
            },
            {
                $set: {
                    variants : [ { stock: elem.stock, size : elem.packing , mrp : elem.mrp , price: elem.price , image : elem.image }]
                }
            }
        );
    }
);