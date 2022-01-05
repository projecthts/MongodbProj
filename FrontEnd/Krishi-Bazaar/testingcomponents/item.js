describe('item tests',function(){

    it('add to cart test',function(){

        browser.get('http://localhost:4200/item?id=6049cee450b5b0ceecba6dae');

        element(by.buttonText('Add to cart')).click();
    });

});