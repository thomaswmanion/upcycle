describe('editable', function(){
	var table = '<table>' +
      '<thead>'+
        '<tr>'+
        	'<td>Name</td>'+
        	'<td>Greeting</td>'+
        '</tr>'+
      '</thead>'+
      '<tbody>' +
        '<tr class="odd">' +
          '<td class="editable">Mike</td>'+
          '<td>Hello</td>'+
        '</tr>'+
        '<tr class="even">' +
          '<td>Aaron</td>'+
          '<td class="editable" data-new-label="EDITABLE_NEW_VALUE" data-new-placeholder="EDITABLE_NEW_VALUE_PLACEHOLDER" data-default-label="EDITABLE_DEFAULT_VALUE" data-default="Yo">Hi</td>'+
        '</tr>'+
        '<tr class="odd">' +
          '<td>Eddie</td>'+
          '<td>Hey</td>'+
        '</tr>'+
      '</tbody>'+
    '</table>';

    var editable = $(table).appendTo('#sandbox').editable({
      'widgetContainer': '#sandbox'
    }).data('upcycle-editable');

    it("triggers change event when the edited element's value changes", function(done){
    	editable.element.one('editable:value:change', function(event, data){
        expect(data.element.innerHTML).to.equal('Hiya');
        done();
      });
      editable.element
        .find('.editable').eq(1)
          .one('shown', function(){
            var $this = $(this),
                $popover = $this.data('popover').tip(),
                $input = $popover.find('input[type="text"]');
            _.defer(function(){
              $input.attr('value', 'Hiya').trigger('change');
            });
          })
          .trigger('click');
    });
});