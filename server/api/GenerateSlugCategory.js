db.Category.find().forEach( function(doc) {
    doc.sub_categories.forEach(function(sub_category){
        sub_category.slug=sub_category.description.toString().toLowerCase().replace(/\s+/g, '-')        // Replace spaces with -
                          .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
                          .replace(/\-\-+/g, '-')      // Replace multiple - with single -
                          .replace(/^-+/, '')          // Trim - from start of text
                          .replace(/-+$/, '')
    });
print(doc);
db.Category.save(doc);
});