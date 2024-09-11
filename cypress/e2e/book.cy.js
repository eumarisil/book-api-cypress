describe('/books POST', () => {

  before(() => {
    cy.dropCollection('books', { database: 'test', failSilently: 'true' }).then(result => {
      cy.log(result); // Will return 'Collection dropped' or the error object if collection doesn’t exist. Will not fail the test
    });
  })

  it('Should register a book', () => {
    const book = {
      "title": "Clean Code",
      "author": "Robert C. Martin",
      "publisher": "Prentice Hall",
      "year": 2008,
      "pages": 464
    };

    cy.postBook(book)
      .then(response => {
        // cy.log(JSON.stringify(response.body))

        expect(response.status).to.eql(201)
        expect(response.body.title).to.eql(book.title)
        expect(response.body.author).to.eql(book.author)
        expect(response.body.publisher).to.eql(book.publisher)
        expect(response.body.year).to.eql(book.year)
        expect(response.body.pages).to.eql(book.pages)
        expect(response.body._id).to.not.be.empty
      })

  })

  it('Should not register a duplicated book', () => {
    const book = {
      "title": "The Pragmatic Programmer",
      "author": "Andrew Hunt, David Thomas",
      "publisher": "Addison-Wesley",
      "year": 1999,
      "pages": 352
    };

    cy.postBook(book)
      .then(response => {
        expect(response.status).to.eql(201)
      })

    cy.postBook(book)
      .then(response => {
        expect(response.status).to.eql(400)
        expect(response.body.erro).to.eql("The book title has already been registered!")
      })

  })
})