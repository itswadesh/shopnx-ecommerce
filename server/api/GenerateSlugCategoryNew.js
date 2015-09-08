db.categories.find().forEach(
    function (elem) {print();
        db.categories.update(
            {
                _id: elem._id
            },
            {
                $set: {
                    slug : elem.info.toString().toLowerCase()
                          .replace(/\s+/g, '-')        // Replace spaces with -
                          .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
                          .replace(/\-\-+/g, '-')      // Replace multiple - with single -
                          .replace(/^-+/, '')          // Trim - from start of text
                          .replace(/-+$/, '')        // Trim - from end of text
                }
            }
        );
    }
);