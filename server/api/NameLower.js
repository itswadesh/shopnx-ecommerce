db.Product.find().forEach(
    function (elem) {
        db.Product.update(
            {
                _id: elem._id
            },
            {
                $set: {
                    name_lower : String.toLowerCase(elem.name)
                }
            }
        );
    }
);