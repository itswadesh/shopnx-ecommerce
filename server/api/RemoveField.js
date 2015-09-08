db.Product.find().forEach(
    function (elem) {
        db.Product.update(
            {
                _id: elem._id
            },
            {
                $unset: {stock:1, mrp:1 , price: 1 , image: 1 , packing: 1}
            }
        );
    }
);