\c nc_news_test

    INSERT INTO comments (body, author)
    VALUES ('1', 'a')
    RETURNING *
;