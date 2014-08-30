Template.lista.events({
	'click .guzik':function(evt,tmpl) {
 			var name = tmpl.find('.name').value;
			var listka = Lists.find({name:name}).fetch();
			if (listka == 0){
			Lists.insert({name:name});
			}
			else {
			alert("Juz istnieje projekt o podanej nazwie");
			}
	},
	'keyup .name':function(evt,tmpl){
		if(evt.which === 13){
			var name = tmpl.find('.name').value;
			var listka = Lists.find({name:name}).fetch();
			if (listka == 0){
			Lists.insert({name:name});
			}
			else {
			alert("Juz istnieje projekt o podanej nazwie");
			}
		}
	}

});
Template.lista.lists = function(){
	return Lists.find();
}
Template.listitem.events({
	'click .list':function(evt,tmpl){
		Session.set('listid',this._id);
	},
	'click .removelist':function(evt,tmpl){
		Lists.remove({_id:this._id});
	}
})
